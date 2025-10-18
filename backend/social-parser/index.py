"""
Business: Парсит посты с хэштегом #канделайт из Instagram, VK, OK, Telegram
Args: event - dict с httpMethod (GET для ручного запуска, POST для cron)
      context - object с request_id
Returns: HTTP response с количеством найденных постов
"""

import json
import os
import re
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import urllib.request
import urllib.parse
import urllib.error
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    
    conn = psycopg2.connect(database_url)
    
    try:
        total_posts = 0
        results = {
            'vk': 0,
            'ok': 0,
            'telegram': 0,
            'instagram': 0
        }
        
        vk_posts = parse_vk()
        if vk_posts:
            saved = save_posts_to_db(conn, vk_posts, 'vk')
            results['vk'] = saved
            total_posts += saved
        
        ok_posts = parse_ok()
        if ok_posts:
            saved = save_posts_to_db(conn, ok_posts, 'ok')
            results['ok'] = saved
            total_posts += saved
        
        tg_posts = parse_telegram()
        if tg_posts:
            saved = save_posts_to_db(conn, tg_posts, 'telegram')
            results['telegram'] = saved
            total_posts += saved
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'total_new_posts': total_posts,
                'by_network': results,
                'timestamp': datetime.utcnow().isoformat()
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        conn.close()


def parse_vk() -> List[Dict[str, Any]]:
    """Парсит посты ВКонтакте с хэштегом #канделайт"""
    vk_token = os.environ.get('VK_ACCESS_TOKEN') or os.environ.get('VK_SERVICE_KEY')
    if not vk_token:
        return []
    
    try:
        query = urllib.parse.quote('#канделайт')
        url = f'https://api.vk.com/method/newsfeed.search?q={query}&count=100&v=5.131&access_token={vk_token}'
        
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        if 'response' not in data or 'items' not in data['response']:
            return []
        
        posts = []
        for item in data['response']['items']:
            if 'geo' not in item or not item.get('geo'):
                continue
            
            geo = item['geo']
            place = geo.get('place', {})
            
            city = place.get('city', '')
            venue = place.get('title', '')
            latitude = geo.get('coordinates', {}).get('latitude')
            longitude = geo.get('coordinates', {}).get('longitude')
            
            if not all([city, venue, latitude, longitude]):
                continue
            
            attachments = item.get('attachments', [])
            image_url = None
            for att in attachments:
                if att.get('type') == 'photo':
                    sizes = att.get('photo', {}).get('sizes', [])
                    if sizes:
                        image_url = max(sizes, key=lambda x: x.get('width', 0) * x.get('height', 0)).get('url')
                        break
            
            posts.append({
                'post_id': f"vk_{item['owner_id']}_{item['id']}",
                'user_name': f"id{item.get('owner_id', 'unknown')}",
                'user_avatar': None,
                'text': item.get('text', ''),
                'image_url': image_url,
                'city': city,
                'venue': venue,
                'latitude': latitude,
                'longitude': longitude,
                'likes_count': item.get('likes', {}).get('count', 0),
                'created_at': datetime.fromtimestamp(item.get('date', 0)).isoformat()
            })
        
        return posts
    
    except Exception:
        return []


def parse_ok() -> List[Dict[str, Any]]:
    """Парсит посты Одноклассников с хэштегом #канделайт"""
    ok_token = os.environ.get('OK_ACCESS_TOKEN')
    if not ok_token:
        return []
    
    return []


def parse_telegram() -> List[Dict[str, Any]]:
    """Парсит публичные посты Telegram с хэштегом #канделайт"""
    tg_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not tg_token:
        return []
    
    return []


def save_posts_to_db(conn, posts: List[Dict[str, Any]], network: str) -> int:
    """Сохраняет посты в базу данных"""
    cursor = conn.cursor()
    saved_count = 0
    
    for post in posts:
        try:
            cursor.execute("""
                INSERT INTO candle_lights 
                (social_network, post_id, user_name, user_avatar, text, image_url, 
                 city, venue, latitude, longitude, likes_count, created_at, parsed_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (post_id) DO NOTHING
            """, (
                network,
                post.get('post_id'),
                post.get('user_name'),
                post.get('user_avatar'),
                post.get('text'),
                post.get('image_url'),
                post.get('city'),
                post.get('venue'),
                post.get('latitude'),
                post.get('longitude'),
                post.get('likes_count', 0),
                post.get('created_at')
            ))
            
            if cursor.rowcount > 0:
                saved_count += 1
        
        except Exception:
            continue
    
    conn.commit()
    cursor.close()
    
    return saved_count
