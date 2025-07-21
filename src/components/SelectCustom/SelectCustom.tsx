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
    disabled = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const option = options.find(opt => opt.value === value);
            if (option) {
                setSelectedOption(option);
            }
        }
    }, [value, options]);

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
                className={`flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer bg-white hover:bg-gray-50 transition-colors ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="truncate text-sm font-medium">
                    {selectedOption ? selectedOption.label : placeholder}
                </div>
                <div className={`transition-transform ml-2 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm transition-colors ${
                                selectedOption?.value === option.value ? 'bg-blue-50 text-blue-600' : ''
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
