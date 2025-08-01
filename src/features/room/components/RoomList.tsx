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
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState('under650k'); // ID of the selected price range
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

  // Price options with ranges
  const priceOptions = [
    { id: 'under650k', label: '< 650K', from: 0, to: 650000 },
    { id: '700k-900k', label: '700K - 900K', from: 700000, to: 900000 },
    { id: 'above900k', label: '> 900K', from: 900000, to: 10000000 },
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations', count: 12 },
    { value: 'hanoi', label: 'Hà Nội', count: 5, coords: { lat: 21.0285, lng: 105.8542 } },
    { value: 'hcm', label: 'Hồ Chí Minh', count: 4, coords: { lat: 10.8231, lng: 106.6297 } },
    { value: 'danang', label: 'Đà Nẵng', count: 3, coords: { lat: 16.0544, lng: 108.2022 } },
  ];

  const handleFixedPriceRangeChange = (rangeId: string) => {
    setSelectedPriceRange(rangeId);

    // Set price from and to based on the selected range
    const selectedRange = priceOptions.find(option => option.id === rangeId);
    if (selectedRange) {
      setPriceFrom(selectedRange.from);
      setPriceTo(selectedRange.to);
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
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
  }, [selectedLocation]);

  return (
    <div className="room-list flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-/12">
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
          <div className="grid grid-cols-1 gap-6 bg-[#fcfcfc]">
            {rooms.map(room => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                location={room.hotel?.branch?.name || ""}
                image={room.photos?.[0]?.url} /* Fallback image */
                price={room.pricing?.unit || null}
                amenities={room.amenities?.map(amenity => ({
                  name: amenity.name,
                  icon: amenity.icon?.url || ""
                })) || []}
                brand_type={room.hotel?.brand_type || room.room_type?.brand_type}
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
      {/* Location Filter - Map View */}
        <div className="">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('filterByLocation')}</h3>

          {/* Google Maps Iframe */}
          <div className="w-full h-[150px] border border-gray-400 rounded mb-4 overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1600087.0824830188!2d106.40344987989903!3d16.69734200064431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1658278074260!5m2!1sen!2s${
                selectedLocation !== 'all'
                  ? `&center=${locationOptions.find(loc => loc.value === selectedLocation)?.coords?.lat},${locationOptions.find(loc => loc.value === selectedLocation)?.coords?.lng}&zoom=12`
                  : ''
              }`}
              width="100%"
              height="100%"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Price Range Filter */}
        <div className="">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('filterByPrice')}</h3>
          <div className="space-y-4">
            <div>
              {/* Slider for visual representation */}
              <input
                type="range"
                className="w-full accent-[#759d3f] mb-4"
                min="0"
                max="2000000"
                step="50000"
                value={priceTo}
                onChange={(e) => setPriceTo(Number(e.target.value))}
              />

              {/* From and To inputs */}
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-2 text-gray-700">Từ</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full p-2 border rounded pr-8"
                      placeholder="Giá"
                      min="0"
                      max={priceTo}
                      value={priceFrom}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= priceTo) {
                          setPriceFrom(value);
                        }
                      }}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold">đ</span>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm mb-2 text-gray-700">Đến</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full p-2 border rounded pr-8"
                      placeholder="Giá"
                      min={priceFrom}
                      max="2000000"
                      value={priceTo}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= priceFrom) {
                          setPriceTo(value);
                        }
                      }}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold">đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Price Filter */}
        <div className="rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{t('fixedPrice')}</h3>
          <div className="space-y-2">
            {priceOptions.map((option) => (
              <div key={option.id} className="flex items-center py-1">
                <input
                  type="radio"
                  id={`price-${option.id}`}
                  name="price-option"
                  className="mr-2 accent-[#759d3f]"
                  checked={selectedPriceRange === option.id}
                  onChange={() => handleFixedPriceRangeChange(option.id)}
                />
                <label htmlFor={`price-${option.id}`} className="text-gray-700">{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default RoomList;
