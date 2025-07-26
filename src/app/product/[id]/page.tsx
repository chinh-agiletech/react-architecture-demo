import { Metadata } from 'next';
import RoomDetail from '@/features/room/components/RoomDetail';
import { getRoomById } from '@/services/roomService';

// Trang chi tiết phòng
export default function Page(props: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return <RoomDetail id={props.params.id} />;
}

// Tạo metadata động cho SEO
export async function generateMetadata(props: {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  try {
    const room = await getRoomById(props.params.id);
    
    return {
      title: room ? `${room.name} | xHotel` : 'Chi tiết phòng | xHotel',
      description: `Khám phá phòng ${room?.name || ''} tại xHotel với đầy đủ tiện nghi`,
    };
  } catch (error) {
    console.error('Error fetching room for metadata:', error);
    return {
      title: 'Chi tiết phòng | xHotel',
      description: 'Khám phá phòng tại xHotel với đầy đủ tiện nghi',
    };
  }
}

// For static params generation, consider pre-fetching top rooms or hardcoding IDs
// This would be more efficient than fetching all rooms
export async function generateStaticParams() {
  try {
    // Option 1: Fetch from API (could be slow if many rooms)
    /*
    const response = await getAvailableRooms({
      page: 1,
      page_size: 20,
      start_time: '2025-06-17 14:00:00',
      end_time: '2025-06-18 12:00:00'
    });
    return response.data.map(room => ({
      id: String(room.id),
    }));
    */
    
    // Option 2: Hardcode common IDs for static generation
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
