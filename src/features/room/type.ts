export interface Amenity {
  name: string;
  icon: string;
}

export interface Photo {
  id: number;
  url: string;
}

export interface AmenityIcon {
  id: number;
  url: string;
}

export interface RoomAmenity {
  id: number;
  name: string;
  icon: AmenityIcon;
}

export interface PriceFormat {
  amount: number;
  format: string;
}

export interface RoomPricing {
  start_time: string;
  end_time: string;
  days: number;
  hours: number;
  quantity: number;
  total: PriceFormat;
  subtotal: PriceFormat;
  unit: PriceFormat;
  custom_unit: PriceFormat | null;
  combo: {
    amount: number;
    format: string;
    discount_percent: number;
  };
  xmember: {
    amount: number;
    format: string;
    discount_percent: number;
  };
  day_pricing: {
    base: PriceFormat;
    weekday: {
      total: PriceFormat;
      days: number;
      unit: PriceFormat;
    };
    weekend: {
      total: PriceFormat;
      days: number;
      unit: PriceFormat;
    };
    long_term: {
      total: PriceFormat;
      days: number;
      unit: PriceFormat;
    };
    holiday: {
      total: PriceFormat;
      days: number;
    };
  };
  is_day_pricing_rule: boolean;
  is_hour_pricing_rule: boolean;
}

export interface Hotel {
  id: number;
  name: string;
  alias: string;
  code: string;
  status: string;
  brand_type: string;
  check_in: string;
  check_out: string;
  day_slot_duration: number;
  branch: {
    id: number;
    name: string;
    legal_corporate_name: string;
    alias: string;
  };
  combo_policy: any | null;
}

export interface RoomType {
  id: number;
  name: string;
  alias: string;
  brand_type: string;
}

export interface Room {
  id: number;
  name: string;
  alias: string;
  description: string;
  size: number;
  single_bed: number;
  double_bed: number;
  adult: number;
  child: number;
  infant: number;
  total: number;
  metadata: {
    photo_ids: number[];
    amenity_ids: number[];
  };
  created_at: string;
  hotel: Hotel;
  room_type: RoomType;
  photos: Photo[];
  amenities: RoomAmenity[];
  pricing?: RoomPricing;
  available?: number;
}

export interface RoomCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  price: PriceFormat | null;
  currency?: string;
  amenities: Amenity[];
  detailUrl?: string;
  brand_type?: string;
}

export interface RoomDetailProps{
    id: string | number;
}
