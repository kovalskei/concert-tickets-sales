import json
import os
import secrets
import string
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def generate_referral_code(cur, length: int = 8) -> str:
    while True:
        chars = string.ascii_uppercase + string.digits
        code = ''.join(secrets.choice(chars) for _ in range(length))
        cur.execute("SELECT id FROM users WHERE referral_code = %s", (code,))
        if not cur.fetchone():
            return code

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Referral system - create users, track referrals, calculate bonuses
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with referral data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'create_user':
                email = body_data.get('email')
                name = body_data.get('name', '')
                referred_by_code = body_data.get('referral_code')
                
                cur.execute("SELECT id, referral_code FROM users WHERE email = %s", (email,))
                existing_user = cur.fetchone()
                
                if existing_user:
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'user_id': existing_user['id'],
                            'referral_code': existing_user['referral_code'],
                            'message': 'User already exists'
                        })
                    }
                
                referral_code = generate_referral_code(cur)
                
                cur.execute(
                    "INSERT INTO users (email, name, referral_code, referred_by_code) VALUES (%s, %s, %s, %s) RETURNING id, referral_code",
                    (email, name, referral_code, referred_by_code)
                )
                user = cur.fetchone()
                
                if referred_by_code:
                    cur.execute(
                        "UPDATE users SET total_referrals = total_referrals + 1, bonus_balance = bonus_balance + 200 WHERE referral_code = %s",
                        (referred_by_code,)
                    )
                    
                    cur.execute("SELECT id FROM users WHERE referral_code = %s", (referred_by_code,))
                    referrer = cur.fetchone()
                    
                    if referrer:
                        cur.execute(
                            "INSERT INTO referral_rewards (user_id, referred_user_id, reward_amount, reward_type) VALUES (%s, %s, %s, %s)",
                            (referrer['id'], user['id'], 200, 'referral_bonus')
                        )
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'user_id': user['id'],
                        'referral_code': user['referral_code']
                    })
                }
            
            elif action == 'claim_subscription_bonus':
                user_id = body_data.get('user_id')
                platform = body_data.get('platform')
                bonus_amount = 200
                
                cur.execute(
                    "INSERT INTO user_subscriptions (user_id, platform, bonus_claimed, bonus_amount) VALUES (%s, %s, %s, %s) ON CONFLICT (user_id, platform) DO NOTHING RETURNING id",
                    (user_id, platform, True, bonus_amount)
                )
                subscription = cur.fetchone()
                
                if subscription:
                    cur.execute(
                        "UPDATE users SET bonus_balance = bonus_balance + %s WHERE id = %s",
                        (bonus_amount, user_id)
                    )
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'bonus_amount': bonus_amount,
                            'message': f'Бонус {bonus_amount}₽ начислен!'
                        })
                    }
                else:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': False,
                            'message': 'Бонус уже был получен'
                        })
                    }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            user_id = params.get('user_id')
            
            if user_id:
                cur.execute(
                    "SELECT id, email, name, referral_code, total_referrals, bonus_balance FROM users WHERE id = %s",
                    (user_id,)
                )
                user = cur.fetchone()
                
                if user:
                    cur.execute(
                        "SELECT platform, bonus_claimed FROM user_subscriptions WHERE user_id = %s",
                        (user_id,)
                    )
                    subscriptions = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'user': dict(user),
                            'subscriptions': [dict(s) for s in subscriptions]
                        })
                    }
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id required'})
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()