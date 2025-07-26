"use client"

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import GuestSelector from '../GuestSelector/GuestSelector';
import styles from './Filter.module.css';

const Filter = () => {
  const { t } = useTranslation('common');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // Mock data for selectors
  const locationOptions = [
    { value: '', label: "Chọn vị trí"},
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

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContent}>
        {/* Left side - All filters */}
        <div className={styles.filterGroup}>
          {/* Location Selection */}
          <div className={styles.filterItem}>
            <div className={styles.iconWrapper}>
              <Image src="/logo/globe.svg" alt="Location icon" width={24} height={24} />
            </div>
            <Dropdown
              options={locationOptions}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value)}
            />
          </div>

          {/* Brand Selection */}
          <div className={styles.filterItem}>
            <div className={styles.iconWrapper}>
              <Image src="/logo/branch-logo-black.svg" alt="Branch logo" width={24} height={24} />
            </div>
            <Dropdown
              options={brandOptions}
              selectedValue={selectedBrand}
              onSelect={(value) => setSelectedBrand(value)}
              hideIcon={true}
            />
          </div>

          {/* Date Selection */}
          <div className={styles.dateSelection}>
            <div className={styles.dateItem}>
              <div className={styles.iconWrapper}>
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

          {/* Guests */}
          <div className={styles.guestSelector}>
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
        <button className={styles.searchButton}>
          {t('searchRooms')}
        </button>
      </div>
    </div>
  );
};

export default Filter;

