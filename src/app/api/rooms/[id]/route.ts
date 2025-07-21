import { NextResponse } from 'next/server';
import { rooms } from '@/features/room/data/room';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const room = rooms.find(room => room.id === id);

    if (!room) {
      return NextResponse.json(
        { error: `Room with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
