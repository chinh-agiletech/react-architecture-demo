"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { vi } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import { useTranslation } from "react-i18next";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import HotelCalendar from "@/components/HotelCalendar/HotelCalendar";

// Custom date formatter for Vietnamese short format
const formatVietnameseShort = (date: Date): string => {
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const monthNames = [
    "Th01",
    "Th02",
    "Th03",
    "Th04",
    "Th05",
    "Th06",
    "Th07",
    "Th08",
    "Th09",
    "Th10",
    "Th11",
    "Th12",
  ];

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
  singleCalendar = false,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");
  const calendarRef = useRef<HTMLDivElement>(null);

  const finalStartLabel = startLabel || t("checkInDate");
  const finalEndLabel = endLabel || t("checkOutDate");

  // State cho DateRange picker
  const [range, setRange] = useState<Range[]>([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
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
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const selected = ranges.selection;
    if (selected.startDate && selected.endDate) {
      setRange([selected]);
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-[16px]">
        <div
          className="cursor-pointer flex gap-[12px] items-center"
          onClick={() => setOpen(true)}
        >
          <div className="">
            <Image
              src="/calendar-249.png"
              alt="Calendar icon"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-sm text-[#6d6d6d]">{finalStartLabel}</p>
            <p className="font-semibold text-[#405f2d]">
              {range[0].startDate && formatVietnameseShort(range[0].startDate)}
            </p>
          </div>
        </div>

        {/* Check-out date display */}
        <div
          className="cursor-pointer flex gap-[12px] items-center"
          onClick={() => setOpen(true)}
        >
          <div className="">
            <Image
              src="/calendar-249.png"
              alt="Calendar icon"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-sm text-[#6d6d6d]">{finalEndLabel}</p>
            <p className="font-semibold text-[#405f2d]">
              {range[0].endDate && formatVietnameseShort(range[0].endDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar popup */}
      {open && (
        <div
          ref={calendarRef}
          className="absolute z-50 bg-white rounded-xl shadow-xl"
        >
          <HotelCalendar />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
