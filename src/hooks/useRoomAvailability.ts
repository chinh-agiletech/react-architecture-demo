import { useState, useEffect, useCallback } from 'react';
import { Room } from '../features/room/type';

interface AvailabilityOptions {
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
}

/**
 * Hook for checking room availability
 * @param roomId Optional room ID to check availability for a specific room
 * @returns Object containing availability functions and state
 */
const useRoomAvailability = (roomId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const checkAvailability = useCallback(
    async (options: AvailabilityOptions) => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Format dates for API
        const checkIn = options.checkInDate.toISOString().split('T')[0];
        const checkOut = options.checkOutDate.toISOString().split('T')[0];
        
        // Build URL for API call
        let url = `/api/rooms/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${options.guests}`;
        
        if (roomId) {
          url += `&roomId=${roomId}`;
        }
        
        // Fetch availability data
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error checking availability: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (roomId) {
          // If checking for specific room
          setIsAvailable(data.isAvailable);
        } else {
          // If checking for all rooms
          setAvailableRooms(data.availableRooms);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsAvailable(false);
        setAvailableRooms([]);
      } finally {
        setIsLoading(false);
      }
    },
    [roomId]
  );

  return {
    checkAvailability,
    isLoading,
    isAvailable,
    availableRooms,
    error,
  };
};

export default useRoomAvailability;
