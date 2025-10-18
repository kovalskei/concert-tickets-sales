"""
Business: Возвращает список огоньков с карты России (посты с хэштегом #канделайт)
Args: event - dict с queryStringParameters (city, limit)
      context - object с request_id
Returns: HTTP response со списком постов и статистикой по городам
"""

import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    params = event.get('queryStringParameters') or {}
    city_filter = params.get('city')
    limit = int(params.get('limit', '100'))
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        where_clause = ''
        query_params = []
        
        if city_filter:
            where_clause = 'WHERE city = %s'
            query_params.append(city_filter)
        
        cursor.execute(f"""
            SELECT 
                id,
                social_network,
                user_name,
                user_avatar,
                text,
                image_url,
                city,
                venue,
                latitude,
                longitude,
                likes_count,
                created_at
            FROM candle_lights
            {where_clause}
            ORDER BY created_at DESC
            LIMIT %s
        """, query_params + [limit])
        
        lights = cursor.fetchall()
        
        cursor.execute("""
            SELECT 
                city,
                COUNT(*) as total,
                COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 day' THEN 1 END) as today
            FROM candle_lights
            GROUP BY city
            ORDER BY total DESC
        """)
        
        city_stats = cursor.fetchall()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'lights': [dict(light) for light in lights],
                'city_stats': [dict(stat) for stat in city_stats],
                'total': len(lights)
            }, default=str)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cursor.close()
        conn.close()
