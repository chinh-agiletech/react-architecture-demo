import { NextRequest, NextResponse } from 'next/server';

// Danh sách các ngôn ngữ được hỗ trợ
const supportedLocales = ['vi', 'en'];

// Hàm kiểm tra xem ngôn ngữ có hỗ trợ hay không
function getLocale(request: NextRequest) {
  // Ưu tiên ngôn ngữ từ cookie hoặc query params
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const queryLocale = request.nextUrl.searchParams.get('locale');
  
  // Lấy từ Accept-Language header nếu không có trong cookie hay query
  const acceptLanguage = request.headers.get('Accept-Language');
  const headerLocales = acceptLanguage ? 
    acceptLanguage.split(',').map(locale => locale.split(';')[0].trim()) : 
    [];
  
  // Tìm ngôn ngữ đầu tiên được hỗ trợ
  const locale = cookieLocale || queryLocale || 
    headerLocales.find(l => supportedLocales.some(sl => l.startsWith(sl))) || 
    'vi'; // Mặc định là tiếng Việt
  
  return supportedLocales.includes(locale) ? locale : 'vi';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bỏ qua các request API, static files, v.v.
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Xác định ngôn ngữ
  const locale = getLocale(request);
  
  // Đặt cookie cho ngôn ngữ đã chọn
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', locale);
  
  // Redirect root path to the determined locale path (vi instead of en)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  
  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
