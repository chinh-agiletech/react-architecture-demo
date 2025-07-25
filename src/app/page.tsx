"use client";

import Filter from '../components/Filter/Filter';
import RoomList from '../features/room/components/RoomList';

export default function Home() {

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mt-10">
        <div className="w-full">
          <Filter />
        </div>
        <div className="mt-10 max-w-[1240px] mx-auto">
          <RoomList />
        </div>
      </div>
    </div>
  );
}
