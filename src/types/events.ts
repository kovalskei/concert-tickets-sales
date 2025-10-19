export interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  genre: string;
  seatsLeft: number;
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  event: string;
}

export interface CityLight {
  id: number;
  city: string;
  venue: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  count: number;
  todayCount: number;
  user: string;
  text: string;
  image: string;
  likes: number;
}

export interface CityStats {
  city: string;
  total: number;
  today: number;
  color: string;
}
