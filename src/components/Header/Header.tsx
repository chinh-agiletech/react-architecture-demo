"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import React from 'react';
import SelectComponent from '../SelectCustom/SelectCustom';
import Flag from '../Flag/Flag';
import Image from 'next/image';

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
    }, [currentLanguage, i18n]);

    const handleLanguageChange = (value: string | number) => {
        const locale = value as string;
        localStorage.setItem('language', locale);
        window.location.reload();
    };

    return (
        <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top row - Language selector and Account link */}
                <div className="flex justify-end items-center py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-[150px] flex items-center space-x-2">
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
                        <Link href="/account" className="text-[#405f2d] hover:text-[#5a8941] transition-colors text-sm font-medium">
                            {t('account')}
                        </Link>
                    </div>
                </div>

                {/* Main navigation row */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logo/logo_new.webp"
                            alt="X Hotel Logo"
                            width={150}
                            height={30}
                            className="object-contain h-8 sm:h-9 md:h-10 w-auto"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link
                            href="/member"
                            className="text-[#405f2d] hover:text-[#5a8941] transition-colors text-sm font-medium hover:underline"
                        >
                            {t('xMember')}
                        </Link>
                        <Link
                            href="/long-stay"
                            className="text-[#405f2d] hover:text-[#5a8941] transition-colors text-sm font-medium hover:underline"
                        >
                            {t('longStay')}
                        </Link>
                        <Link
                            href="/about"
                            className="text-[#405f2d] hover:text-[#5a8941] transition-colors text-sm font-medium hover:underline"
                        >
                            {t('aboutXHotel')}
                        </Link>
                        <Link
                            href="/cart"
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f5f8f3] hover:bg-[#e8f0e3] text-[#405f2d] transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
