"use client"

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';
import { SingleDatePicker } from '../CustomCalendar/CustomCalendar';
import GuestSelector from '../GuestSelector/GuestSelector';

const Filter = () => {
  const { t } = useTranslation('common');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  
  // Mock data for selectors
  const locationOptions = [
    { value: 'all', label: t('city')},
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'thainguyen', label: 'Thái Nguyên' },
  ];
  
  const brandOptions = [
    { value: 'all', label: t('allBrands') },
    { value: 'xhotel', label: 'X Hotel' },
    { value: 'xluxury', label: 'X Luxury' },
  ];

  // Format date function available for future use
  /* const formatDate = (date: Date) => {
    return `${t(`day${date.getDay()}`)} ${date.getDate()} ${t(`month${date.getMonth()}`)} ${date.getFullYear()}`;
  }; */

  return (
    <div className="w-full bg-white py-4">
      <div className="max-w-[85rem] mx-auto">
        <div className="flex justify-between items-center flex-nowrap px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-xl">
          {/* Location Selection */}
          <div className="flex items-center border-r border-gray-300 px-4 min-w-[120px]">
          <Dropdown 
            options={locationOptions}
            selectedValue={selectedLocation}
            onSelect={(value) => setSelectedLocation(value)}
          />
          </div>

          {/* Brand Selection */}
          <div className="flex items-center border-r border-gray-300 px-4 min-w-[120px]">
            <div className="mr-2 flex-shrink-0">
              <Image src="/logo/branch-logo-black.svg" alt="Branch logo" width={20} height={20} />
            </div>
            <Dropdown 
              options={brandOptions}
              selectedValue={selectedBrand}
              onSelect={(value) => setSelectedBrand(value)}
              hideIcon={true}
            />
          </div>

          {/* Check-in Date */}
          <div className="flex items-center border-r border-gray-300 px-4 min-w-[170px]">
            <div className="mr-2 flex-shrink-0">
              <Image src="/calendar-249.png" alt="Calendar icon" width={20} height={20} />
            </div>
            <SingleDatePicker
              date={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              label={t('checkInDate')}
            />
          </div>
          
          {/* Check-out Date */}
          <div className="flex items-center border-r border-gray-300 px-4 min-w-[170px]">
            <div className="mr-2 flex-shrink-0">
              <Image src="/calendar-249.png" alt="Calendar icon" width={20} height={20} />
            </div>
            <SingleDatePicker
              date={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              label={t('checkOutDate')}
            />
          </div>

          {/* Guests */}
          <div className="flex items-center px-4 min-w-[150px]">
            <GuestSelector
              adults={adults}
              children={children}
              onChange={(newAdults, newChildren) => {
                setAdults(newAdults);
                setChildren(newChildren);
              }}
            />
          </div>

          {/* Search Button */}
          <button 
            className="bg-[#4c7038] hover:bg-[#405f2d] text-white py-1 px-6 rounded-[50px] font-medium transition-colors h-[36px] flex-shrink-0 ml-2"
          >
            {t('searchRooms')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

