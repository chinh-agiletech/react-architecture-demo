"use client"

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import GuestSelector from '../GuestSelector/GuestSelector';

const Filter = () => {
  const { t } = useTranslation('common');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Mock data for selectors
  const locationOptions = [
    { value: 'thainguyen', label: 'Thái Nguyên' },
  ];

  const brandOptions = [
    { value: 'XCELLENT', label: 'Xcellent' },
    { value: 'XHOME', label: 'Xhome' },
    { value: 'XCELL', label: 'Xcell', customColor: 'purple' },
  ];

  return (
    <div className="w-full bg-white p-6 mx-auto py-10 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap max-w-[1240px] mx-auto">
        {/* Left side - All filters */}
        <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap flex-1 justify-between">
          {/* Location Selection */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image src="/logo/globe.svg" alt="Location icon" width={24} height={24} />
            </div>
            <Dropdown
              options={locationOptions}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value)}
              placeholder="Chọn vị trí"
              label="Tỉnh / Thành phố"
            />
          </div>

          <hr className="w-px h-10 bg-[#171717] border-0" />

          {/* Brand Selection */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image src="/logo/branch-logo-black.svg" alt="Branch logo" width={24} height={24} />
            </div>
            <Dropdown
              options={brandOptions}
              selectedValue={selectedBrand}
              onSelect={(value) => setSelectedBrand(value)}
              hideIcon={true}
              placeholder="Chọn thương hiệu"
              label="Thương hiệu"
            />
          </div>

          <hr className="w-px h-10 bg-[#171717] border-0" />

          {/* Date Selection */}
          <div className="flex items-center gap-2 min-w-[300px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8">
                <Image src="/calendar-249.png" alt="Calendar icon" width={24} height={24} />
              </div>
              <CustomCalendar
                startDate={checkInDate}
                endDate={checkOutDate}
                onChange={(start, end) => {
                  setCheckInDate(start);
                  setCheckOutDate(end);
                }}
                startLabel={t('checkInDate')}
                endLabel={t('checkOutDate')}
                singleCalendar={false} // Sử dụng hai calendar song song với khả năng kéo chọn khoảng thời gian
              />
            </div>
          </div>

          <hr className="w-px h-10 bg-[#171717] border-0" />

          {/* Guests */}
          <div className="flex items-center min-w-[200px]">
            <GuestSelector
              adults={adults}
              children={children}
              onChange={(newAdults, newChildren) => {
                setAdults(newAdults);
                setChildren(newChildren);
              }}
            />
          </div>
        </div>

        {/* Right side - Search Button */}
        <button className="bg-[var(--primary-color)] text-white font-semibold py-2 px-5 rounded-full transition-colors duration-200 min-w-[140px] ml-4">
          {t('searchRooms')}
        </button>
      </div>
    </div>
  );
};

export default Filter;

