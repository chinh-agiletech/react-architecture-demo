'use client';
import { useState, useEffect } from 'react';
import { Room } from '../type';
import { rooms } from '../data/room';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const RoomDetail = ({ id }: { id: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [guestCount, setGuestCount] = useState(2);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    try {
      const foundRoom = rooms.find(room => room.id === id);
      
      if (!foundRoom) {
        throw new Error('Room not found');
      }
      
      setRoom(foundRoom);
      setLoading(false);
    } catch (err) {
      console.error('Failed to get room data:', err);
      setError(`Error getting room data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [id]);
  
  // Sample room images - will be replaced with real data once loaded
  const images = [
    "/can-ho-khach-san-tai-thai-nguyen-phong-xhome-vip-1.webp",
    "/can-ho-khach-san-tai-thai-nguyen-phong-xhome-vip-2.webp",
    "/can-ho-khach-san-tai-thai-nguyen-phong-xhome-vip-3.webp",
    "/can-ho-khach-san-tai-thai-nguyen-phong-xhome-vip-4.webp"
  ];

  // Use room amenities if available, otherwise use default features
  const features = room?.amenities || [
    { name: "Bộ bàn ăn", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Smart TV", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: "Máy giặt", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { name: "Ghế sofa", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { name: "Tủ lạnh", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { name: "Bếp từ", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { name: "Điều hòa", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: "Wifi", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-gray-600 hover:text-green-600">
                {t('home')}
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <a href="#" className="text-gray-600 hover:text-green-600 ml-1 md:ml-2">
                  {t('rooms')}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-gray-500 ml-1 md:ml-2">XHome VIP</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Title */}
      <div className="mb-8">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">{room?.name}</h1>
            <p className="text-green-600">{room?.location}</p>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image Gallery */}
        <div className="w-full lg:w-7/12">
          {loading ? (
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <div className="mb-4 relative w-full h-96">
                <Image 
                  src={room?.image || images[selectedImage]} 
                  alt={`${room?.name} - Image ${selectedImage + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* For now, using sample images as room might only have one image */}
                {images.map((img, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border-2 rounded-md overflow-hidden ${selectedImage === index ? 'border-green-500' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="relative w-full h-20">
                      <Image 
                        src={index === 0 ? (room?.image || img) : img} 
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Right Column - Room Details & Booking */}
        <div className="w-full lg:w-5/12">
          {/* Price Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xl font-bold">920.000 VND</p>
                <p className="text-sm text-gray-500">{t('perNight')}</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-lg font-bold">4.9</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-500">42 {t('reviews')}</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkIn')}</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('checkOut')}</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
              </div>
            </div>

            {/* Guest Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('guests')}</label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-l-md" 
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{guestCount}</span>
                <button 
                  className="bg-gray-200 px-3 py-1 rounded-r-md"
                  onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Booking Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                {t('bookNow')}
              </button>
              <button className="w-full border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors">
                {t('contactHost')}
              </button>
            </div>
          </div>
          
          {/* Room Features */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t('roomFeatures')}</h2>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </span>
                  <span className="text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Room Description */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{t('aboutRoom')}</h2>
        <div className="prose max-w-none">
          <p>
            XHOME VIP là phòng cao cấp nhất tại XHOME THÁI NGUYÊN, được thiết kế hiện đại với không gian rộng rãi. 
            Phòng được trang bị đầy đủ tiện nghi như Smart TV, máy giặt, tủ lạnh, điều hòa và khu vực bếp đầy đủ.
          </p>
          <p className="mt-4">
            Khách lưu trú sẽ được tận hưởng không gian sống tiện nghi như tại nhà với đầy đủ dịch vụ của khách sạn cao cấp.
            Phù hợp cho cả gia đình và khách doanh nhân yêu cầu không gian riêng tư, tiện nghi.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">{t('roomHighlights')}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Diện tích 45m²</li>
            <li>Giường King size</li>
            <li>Tầm nhìn ra thành phố</li>
            <li>Bếp đầy đủ tiện nghi</li>
            <li>Phòng tắm riêng với vòi sen</li>
            <li>Wifi tốc độ cao miễn phí</li>
            <li>Dịch vụ dọn phòng hàng ngày</li>
          </ul>
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{t('location')}</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14895.691196501715!2d105.84096516977537!3d21.011149200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHanoi%20Opera%20House!5e0!3m2!1sen!2s!4v1637051596221!5m2!1sen!2s" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="prose max-w-none">
          <p>
            Tọa lạc tại trung tâm thành phố Thái Nguyên, XHOME THÁI NGUYÊN chỉ cách các điểm tham quan, mua sắm và ẩm thực nổi tiếng vài phút đi bộ.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-4">
            <li>Cách trung tâm thương mại 500m</li>
            <li>Cách chợ đêm 700m</li>
            <li>Cách Đại học Thái Nguyên 2km</li>
            <li>Cách bến xe 3km</li>
          </ul>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{t('guestReviews')}</h2>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-lg font-bold">4.9</span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-sm text-gray-500">42 {t('reviews')}</span>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <div className="flex items-center mb-2">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Reviewer" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-medium">Mai Lan</p>
                <p className="text-sm text-gray-500">November 2023</p>
              </div>
            </div>
            <p className="text-gray-700">
              Phòng rất đẹp và sạch sẽ, đầy đủ tiện nghi như mô tả. Vị trí thuận tiện, gần trung tâm. 
              Nhân viên thân thiện và nhiệt tình. Tôi sẽ quay lại lần sau.
            </p>
          </div>

          <div className="border-b pb-6">
            <div className="flex items-center mb-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Reviewer" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-medium">Minh Tuấn</p>
                <p className="text-sm text-gray-500">October 2023</p>
              </div>
            </div>
            <p className="text-gray-700">
              Không gian rộng rãi, thiết kế hiện đại và đầy đủ tiện nghi. 
              Tôi đặc biệt thích khu vực bếp được trang bị đầy đủ để có thể tự nấu ăn. 
              Giá cả hợp lý cho những gì được cung cấp.
            </p>
          </div>

          <div className="text-center mt-4">
            <button className="text-green-600 hover:text-green-800 font-medium">
              {t('showAllReviews', { count: 42 })}
            </button>
          </div>
        </div>
      </div>

      {/* Related Rooms Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">{t('similarRooms')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={`/can-ho-khach-san-tai-thai-nguyen-phong-xhome-${item}.webp`} 
                alt={`XHome Room ${item}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">XHome Standard {item}</h3>
                <p className="text-green-600 text-sm mb-2">XHOME THÁI NGUYÊN</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm">4.8</span>
                  </div>
                  <p className="font-semibold text-green-700">{780 + (item * 50)}.000 VND</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
