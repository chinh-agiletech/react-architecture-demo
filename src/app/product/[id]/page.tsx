import RoomDetail from '@/features/room/components/RoomDetail';

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  return <RoomDetail id={params.id} />;
}
