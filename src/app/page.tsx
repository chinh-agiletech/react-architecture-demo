"use client";

import Filter from '../components/Filter/Filter';
import RoomList from '../features/room/components/RoomList';

export default function Home() {

  return (
    <div>
      <div className="mt-10">
        <div className="w-full"> 
          <Filter />
        </div>
        <div className="mt-10 w-[80%] mx-auto">
          <RoomList />
        </div>
      </div>
    </div>
  );
}
