"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import React from 'react';
import SelectComponent from '../SelectCustom/SelectCustom';
import Flag from '../Flag/Flag';
import { getCurrentLanguage } from '../../lib/languageUtils';

function Header()
{
    const { t, i18n } = useTranslation('common');
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'vi');

    // Set initial language from localStorage if available
    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang && storedLang !== currentLanguage) {
            setCurrentLanguage(storedLang);
            i18n.changeLanguage(storedLang);
        }
    }, []);

    const handleLanguageChange = (value: string | number) => {
        const locale = value as string;
        setCurrentLanguage(locale);
        i18n.changeLanguage(locale);
    };

    return (
        <header className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 h-16">
                    {/* First column - Language selector and Account link */}
                    <div className="flex justify-end mt-4 items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <Flag country={currentLanguage === 'vi' ? 'vi' : 'en'} />
                            <SelectComponent
                                options={[
                                    { value: 'vi', label: t('vietnamese') },
                                    { value: 'en', label: t('english') }
                                ]}
                                defaultValue={currentLanguage}
                                onChange={handleLanguageChange}
                                className="w-32"
                            />
                        </div>
                        <Link href="/account" className="text-[#405f2d] transition-colors text-md">
                            {t('account')}
                        </Link>
                    </div>

                    {/* Second column - Logo and Navigation */}
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2 w-[200px]">
                                <img src="/logo/logo_new.webp" alt="X Hotel Logo" width={200} height={200} className="object-contain h-8 w-8" />
                            </Link>

                        {/* Navigation */}
                        <div className="flex items-center space-x-6">
                            <Link href="/member" className="text-[#405f2d] hover:text-gray-900 transition-colors text-sm">
                                {t('xMember')}
                            </Link>
                            <Link href="/long-stay" className="text-[#405f2d] hover:text-gray-900 transition-colors text-sm">
                                {t('longStay')}
                            </Link>
                            <Link href="/about" className="text-[#405f2d] hover:text-gray-900 transition-colors text-sm">
                                {t('aboutXHotel')}
                            </Link>
                            <Link href="/cart" className="text-[#405f2d] hover:text-gray-900 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
