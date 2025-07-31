import { Room } from '../features/room/type';

// Enums for parameter options
export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum HourPricingType {
  DAY_BLOCK = 'DAY_BLOCK',
  HOUR_BLOCK = 'HOUR_BLOCK'
}

export enum BrandType {
  XCELLENT = 'XCELLENT',
  XCELL = 'XCELL',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

// Interface for paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  };
}

// Room interface from the API
export interface RoomAvailable extends Room {
  // Any additional properties specific to availability can be added here
}

// Parameters for the getAvailableRooms API call
export interface RoomAvailabilityParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order_by?: OrderBy;
  branch?: number;
  hotel?: number;
  room_type?: number;
  current?: string;
  search?: string;
  adult?: number;
  child?: number;
  infant?: number;
  brand_type?: BrandType;
  start_time: string;
  end_time: string;
  price_from?: number;
  price_to?: number;
  hour_pricing_type?: HourPricingType;
  booking_id?: number;
}

// Base API URL
const API_BASE_URL = 'https://api.xhotel.vn';

/**
 * Convert params object to URL search params
 * @param params Object containing query parameters
 * @returns URLSearchParams instance
 */
const createSearchParams = (params: Record<string, any>): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert array values to comma-separated strings if needed
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(','));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams;
};

/**
 * Get available rooms based on provided parameters
 * @param params Room availability filter parameters
 * @returns Promise with paginated room data
 */
export const getAvailableRooms = async (
  params: RoomAvailabilityParams
): Promise<PaginatedResponse<RoomAvailable>> => {
  try {
    const queryParams = createSearchParams(params);
    // Ensure URL is properly formatted without extra ampersands
    const url = `${API_BASE_URL}/room/available?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control to ensure fresh data
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch available rooms: ${response.status}`);
    }

    const data = await response.json();
    console.log('Available rooms data:', data);
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    // Ensure data property exists and is an array
    if (!Array.isArray(data.data)) {
      // If API doesn't return expected format, create a standardized response
      return {
        data: Array.isArray(data) ? data : [],
        pagination: {
          total: Array.isArray(data) ? data.length : 0,
          page: params.page || 1,
          page_size: params.page_size || 10,
          total_pages: 1
        }
      };
    }

    // Ensure pagination exists with proper values
    if (!data.pagination || typeof data.pagination !== 'object') {
      data.pagination = {
        total: data.data.length,
        page: params.page || 1,
        page_size: params.page_size || 10,
        total_pages: 1
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    // Return empty response instead of throwing to make component more resilient
    return {
      data: [],
      pagination: {
        total: 0,
        page: params.page || 1,
        page_size: params.page_size || 10,
        total_pages: 0
      }
    };
  }
};

/**
 * Get a single room by ID
 * @param id Room ID
 * @returns Promise with room data
 */
export const getRoomById = async (id: string | number): Promise<RoomAvailable> => {
  try {
    const url = `${API_BASE_URL}/room/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch room details: ${response.status}`);
    }

    const data = await response.json();

    // Validate the room data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid room data received from API');
    }

    // If API returns array but we need one room, take the first item
    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('Room not found');
      }
      return data[0];
    }

    return data;
  } catch (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    // Rethrow this error as we need valid room data
    throw error;
  }
};

/**
 * Check availability for a specific room
 * @param roomId Room ID to check
 * @param params Availability parameters
 * @returns Promise with availability status
 */
export const checkRoomAvailability = async (
  roomId: string | number,
  params: Pick<RoomAvailabilityParams, 'start_time' | 'end_time' | 'adult' | 'child' | 'infant'>
): Promise<{isAvailable: boolean; room?: RoomAvailable}> => {
  try {
    const queryParams = createSearchParams({
      ...params,
      room_id: roomId,
    });

    const url = `${API_BASE_URL}/room/check-availability?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to check room availability: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from availability check');
    }

    // Create a standardized response format
    const result: {isAvailable: boolean; room?: RoomAvailable} = {
      // Default to false if isAvailable is not explicitly true
      isAvailable: data.isAvailable === true
    };

    // Include room data if available
    if (data.room && typeof data.room === 'object') {
      result.room = data.room;
    }

    return result;
  } catch (error) {
    console.error(`Error checking availability for room ${roomId}:`, error);
    // Return a safe default instead of throwing
    return {
      isAvailable: false,
      // No room data on error
    };
  }
};
