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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('common');

  // Find the selected option for display
  const selectedOption = options.find((option) => option.value === selectedValue) || options[options.length - 1];

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        className="flex justify-center items-center gap-2 py-2 rounded-full cursor-pointer"
      >
        <div>
          <p className="font-semibold text-[#405f2d] text-base transition-colors">
            {selectedOption.label}
          </p>
        </div>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 shadow-lg bg-[#f6f6f6] ring-1 ring-black/5 dark:ring-white/10 p-3 animate-fade-in-up rounded-lg transition-colors min-w-[450px]">
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`px-4 py-2 ${
                  selectedOption.value === option.value
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                    : "hover:bg-gray-100 text-green-800 dark:text-green-300"
                } rounded-full font-semibold text-base hover:bg-green-200 dark:hover:bg-green-700 transition-colors text-center cursor-pointer`}
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
