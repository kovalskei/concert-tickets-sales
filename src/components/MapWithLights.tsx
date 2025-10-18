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

      // Добавляем метки для каждого адреса площадки
      cityLights.forEach((light) => {
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
            preset: 'islands#flameDotIcon',
            iconColor: getCityColor(light.city)
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