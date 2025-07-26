"use client";

import SelectComponent from '../../../components/SelectCustom/SelectCustom';
import RoomCard from './RoomCard';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAvailableRooms, RoomAvailabilityParams, RoomAvailable, HourPricingType, OrderBy } from '../../../services/roomService';

const RoomList = () => {
  // Initialize i18n
  const { t } = useTranslation();

  // Price filter states
  const [priceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(500000);
  const [selectedFixedPrice, setSelectedFixedPrice] = useState(500000);
  const [selectedLocation, setSelectedLocation] = useState('all');

  // API data states
  const [rooms, setRooms] = useState<RoomAvailable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    page_size: 15,
    total_pages: 0
  });

  // Price options
  const priceOptions = [
    { value: 500000, label: '500K' },
    { value: 650000, label: '650K' },
    { value: 800000, label: '800K' },
    { value: 950000, label: '950K' },
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations', count: 12 },
    { value: 'hanoi', label: 'Hà Nội', count: 5, coords: { lat: 21.0285, lng: 105.8542 } },
    { value: 'hcm', label: 'Hồ Chí Minh', count: 4, coords: { lat: 10.8231, lng: 106.6297 } },
    { value: 'danang', label: 'Đà Nẵng', count: 3, coords: { lat: 16.0544, lng: 108.2022 } },
  ];

  const handlePriceRangeChange = (price: number) => {
    setPriceTo(price);
    console.log('Price range:', priceFrom, 'to', price);
  };

  const handleFixedPriceChange = (price: number) => {
    setSelectedFixedPrice(price);
    console.log('Fixed price:', price);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    console.log('Location filter:', location);
  };

  const createApiParams = (): RoomAvailabilityParams => {
    // Get current date/time
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    // Format dates for API in YYYY-MM-DD format
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      page: 1,
      page_size: 15,
      adult: 2,
      child: 0,
      start_time: formatDate(now),
      end_time: formatDate(tomorrow),
    };
  };

  const handleSortChange = (sortValue: string | number) => {
    fetchRooms(String(sortValue));
  };

  const fetchRooms = async (sortValue: string = 'default') => {
    setLoading(true);
    setError(null);

    try {
      const params = createApiParams();

      if (sortValue === 'price-asc') {
        params.sort_by = 'price';
        params.order_by = OrderBy.ASC;
      } else if (sortValue === 'price-desc') {
        params.sort_by = 'price';
        params.order_by = OrderBy.DESC;
      }

      const response = await getAvailableRooms(params);
      setRooms(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch rooms. Please try again later.');
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedFixedPrice, priceTo, selectedLocation]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-8/12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{pagination.total || rooms.length}</span>
            <h2 className="text-xl font-semibold min-w-[180px]">{t('suitableChoices')}</h2>
          </div>
          <div className="flex items-center gap-2 w-[200px]">
            <SelectComponent
              options={[
                { value: 'default', label: t('sortDefault') },
                { value: 'price-asc', label: t('sortPriceAsc') },
                { value: 'price-desc', label: t('sortPriceDesc') }
              ]}
              defaultValue="default"
              onChange={(value) => handleSortChange(value as string)}
              className="border border-none"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#759d3f]"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            <p>{error}</p>
            <button
              onClick={() => fetchRooms()}
              className="mt-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              {t('tryAgain')}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && rooms.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">{t('noRoomsFound')}</p>
          </div>
        )}

        {/* Product List */}
        {!loading && !error && rooms.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                location={room.hotel?.branch?.name || ""}
                image={room.photos?.[0]?.url || "/can-ho-khach-san-tai-thai-nguyen-phong-xhome-vip-1.webp"} /* Fallback image */
                price={room.pricing?.unit || null}
                amenities={room.amenities?.map(amenity => ({
                  name: amenity.name,
                  icon: amenity.icon?.url || ""
                })) || []}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.total_pages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    const params = createApiParams();
                    params.page = page;
                    // Ensure we're keeping the same page_size
                    params.page_size = 15;
                    getAvailableRooms(params).then(response => {
                      setRooms(response.data);
                      setPagination(response.pagination);
                    });
                  }}
                  className={`px-4 py-2 rounded-md ${
                    pagination.page === page
                      ? 'bg-[#759d3f] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Filters */}
      <div className="w-full md:w-4/12">
        {/* Price Range Filter */}
        <div className="rounded-lg p-4 border border-gray-200 mb-4 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('filterByPrice')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">{t('priceRange')}</label>
              <input
                type="range"
                className="w-full accent-[#759d3f]"
                min="0"
                max="1000000"
                step="50000"
                value={priceTo}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
              />
              <div className="flex justify-between gap-2 mt-3">
                <div className="w-1/2">
                  <label className="text-xs text-gray-500 block mb-1">{t('priceFrom')}</label>
                  <div className="border rounded p-2 text-center bg-gray-50">
                    <span>{priceFrom.toLocaleString()}₫</span>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="text-xs text-gray-500 block mb-1">{t('priceTo')}</label>
                  <div className="border rounded p-2 text-center bg-gray-50">
                    <span>{priceTo.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Price Filter */}
        <div className="rounded-lg p-4 border border-gray-200 mb-4 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('fixedPrice')}</h3>
          <div className="space-y-2">
            {priceOptions.map((option) => (
              <div key={option.value} className="flex items-center py-1">
                <input
                  type="radio"
                  id={`price-${option.value}`}
                  name="price-option"
                  className="mr-2 accent-[#759d3f]"
                  checked={selectedFixedPrice === option.value}
                  onChange={() => handleFixedPriceChange(option.value)}
                />
                <label htmlFor={`price-${option.value}`} className="text-gray-700">{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter - Map View */}
        <div className="rounded-lg p-4 border border-gray-200 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('filterByLocation')}</h3>

          {/* Google Maps Iframe */}
          <div className="w-full h-[250px] border rounded mb-4 overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1600087.0824830188!2d106.40344987989903!3d16.69734200064431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1658278074260!5m2!1sen!2s${
                selectedLocation !== 'all'
                  ? `&center=${locationOptions.find(loc => loc.value === selectedLocation)?.coords?.lat},${locationOptions.find(loc => loc.value === selectedLocation)?.coords?.lng}&zoom=12`
                  : ''
              }`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Location Markers on top of map */}
          <div className="flex flex-wrap gap-2 mb-4">
            {locationOptions.filter(loc => loc.value !== 'all').map((location) => (
              <div
                key={location.value}
                className={`flex items-center cursor-pointer transition-all duration-200 px-2 py-1 rounded ${
                  selectedLocation === location.value
                    ? 'bg-[#759d3f] text-white'
                    : 'bg-white border border-[#759d3f] text-[#759d3f] hover:bg-[#f3f7eb]'
                }`}
                onClick={() => handleLocationChange(location.value)}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{location.label}</span>
                  <span className="text-xs ml-1">({location.count})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Location List */}
          <div className="space-y-2">
            <div
              key="all"
              className={`flex items-center py-1 px-2 rounded cursor-pointer ${
                selectedLocation === 'all' ? 'bg-[#f3f7eb]' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleLocationChange('all')}
            >
              <span className={`mr-2 ${selectedLocation === 'all' ? 'text-[#759d3f] font-medium' : 'text-gray-700'}`}>
                {t('allLocations')} ({locationOptions.reduce((sum, loc) => loc.value !== 'all' ? sum + loc.count : sum, 0)})
              </span>
            </div>

            {locationOptions.filter(loc => loc.value !== 'all').map((option) => (
              <div
                key={option.value}
                className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer ${
                  selectedLocation === option.value ? 'bg-[#f3f7eb]' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleLocationChange(option.value)}
              >
                <span className={`${selectedLocation === option.value ? 'text-[#759d3f] font-medium' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                <span className="text-sm text-gray-500">
                  {option.count} {option.count === 1 ? 'room' : 'rooms'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomList;
