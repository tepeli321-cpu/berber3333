// ============================================================
// config.js — Tüm site ayarları tek yerde.
// ============================================================

const SHOP_NAME = "Gentlemen's Barber Kuaför";
const SHOP_SHORT = "Gentlemen's Barber";
const LOCATION_NAME = "Sultanbeyli";

const ADDRESS = "Yavuz Selim, Antalya Cd. No:8c, 34000 Sultanbeyli/İstanbul";
const MAPS_LINK = "https://maps.google.com/maps/place//data=!4m2!3m1!1s0x14cad13dac62c0dd:0xd207affa754a9b48?entry=s&sa=X&ved=2ahUKEwjR5ZP-2ueWAxVn_7sIHUibJiUQ4kB6BAgEEAA&hl=tr";
const MAP_LAT = 40.9523306;
const MAP_LNG = 29.2806539;

const WHATSAPP_NUMBER = "905333207834";
const PHONE_DISPLAY = "0533 320 78 34";
const INSTAGRAM_URL = "https://www.instagram.com/gentlemensbarbershop34?stkn=NWRnZmhzNjY2OWNq";

// Google Haritalar'dan doğrulanmış gerçek veriler (uydurma değil).
const GOOGLE_RATING = "5.0";
const GOOGLE_RATING_COUNT = "448";

// Gerçek çalışma saatleri (Google Haritalar).
const WORKING_HOURS = [
  { day: "Pazartesi – Perşembe", hours: "09:00 – 23:00" },
  { day: "Cuma – Cumartesi",     hours: "09:00 – 00:00" },
  { day: "Pazar",                hours: "Kapalı" },
];

// Online randevu sistemi şu saat aralığında hizmet verir
// (mesai saatlerinden farklı olarak sabit tutuldu).
const BOOKING_START_HOUR = 9;
const BOOKING_END_HOUR = 21;

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzib5F5v728ZHtnXbMq1qOTeLJkjDqcEilN6sufOoLlCVNNWpJGhlmehPXbo_iPrxwIHw/exec";

const BARBERS = [
  { id: 'barber_1', name: 'Yunus Arslan', names: { tr: 'Yunus Arslan', en: 'Yunus Arslan', fr: 'Yunus Arslan' } },
  { id: 'barber_2', name: 'Berat Arslan', names: { tr: 'Berat Arslan', en: 'Berat Arslan', fr: 'Berat Arslan' } },
  { id: 'barber_3', name: 'Adem', names: { tr: 'Adem', en: 'Adem', fr: 'Adem' } }
];

// Sunulan hizmetler. "features" küçük madde işaretli detaylar için.
const SERVICES = [
  {
    id: 'sac', name: 'Saç Kesimi', tag: 'En Popüler', price: '1200₺',
    img: 'https://images.unsplash.com/photo-1770253980732-dfed1cfdfa43?auto=format&fit=crop&w=600&q=70',
    desc: 'Yüzünüze özel makas ve makine teknikleriyle modern ve klasik kesimler.',
    features: ['Saç yıkama dahil', 'Stil danışmanlığı', 'Şekillendirme ürünü']
  },
  {
    id: 'sakal', name: 'Sakal Tıraşı', tag: 'Klasik Ustalık', price: '400₺',
    img: 'https://images.unsplash.com/photo-1611313151697-d626e818dddf?auto=format&fit=crop&w=600&q=70',  
    desc: 'Klasik ustura ile pürüzsüz düz tıraş ve hassas sakal şekillendirme.',
    features: ['Sıcak havlu uygulaması', 'Ustura tıraşı', 'After-shave bakım']
  },
  {
    id: 'sac_sakal', name: 'Saç + Sakal', tag: 'Kombo', price: '1500₺',
    img: 'https://images.unsplash.com/photo-1582771498000-8ad44e6c84db?auto=format&fit=crop&w=600&q=70',
    desc: 'Saç kesimi ve sakal tıraşı bir arada; tek seansta tam bakım.',
    features: ['Saç yıkama dahil', 'Ustura & şekillendirme', 'Zamandan tasarruf']
  },
  {
    id: 'cocuk', name: 'Çocuk Tıraşı', tag: 'Aile Dostu', price: '500₺',
    img: 'https://i.pinimg.com/736x/39/dd/5a/39dd5a9090aa235c55c1bd71f3c9c414.jpg',
    desc: 'Çocuklar için sabırlı ve özenli, keyifli bir tıraş deneyimi.',
    features: ['Rahat ve güvenli ortam', 'Sevdiği stile uygun kesim']
  },
  {
    id: 'damat', name: 'Damat Tıraşı', tag: 'Özel Gün', price: '2500₺',
    img: 'https://www.burakkarakaya.com.tr/Admin/Media/Blog/e6bc9621-59af-459b-a86a-a1ed427f56ca.jpg',
    desc: 'Özel gününüz için baştan aşağı özel bakım ve şekillendirme paketi.',
    features: ['Saç + sakal + cilt bakımı', 'Detaylı stil çalışması']
  },
  {
    id: 'cilt', name: 'Yüz / Cilt Bakımı', tag: 'Tazelenme', price: '300₺',
    img: 'https://img.freepik.com/premium-photo/man-getting-facial-professional-salon-realistic-spa-treatment-skincare_1106493-85697.jpg',
    desc: 'Erkek cildine özel derin temizlik, buhar uygulaması ve nemlendirme.',
    features: ['Derin gözenek temizliği', 'Buhar uygulaması', 'Nemlendirici maske']
  },
  {
    id: 'fon', name: 'Fön & Şekillendirme', tag: 'Hızlı', price: '250₺',
    img: 'https://bligoo.es/wp-content/uploads/2022/08/Cortes-de-cabello-adecuado-para-el-hombre-mayor.jpg',
    desc: 'Günlük kullanım veya özel anlar için profesyonel fön ve şekillendirme.',
    features: ['Hızlı uygulama', 'Uzun süre kalıcı stil']
  },
  {
    id: 'boya', name: 'Saç Boyama', tag: 'Yenilenme', price: '2500₺',
    img: 'https://static.wixstatic.com/media/09a761_22295d58ba7b498ca9fa0660fa34c593~mv2.png/v1/fill/w_680,h_655,al_c,q_90,enc_auto/09a761_22295d58ba7b498ca9fa0660fa34c593~mv2.png',
    desc: 'Doğal görünümlü, kaliteli ürünlerle saç boyama ve ton çalışması.',
    features: ['Profesyonel ürünler', 'Renk danışmanlığı']
  },
];

const MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
];

function buildTimeSlots(){
  const slots = [];
  for(let h = BOOKING_START_HOUR; h < BOOKING_END_HOUR; h++){
    const start = String(h).padStart(2,'0') + ':00';
    const end = String(h+1).padStart(2,'0') + ':00';
    slots.push(start + ' - ' + end);
  }
  return slots;
}
const TIME_SLOTS = buildTimeSlots();