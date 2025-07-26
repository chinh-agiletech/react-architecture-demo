// components/CustomCalendar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange, Range, RangeKeyDict, Calendar } from "react-date-range";
import { vi } from "date-fns/locale";
import { format, differenceInDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/theme/default.css';

interface CustomCalendarProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date, end: Date) => void;
  startLabel?: string;
  endLabel?: string;
  singleCalendar?: boolean; // Khi true sẽ hiển thị một calendar cho phép kéo chọn khoảng ngày
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  startDate = new Date(),
  endDate = new Date(new Date().setDate(new Date().getDate() + 1)),
  onChange,
  startLabel,
  endLabel,
  singleCalendar = false // Mặc định sử dụng hai calendar song song
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');
  const calendarRef = useRef<HTMLDivElement>(null);

  // Use translated labels or fallback to provided values
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

  // Không cần state cho calendar riêng biệt nữa
  const [nightCount, setNightCount] = useState(0);  useEffect(() => {
    // Luôn sử dụng range cho cả hai mode (đơn và song song) để có thể kéo chọn range
    if (range[0].startDate && range[0].endDate) {
      const days = differenceInDays(range[0].endDate, range[0].startDate);
      setNightCount(days > 0 ? days : 0);
      onChange(range[0].startDate, range[0].endDate);
    }
  }, [range, onChange]);

  useEffect(() => {
    // Handle clicks outside the calendar to close it
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
      <div className="flex items-center gap-4">
        {/* Check-in date display */}
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm text-[#6d6d6d]">{finalStartLabel}</p>
          <p className="font-semibold text-[#405f2d]">
            {range[0].startDate && format(range[0].startDate, "EEE dd MMM yyyy", { locale: vi })}
          </p>
        </div>

        {/* Check-out date display */}
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm text-[#6d6d6d]">{finalEndLabel}</p>
          <p className="font-semibold text-[#405f2d]">
            {range[0].endDate && format(range[0].endDate, "EEE dd MMM yyyy", { locale: vi })}
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
