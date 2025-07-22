import { Metadata } from 'next';
import RoomDetail from '@/features/room/components/RoomDetail';
import { rooms } from '@/features/room/data/room';

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
  const room = rooms.find((room) => room.id === props.params.id);
  
  return {
    title: room ? `${room.name} | xHotel` : 'Chi tiết phòng | xHotel',
    description: `Khám phá phòng ${room?.name || ''} tại xHotel với đầy đủ tiện nghi`,
  };
}

// Tạo tham số tĩnh để cải thiện hiệu suất
export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}
