import React, { useState, useEffect, useRef } from 'react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectComponentProps {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string | number) => void;
    defaultValue?: string | number;
    value?: string | number;
    disabled?: boolean;
    className?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
    options,
    placeholder = 'Select an option',
    onChange,
    value,
    defaultValue,
    disabled = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ưu tiên sử dụng value
        if (value) {
            const option = options.find(opt => opt.value === value);
            if (option) {
                setSelectedOption(option);
            }
        } 
        // Nếu không có value nhưng có defaultValue
        else if (defaultValue) {
            const option = options.find(opt => opt.value === defaultValue);
            if (option) {
                setSelectedOption(option);
            }
        }
        // Nếu không có cả hai, sử dụng option đầu tiên (hoặc options[0])
        else if (options.length > 0) {
            setSelectedOption(options[0]);
        }
    }, [value, defaultValue, options]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOptionClick = (option: SelectOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    };

    return (
        <div 
            ref={selectRef}
            className={`relative w-full ${className}`}
        >
            <div
                className={`flex items-center
                    justify-between px-2 py-1 cursor-pointer bg-transparent hover:text-[#5a8941] transition-colors ${
                    disabled ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="truncate text-sm font-medium">
                    {selectedOption ? selectedOption.label : placeholder}
                </div>
                <div className={`transition-transform ml-1 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-3 py-2 cursor-pointer hover:bg-[#f5f8f3] text-sm transition-colors ${
                                selectedOption?.value === option.value ? 'bg-[#e8f0e3] text-[#405f2d] font-medium' : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectComponent;
