"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';

type OptionType = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: OptionType[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  hideIcon?: boolean;
}

const Dropdown = ({ options, selectedValue = "", onSelect, hideIcon = false }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation('common');

  // Find the selected option for display
  const selectedOption = options.find((option) => option.value === selectedValue) || options[options.length - 1];

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 py-2 rounded-full hover:shadow"
      >
        {!hideIcon && (
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 20s6-5.686 6-10A6 6 0 0 0 4 10c0 4.314 6 10 6 10zm0-13a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          </svg>
        )}
        <div>
          <p className="text-xs text-[#6d6d6d] truncate">
            {hideIcon ? t('brand') : t('location')}
          </p>
          <p className="font-semibold text-[#405f2d] text-sm truncate whitespace-nowrap">
            {selectedOption.label}
          </p>
        </div>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 shadow-lg bg-white ring-1 ring-black/5 p-2 animate-fade-in-up rounded">
          <div className="flex flex-row space-x-1">
            {options.map((option) => (
              <button
          key={option.value}
          onClick={() => handleOptionSelect(option.value)}
          className={`px-3 py-1 ${
            selectedOption.value === option.value ? "bg-green-100" : "hover:bg-gray-100"
          } rounded-full text-green-800 font-semibold text-sm hover:bg-green-200 transition w-[120px]`}
              >
          {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
