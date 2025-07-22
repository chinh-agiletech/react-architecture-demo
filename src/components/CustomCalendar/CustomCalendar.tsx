// components/CustomCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import { DateRange, Range, RangeKeyDict, Calendar } from "react-date-range";
import { vi } from "date-fns/locale";
import { format, differenceInDays } from "date-fns";
import 'react-date-range/dist/styles.css';
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/theme/default.css';

interface DateRangePickerProps {
  onChange: (start: Date, end: Date) => void;
}

interface SingleDatePickerProps {
  date?: Date;
  onChange: (date: Date) => void;
  label: string;
}
interface LinkedDatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date, end: Date) => void;
  startLabel?: string;
  endLabel?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selected = ranges.selection;
    setRange([selected]);
    if (selected.startDate && selected.endDate) {
      onChange(selected.startDate, selected.endDate);
    }
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-sm text-[#6d6d6d]">{t('checkIn')}</p>
        <p className="font-semibold text-[#405f2d]">
          {range[0].startDate && range[0].endDate &&
            `${format(range[0].startDate, "EEE dd MMM yyyy", { locale: vi })} - ${format(range[0].endDate, "EEE dd MMM yyyy", { locale: vi })}`
          }
        </p>
      </div>

      {open && (
        <div className="absolute top-14 z-50 bg-white rounded-xl shadow-xl">
          <DateRange
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            locale={vi}
          />
          <p className="text-center py-2 font-medium">
            {
              range[0].startDate && range[0].endDate
                ? t('nights', { count: Math.round((+range[0].endDate - +range[0].startDate) / (1000 * 3600 * 24)) })
                : ""
            }
          </p>
        </div>
      )}
    </div>
  );
};

export const SingleDatePicker: React.FC<SingleDatePickerProps> = ({ date = new Date(), onChange, label }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const { t } = useTranslation('common');

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setOpen(false);
  };
  
  // Format date in a language-independent way to save space
  const formatDisplayDate = (date: Date) => {
    return `${t(`day${date.getDay()}`).substring(0, 3)} ${date.getDate()} ${t(`month${date.getMonth()}`).substring(0, 3)} ${date.getFullYear()}`;
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-xs text-[#6d6d6d] truncate">{label}</p>
        <p className="font-semibold text-[#405f2d] text-sm truncate whitespace-nowrap">
          {formatDisplayDate(selectedDate)}
        </p>
      </div>

      {open && (
        <div className="absolute top-14 z-50 bg-white rounded-xl shadow-xl">
          <Calendar
            date={selectedDate}
            onChange={handleSelect}
            locale={vi}
          />
        </div>
      )}
    </div>
  );
};

export const LinkedDatePicker: React.FC<LinkedDatePickerProps> = ({
  startDate = new Date(),
  endDate = new Date(new Date().setDate(new Date().getDate() + 1)),
  onChange,
  startLabel,
  endLabel
}) => {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);
  const [nightCount, setNightCount] = useState(0);
  const { t } = useTranslation('common');
  
  // Use translated labels or fallback to provided values
  const finalStartLabel = startLabel || t('checkInDate');
  const finalEndLabel = endLabel || t('checkOutDate');

  useEffect(() => {
    const days = differenceInDays(selectedEndDate, selectedStartDate);
    setNightCount(days > 0 ? days : 0);
    onChange(selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const handleSelectStart = (date: Date) => {
    setSelectedStartDate(date);
    setStartOpen(false);
    
    // Nếu ngày bắt đầu mới vượt qua ngày kết thúc
    if (date > selectedEndDate) {
      // Tự động cập nhật ngày kết thúc là ngày sau ngày bắt đầu
      const newEndDate = new Date(date);
      newEndDate.setDate(date.getDate() + 1);
      setSelectedEndDate(newEndDate);
    }
  };

  const handleSelectEnd = (date: Date) => {
    // Đảm bảo ngày kết thúc luôn sau ngày bắt đầu
    if (date <= selectedStartDate) {
      const newEndDate = new Date(selectedStartDate);
      newEndDate.setDate(selectedStartDate.getDate() + 1);
      setSelectedEndDate(newEndDate);
    } else {
      setSelectedEndDate(date);
    }
    setEndOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* Date picker cho ngày bắt đầu */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => {
              setStartOpen(!startOpen);
              setEndOpen(false);
            }}
          >
            <p className="text-sm text-[#6d6d6d]">{finalStartLabel}</p>
            <p className="font-semibold text-[#405f2d]">
              {format(selectedStartDate, "EEE dd MMM yyyy", { locale: vi })}
            </p>
          </div>

          {startOpen && (
            <div className="absolute top-14 z-50 bg-white rounded-xl shadow-xl">
              <Calendar
                date={selectedStartDate}
                onChange={handleSelectStart}
                locale={vi}
                minDate={new Date()}
              />
            </div>
          )}
        </div>

        {/* Date picker cho ngày kết thúc */}
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => {
              setEndOpen(!endOpen);
              setStartOpen(false);
            }}
          >
            <p className="text-sm text-[#6d6d6d]">{finalEndLabel}</p>
            <p className="font-semibold text-[#405f2d]">
              {format(selectedEndDate, "EEE dd MMM yyyy", { locale: vi })}
            </p>
          </div>

          {endOpen && (
            <div className="absolute top-14 z-50 bg-white rounded-xl shadow-xl">
              <Calendar
                date={selectedEndDate}
                onChange={handleSelectEnd}
                locale={vi}
                minDate={new Date(selectedStartDate.getTime() + 24 * 60 * 60 * 1000)}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Hiển thị số đêm */}
      {nightCount > 0 && (
        <div className="text-sm font-medium text-[#405f2d]">
          {t('nights', { count: nightCount })}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
