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

      // Добавляем волшебные огоньки с магической пылью для каждой площадки
      cityLights.forEach((light) => {
        const color = getCityColor(light.city);
        
        // Создаём волшебный огонёк с звёздами и магической пылью
        const magicLight = `
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-${light.id}">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="magic-gradient-${light.id}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                <stop offset="40%" style="stop-color:${color};stop-opacity:0.9" />
                <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
              </radialGradient>
            </defs>
            
            <!-- Магическое свечение (большое) -->
            <circle cx="25" cy="25" r="22" fill="url(#magic-gradient-${light.id})" opacity="0.5">
              <animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Центральный огонёк -->
            <circle cx="25" cy="25" r="10" fill="${color}" filter="url(#glow-${light.id})">
              <animate attributeName="r" values="9;11;9" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Яркое ядро -->
            <circle cx="25" cy="25" r="6" fill="white" opacity="0.9">
              <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Звёздочки вокруг (магическая пыль) -->
            <g opacity="0.8">
              <!-- Звезда 1 -->
              <path d="M 15 10 L 16 13 L 13 13 L 15 10 Z" fill="white">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -1,-2; 0,0" dur="1.5s" repeatCount="indefinite"/>
              </path>
              
              <!-- Звезда 2 -->
              <circle cx="38" cy="12" r="1.5" fill="white">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; 2,-1; 0,0" dur="2s" begin="0.3s" repeatCount="indefinite"/>
              </circle>
              
              <!-- Звезда 3 -->
              <path d="M 10 30 L 11 32 L 9 32 L 10 30 Z" fill="${color}">
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -1,1; 0,0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
              </path>
              
              <!-- Звезда 4 -->
              <circle cx="40" cy="35" r="1.5" fill="${color}">
                <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="0.9s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; 1,2; 0,0" dur="2.2s" begin="0.9s" repeatCount="indefinite"/>
              </circle>
              
              <!-- Искры (маленькие точки магической пыли) -->
              <circle cx="18" cy="18" r="1" fill="white">
                <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="0.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="33" cy="20" r="1" fill="white">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" begin="0.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="20" cy="35" r="1" fill="${color}">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.3s" begin="0.7s" repeatCount="indefinite"/>
              </circle>
              <circle cx="35" cy="32" r="1" fill="${color}">
                <animate attributeName="opacity" values="0;0.8;0" dur="1.1s" begin="0.4s" repeatCount="indefinite"/>
              </circle>
            </g>
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
            iconImageHref: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(magicLight),
            iconImageSize: [50, 50],
            iconImageOffset: [-25, -25]
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