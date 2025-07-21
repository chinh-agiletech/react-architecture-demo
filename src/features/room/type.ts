export interface Amenity {
  name: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  amenities: Amenity[];
}

export interface RoomCardProps {
  id: string | number;
  name: string;
  location: string;
  image: string;
  price: number;
  currency?: string;
  amenities: Amenity[];
  detailUrl?: string;
}

export interface RoomDetailProps{
    id: string | number;
}
