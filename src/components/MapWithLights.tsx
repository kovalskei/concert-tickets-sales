import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CityLight {
  id: number;
  city: string;
  venue: string;
  lat: number;
  lon: number;
  x?: number;
  y?: number;
  count: number;
  todayCount: number;
  user: string;
  text: string;
  image: string;
  likes: number;
}

interface MapWithLightsProps {
  cityLights: CityLight[];
  onLightSelect: (light: CityLight) => void;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const MapWithLights = ({ cityLights, onLightSelect }: MapWithLightsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    // Загружаем Яндекс.Карты API
    if (!document.getElementById('yandex-maps-script')) {
      const script = document.createElement('script');
      script.id = 'yandex-maps-script';
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.ymaps) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstance.current) return;

    window.ymaps.ready(() => {
      // Создаём карту с центром на европейской части России
      const map = new window.ymaps.Map(mapRef.current, {
        center: [55.7558, 37.6173], // Москва - центр европейской части
        zoom: 5,
        controls: ['zoomControl', 'fullscreenControl']
      });

      mapInstance.current = map;

      // Добавляем красивые анимированные огоньки для каждой площадки
      cityLights.forEach((light) => {
        const color = getCityColor(light.city);
        
        // Создаём красивую SVG иконку огонька с анимацией
        const candleIcon = `
          <svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-${light.id}">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="flame-${light.id}" cx="50%" cy="30%" r="50%">
                <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
              </radialGradient>
            </defs>
            
            <!-- Свечение вокруг -->
            <circle cx="20" cy="15" r="18" fill="url(#flame-${light.id})" opacity="0.4">
              <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Огонёк -->
            <path d="M 20 5 Q 15 12, 20 20 Q 25 12, 20 5 Z" fill="${color}" filter="url(#glow-${light.id})">
              <animate attributeName="d" 
                values="M 20 5 Q 15 12, 20 20 Q 25 12, 20 5 Z;
                        M 20 3 Q 14 11, 20 22 Q 26 11, 20 3 Z;
                        M 20 5 Q 15 12, 20 20 Q 25 12, 20 5 Z" 
                dur="1.5s" 
                repeatCount="indefinite"/>
            </path>
            
            <!-- Яркая точка в центре -->
            <circle cx="20" cy="12" r="3" fill="white" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Свеча -->
            <rect x="17" y="20" width="6" height="15" rx="1" fill="#f0f0f0" opacity="0.8"/>
            <ellipse cx="20" cy="20" rx="3" ry="1.5" fill="#fff" opacity="0.6"/>
            
            <!-- Подпись города (небольшая) -->
            <text x="20" y="50" font-family="Arial" font-size="8" fill="${color}" text-anchor="middle" font-weight="bold">
              ${light.city === 'Москва' ? 'МСК' : light.city === 'Санкт-Петербург' ? 'СПБ' : 'КЗН'}
            </text>
          </svg>
        `;

        const placemark = new window.ymaps.Placemark(
          [light.lat, light.lon],
          {
            hintContent: `${light.venue}, ${light.city}`,
            balloonContent: `
              <div style="padding: 12px; max-width: 300px;">
                <img src="${light.image}" alt="${light.venue}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${light.venue}</div>
                <div style="color: #666; font-size: 12px; margin-bottom: 8px;">${light.city} • ${light.user}</div>
                <div style="font-size: 13px; margin-bottom: 8px;">${light.text}</div>
                <div style="display: flex; gap: 16px; font-size: 12px; color: #999;">
                  <span>❤️ ${light.likes}</span>
                  <span>🔥 ${light.todayCount} огоньков сегодня</span>
                </div>
              </div>
            `
          },
          {
            iconLayout: 'default#image',
            iconImageHref: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(candleIcon),
            iconImageSize: [40, 60],
            iconImageOffset: [-20, -60]
          }
        );

        placemark.events.add('click', () => {
          onLightSelect(light);
        });

        map.geoObjects.add(placemark);
      });

      // Кластеризация для большого количества меток
      const clusterer = new window.ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
      });

      map.geoObjects.add(clusterer);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [isLoaded, cityLights, onLightSelect]);

  const getCityColor = (city: string) => {
    switch (city) {
      case 'Москва':
        return '#FF8C42';
      case 'Санкт-Петербург':
        return '#3CB8E0';
      case 'Казань':
        return '#8B7AB8';
      default:
        return '#FF6B6B';
    }
  };

  return (
    <Card className="w-full h-full overflow-hidden bg-card">
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="flex flex-col items-center gap-3">
              <Icon name="Loader2" className="animate-spin text-primary" size={32} />
              <p className="text-sm text-muted-foreground">Загрузка карты...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapRef} 
          className="w-full h-full min-h-[500px]"
          style={{ borderRadius: '8px' }}
        />
      </div>
    </Card>
  );
};

export default MapWithLights;