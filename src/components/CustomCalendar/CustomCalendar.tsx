// components/CustomCalendar.tsx
"use client";

import { useState } from "react";
import { DateRange, Range, RangeKeyDict, Calendar } from "react-date-range";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
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
                ? `${Math.round((+range[0].endDate - +range[0].startDate) / (1000 * 3600 * 24))} đêm`
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

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-sm text-[#6d6d6d]">{label}</p>
        <p className="font-semibold text-[#405f2d]">
          {format(selectedDate, "EEE dd MMM yyyy", { locale: vi })}
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

export default DateRangePicker;
