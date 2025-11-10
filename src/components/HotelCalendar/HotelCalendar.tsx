import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HotelCalendar() {
  const [checkIn, setCheckIn] = useState(new Date(2025, 11, 10)); // Dec 10, 2025
  const [checkOut, setCheckOut] = useState(new Date(2025, 11, 17)); // Dec 17, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025
  const [isSelecting, setIsSelecting] = useState(false);
  const [tempDate, setTempDate] = useState(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isInRange = (date: Date, month: number) => {
    const checkDate = new Date(date.getFullYear(), month, date.getDate());
    return checkDate > checkIn && checkDate < checkOut;
  };

  const handleDateClick = (day: number | undefined, month: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + month,
      day
    );

    if (!isSelecting) {
      setCheckIn(selectedDate);
      setCheckOut(null);
      setIsSelecting(true);
      setTempDate(selectedDate);
    } else {
      if (selectedDate > tempDate) {
        setCheckOut(selectedDate);
      } else {
        setCheckIn(selectedDate);
        setCheckOut(tempDate);
      }
      setIsSelecting(false);
      setTempDate(null);
    }
  };

  const renderCalendar = (monthOffset: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      1
    );
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(date);
    const month = date.getMonth();
    const year = date.getFullYear();

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isCheckInDay = checkIn && isSameDay(currentDate, checkIn);
      const isCheckOutDay = checkOut && isSameDay(currentDate, checkOut);
      const isInRangeDay = checkOut && isInRange(currentDate, month);
      const isPast = currentDate < new Date(2025, 10, 10);

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day, monthOffset)}
          disabled={isPast}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm relative
            ${
              isPast
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer"
            }
            ${
              isCheckInDay || isCheckOutDay
                ? "bg-[#405f2d] text-white font-semibold"
                : ""
            }
            ${isInRangeDay ? "bg-[#e8f0e3]" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="flex-1 px-4">
        <div className="text-center font-semibold text-lg text-[24px]">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const nightCount =
    checkOut && checkIn
      ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  const formatDate = (date: Date) => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return `${days[date.getDay()]} ${date.getDate()} ${monthNames[
      date.getMonth()
    ].slice(0, 3)} ${date.getFullYear()}`;
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-[587px] max-h-[547px]">
      {/* Date Selection Headers */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 border border-gray-300 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Check-in</div>
          <div className="text-lg font-semibold text-[#405f2d]">
            {formatDate(checkIn)}
          </div>
        </div>
        <div className="flex-1 border border-gray-300 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Check-out</div>
          <div className="text-lg font-semibold text-[#405f2d]">
            {checkOut ? formatDate(checkOut) : "Select date"}
          </div>
        </div>
      </div>

      {/* Night Count */}
      <div className="text-center text-md text-gray-600 mb-1 border border-[#f6f6f6] rounded-[30px] bg-[#f6f6f6] p-2">
        {nightCount} nights
      </div>

      {/* Calendar Navigation */}
      <div className="relative">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full absolute"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full absolute right-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Two Month Calendars */}
      <div className="flex gap-4">
        {renderCalendar(0)}
        {renderCalendar(1)}
      </div>
    </div>
  );
}
