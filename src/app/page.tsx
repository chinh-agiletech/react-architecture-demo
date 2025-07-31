"use client";

import Header from '@/components/Header/Header';
import Filter from '../components/Filter/Filter';
import RoomList from '../features/room/components/RoomList';
import Footer from '@/components/Footer/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mt-10">
          <Header />
        <div className="w-full mt-[110px]">
          <Filter />
        </div>
        <div className="mt-10 max-w-[1240px] mx-auto">
          <RoomList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
