"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { vi } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/theme/default.css';

// Custom date formatter for Vietnamese short format
const formatVietnameseShort = (date: Date): string => {
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const monthNames = ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'];
  
  const dayOfWeek = dayNames[date.getDay()];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayOfWeek} ${day} ${month} ${year}`;
};

interface CustomCalendarProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date, end: Date) => void;
  startLabel?: string;
  endLabel?: string;
  singleCalendar?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  startDate = new Date(),
  endDate = new Date(new Date().setDate(new Date().getDate() + 1)),
  onChange,
  startLabel,
  endLabel,
  singleCalendar = false
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');
  const calendarRef = useRef<HTMLDivElement>(null);

  const finalStartLabel = startLabel || t('checkInDate');
  const finalEndLabel = endLabel || t('checkOutDate');

  // State cho DateRange picker
  const [range, setRange] = useState<Range[]>([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);

  const [nightCount, setNightCount] = useState(0);
  
  useEffect(() => {
    if (range[0].startDate && range[0].endDate) {
      const days = differenceInDays(range[0].endDate, range[0].startDate);
      setNightCount(days > 0 ? days : 0);
      onChange(range[0].startDate, range[0].endDate);
    }
  }, [range, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selected = ranges.selection;
    if (selected.startDate && selected.endDate) {
      setRange([selected]);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        {/* Check-in date display */}
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm text-[#6d6d6d]">{finalStartLabel}</p>
          <p className="font-semibold text-[#405f2d]">
            {range[0].startDate && formatVietnameseShort(range[0].startDate)}
          </p>
        </div>

        {/* Check-out date display */}
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm text-[#6d6d6d]">{finalEndLabel}</p>
          <p className="font-semibold text-[#405f2d]">
            {range[0].endDate && formatVietnameseShort(range[0].endDate)}
          </p>
        </div>
      </div>

      {/* Calendar popup */}
      {open && (
        <div ref={calendarRef} className="absolute top-14 z-50 bg-white rounded-xl shadow-xl p-4">
          {singleCalendar ? (
            // Single calendar with date range selection
            <>
              <DateRange
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                locale={vi}
                minDate={new Date()}
                color="#405f2d"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm font-medium text-[#405f2d]">
                  {t('nights', { count: nightCount })}
                </div>
                <button
                  className="px-4 py-2 bg-[#405f2d] text-white rounded-lg text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t('apply')}
                </button>
              </div>
            </>
          ) : (
            // Two months calendar side by side with date range selection
            <>
              <div>
                <DateRange
                  onChange={handleRangeChange}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={2}
                  direction="horizontal"
                  locale={vi}
                  minDate={new Date()}
                  color="#405f2d"
                  rangeColors={["#405f2d"]}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-[#405f2d]">
                  {t('nights', { count: nightCount })}
                </div>
                <button
                  className="px-4 py-2 bg-[#405f2d] text-white rounded-lg text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  {t('apply')}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
