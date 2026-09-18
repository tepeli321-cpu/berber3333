// ============================================================
// site.js — index.html Arayüz ve Form Mantığı
// ============================================================

let existingAppointments = [];
const storedLanguage = localStorage.getItem('siteLanguage');
let currentLanguage = storedLanguage === 'fr' || storedLanguage === 'en' ? storedLanguage : 'tr';
let selectedBarberId = localStorage.getItem('selectedBarberId') || 'barber_1';

const FR_SERVICES = {
  sac: { name: 'Coupe de cheveux', tag: 'Le plus populaire', desc: 'Coupes modernes et classiques réalisées avec précision à la tondeuse et aux ciseaux.', features: ['Lavage inclus', 'Conseil de style', 'Produit de finition'] },
  sakal: { name: 'Taille de barbe', tag: 'Art classique', desc: 'Rasage au rasoir de sécurité et modelage précis de la barbe.', features: ['Serviette chaude', 'Rasage au rasoir', 'Soin après-rasage'] },
  sac_sakal: { name: 'Cheveux + Barbe', tag: 'Combo', desc: 'Coupe de cheveux et taille de barbe en une seule visite.', features: ['Lavage inclus', 'Rasage et coiffage', 'Gain de temps'] },
  cocuk: { name: 'Coupe enfants', tag: 'Familial', desc: 'Une expérience de coupe patiente et agréable pour les enfants.', features: ['Environnement sûr et confortable', 'Coupe adaptée à leur style'] },
  damat: { name: 'Forfait mariage', tag: 'Journée spéciale', desc: 'Forfait complet de soins et de coiffage pour votre journée spéciale.', features: ['Cheveux + barbe + soin visage', 'Consultation de style détaillée'] },
  cilt: { name: 'Soin visage / peau', tag: 'Rafraîchir', desc: 'Nettoyage en profondeur, vapeur et hydratation pour la peau masculine.', features: ['Nettoyage profond', 'Vapeur', 'Masque hydratant'] },
  fon: { name: 'Séchage & coiffage', tag: 'Rapide', desc: 'Séchage et coiffage professionnels pour chaque jour ou occasion spéciale.', features: ['Application rapide', 'Style durable'] },
  boya: { name: 'Coloration capillaire', tag: 'Rénovation', desc: 'Coloration et toning avec des produits de qualité pour un aspect naturel.', features: ['Produits professionnels', 'Conseil couleur'] }
};

const EN_SERVICES = {
  sac: { name: 'Haircut', tag: 'Most popular', desc: 'Modern and classic cuts tailored precisely with clippers and scissors.', features: ['Wash included', 'Style advice', 'Finishing product'] },
  sakal: { name: 'Beard trim', tag: 'Classic craft', desc: 'Smooth razor shave and precise beard shaping with expert finishing.', features: ['Warm towel', 'Safety razor shave', 'After-shave care'] },
  sac_sakal: { name: 'Hair + Beard', tag: 'Combo', desc: 'Haircut and beard trim in one visit for a complete grooming session.', features: ['Wash included', 'Shave & styling', 'Time-saving'] },
  cocuk: { name: 'Kids cut', tag: 'Family friendly', desc: 'A patient and comfortable cutting experience designed for children.', features: ['Comfortable and safe space', 'Cut tailored to their style'] },
  damat: { name: 'Wedding package', tag: 'Special day', desc: 'Full grooming and styling package prepared for your special day.', features: ['Hair + beard + facial care', 'Detailed style consultation'] },
  cilt: { name: 'Facial / skin care', tag: 'Refresh', desc: 'Deep cleansing, steam treatment and hydration for men’s skin.', features: ['Deep cleansing', 'Steam treatment', 'Hydrating mask'] },
  fon: { name: 'Drying & styling', tag: 'Fast', desc: 'Professional blow-dry and styling for everyday or special occasions.', features: ['Quick application', 'Long-lasting style'] },
  boya: { name: 'Hair coloring', tag: 'Renewal', desc: 'Professional hair coloring and tone work with premium products.', features: ['Professional products', 'Color consultation'] }
};

function localizedService(service){
  if(currentLanguage === 'fr' && FR_SERVICES[service.id]) return { ...service, ...FR_SERVICES[service.id] };
  if(currentLanguage === 'en' && EN_SERVICES[service.id]) return { ...service, ...EN_SERVICES[service.id] };
  return service;
}

function applyLanguage(){
  const french = currentLanguage === 'fr';
  const english = currentLanguage === 'en';
  document.querySelectorAll('#language-select [data-language]').forEach(button => {
    button.classList.toggle('active', button.dataset.language === currentLanguage);
  });
  document.documentElement.lang = currentLanguage;
  document.title = french ? "Gentlemen's Barber — Sultanbeyli" : english ? "Gentlemen's Barber — Sultanbeyli" : "Gentlemen's Barber Kuaför — Sultanbeyli";
  
  const nav1 = document.querySelector('.nav-links li:nth-child(1) a'); if(nav1) nav1.textContent = french ? 'Services' : english ? 'Services' : 'Hizmetler';
  const nav2 = document.querySelector('.nav-links li:nth-child(2) a'); if(nav2) nav2.textContent = french ? 'Tarifs' : english ? 'Prices' : 'Fiyatlar';
  const nav3 = document.querySelector('.nav-links li:nth-child(3) a'); if(nav3) nav3.textContent = french ? 'À propos' : english ? 'About' : 'Hakkımızda';
  const nav4 = document.querySelector('.nav-links li:nth-child(4) a'); if(nav4) nav4.textContent = french ? 'Réservation' : english ? 'Booking' : 'Randevu';
  const nav5 = document.querySelector('.nav-links li:nth-child(5) a'); if(nav5) nav5.textContent = french ? 'Contact' : english ? 'Contact' : 'İletişim';
  
  document.querySelectorAll('.js-booking-link').forEach(el => el.textContent = french ? 'Réserver' : english ? 'Book Now' : 'Randevu Al');
  const priceLink = document.querySelector('.js-prices-link'); if(priceLink) priceLink.textContent = french ? 'Liste des prix' : english ? 'Price List' : 'Fiyat Listesi';
  
  renderWorkingHours();
  renderServiceCards();
  renderPriceList();
  populateFormSelects();
  populateDays();
}

document.addEventListener('DOMContentLoaded', function(){
  renderShopInfo();
  const languageSelect = document.getElementById('language-select');
  if(languageSelect){
    languageSelect.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => {
        currentLanguage = button.dataset.language;
        localStorage.setItem('siteLanguage', currentLanguage);
        applyLanguage();
      });
    });
  }
  
  renderWorkingHours();
  renderServiceCards();
  renderPriceList();
  populateFormSelects();
  populateDays();
  fetchAppointmentsForSlots();
  setupScrollReveal();
  applyLanguage();

  const fDay = document.getElementById('f-day');
  if(fDay) fDay.addEventListener('change', () => { updateTimeSlots(); fetchAppointmentsForSlots(); });
  
  const fMonth = document.getElementById('f-month');
  if(fMonth) fMonth.addEventListener('change', () => { populateDays(); fetchAppointmentsForSlots(); });
  
  const fYear = document.getElementById('f-year');
  if(fYear) fYear.addEventListener('change', () => { populateDays(); fetchAppointmentsForSlots(); });
  
  const fBarber = document.getElementById('f-barber');
  if(fBarber) fBarber.addEventListener('change', () => {
    selectedBarberId = fBarber.value || 'barber_1';
    localStorage.setItem('selectedBarberId', selectedBarberId);
    updateTimeSlots();
    fetchAppointmentsForSlots();
  });

  const bookingForm = document.getElementById('booking-form');
  if(bookingForm) bookingForm.addEventListener('submit', handleBookingSubmit);
});

function renderShopInfo(){
  document.querySelectorAll('.js-shop-name').forEach(el => el.textContent = SHOP_NAME);
  document.querySelectorAll('.js-shop-short').forEach(el => el.textContent = SHOP_SHORT);
  document.querySelectorAll('.js-location').forEach(el => el.textContent = LOCATION_NAME);
  document.querySelectorAll('.js-address').forEach(el => el.textContent = ADDRESS);
  document.querySelectorAll('.js-phone').forEach(el => el.textContent = PHONE_DISPLAY);
  document.querySelectorAll('.js-rating').forEach(el => el.textContent = GOOGLE_RATING);
  document.querySelectorAll('.js-rating-count').forEach(el => el.textContent = GOOGLE_RATING_COUNT);
  document.querySelectorAll('.js-service-count').forEach(el => el.textContent = SERVICES.length);

  document.querySelectorAll('.js-logo-icon').forEach(el => { if(typeof logoMarkSVG === 'function') el.innerHTML = logoMarkSVG(); });

  const mapFrame = document.getElementById('map-frame');
  if(mapFrame) mapFrame.src = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`;

  document.querySelectorAll('.js-whatsapp-link').forEach(el => { el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba%2C%20randevu%20almak%20istiyorum.`; });
  document.querySelectorAll('.js-instagram-link').forEach(el => { el.href = INSTAGRAM_URL; });
  document.querySelectorAll('.js-maps-link').forEach(el => { el.href = MAPS_LINK; });
  document.querySelectorAll('.js-phone-link').forEach(el => { el.href = `tel:+${WHATSAPP_NUMBER}`; });
}

function renderWorkingHours(){
  const table = document.getElementById('hours-table');
  if(!table) return;
  const rows = WORKING_HOURS;
  table.innerHTML = rows.map(row => `<tr><td>${row.day}</td><td>${row.hours}</td></tr>`).join('');
}

function renderServiceCards(){
  const grid = document.getElementById('services-grid');
  if(!grid) return;
  grid.innerHTML = SERVICES.map((rawService) => { 
    const s = localizedService(rawService); 
    return `
      <div class="service-card">
        <img class="service-photo" src="${s.img}" alt="${s.name}" loading="lazy">
        <div class="service-card-body">
          <div class="tag">${s.tag}</div>
          <h3>${s.name}</h3>
          <div class="price">${s.price}</div>
          <p>${s.desc}</p>
        </div>
      </div>
    `; 
  }).join('');
}

function renderPriceList(){
  const list = document.getElementById('price-list');
  if(!list) return;
  list.innerHTML = SERVICES.map(rawService => { 
    const s = localizedService(rawService); 
    return `
      <div class="price-item">
        <div class="price-item-top">
          <div>
            <div class="tag">${s.tag}</div>
            <h3>${s.name}</h3>
          </div>
          <div class="price">${s.price}</div>
        </div>
        <p>${s.desc}</p>
      </div>
    `; 
  }).join('');
}

function populateFormSelects(){
  const fService = document.getElementById('f-service');
  if(fService){
    fService.innerHTML = SERVICES.map(rawService => { const s = localizedService(rawService); return `<option value="${s.id}">${s.name} — ${s.price}</option>`; }).join('');
  }

  const barberSelect = document.getElementById('f-barber');
  if(barberSelect){
    barberSelect.innerHTML = BARBERS.map(barber => `<option value="${barber.id}">${barber.names?.tr || barber.name}</option>`).join('');
    barberSelect.value = selectedBarberId && BARBERS.some(b => b.id === selectedBarberId) ? selectedBarberId : BARBERS[0].id;
    selectedBarberId = barberSelect.value;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  
  const fMonth = document.getElementById('f-month');
  if(fMonth){
    fMonth.innerHTML = MONTHS.map((m,i) => `<option value="${i+1}"${i + 1 === currentMonth ? ' selected' : ''}>${m}</option>`).join('');
  }

  const fYear = document.getElementById('f-year');
  if(fYear){
    fYear.innerHTML = [currentYear, currentYear + 1].map(y => `<option value="${y}"${y === currentYear ? ' selected' : ''}>${y}</option>`).join('');
  }

  const fTime = document.getElementById('f-time');
  if(fTime){
    fTime.innerHTML = TIME_SLOTS.map(t => `<option value="${t}">${t}</option>`).join('');
  }
}

function populateDays(){
  const monthSel = document.getElementById('f-month');
  const yearSel = document.getElementById('f-year');
  const daySel = document.getElementById('f-day');
  if(!monthSel || !yearSel || !daySel) return;

  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  const month = parseInt(monthSel.value || String(todayMonth), 10);
  const year = parseInt(yearSel.value || String(todayYear), 10);
  const count = daysInMonth(month, year);
  const oldValue = parseInt(daySel.value || '0', 10);

  const days = [];
  for(let d = 1; d <= count; d++){
    const isPastDay = year < todayYear || (year === todayYear && month < todayMonth) || (year === todayYear && month === todayMonth && d < todayDay);
    if(!isPastDay) days.push(`<option value="${d}">${d}</option>`);
  }
  daySel.innerHTML = days.join('');

  if(oldValue && Array.from(daySel.options).some(o => Number(o.value) === oldValue)){
    daySel.value = String(oldValue);
  }else if(daySel.options.length){
    daySel.selectedIndex = 0;
  }
  updateTimeSlots();
}

async function fetchAppointmentsForSlots(){
  existingAppointments = await fetchAllAppointments();
  updateTimeSlots();
}

function updateTimeSlots(){
  const daySel = document.getElementById('f-day');
  const monthSel = document.getElementById('f-month');
  const yearSel = document.getElementById('f-year');
  const timeSel = document.getElementById('f-time');
  const barberSel = document.getElementById('f-barber');
  if(!daySel || !daySel.value || !timeSel) return;

  const day = String(daySel.value).padStart(2,'0');
  const month = String(monthSel.value).padStart(2,'0');
  const year = String(yearSel.value);
  const selectedDateStr = `${year}-${month}-${day}`;
  const selectedBarber = barberSel ? barberSel.value : selectedBarberId;

  const bookedTimes = existingAppointments
    .filter(a => normalizeDate(a.date) === selectedDateStr && (!selectedBarber || a.barberId === selectedBarber || a.barber === selectedBarber))
    .map(a => normalizeTime(a.time))
    .filter(Boolean);

  const html = TIME_SLOTS.map(slot => {
    const slotTime = normalizeTime(slot);
    const [hour, minute] = slotTime.split(':').map(Number);
    const slotDate = new Date(Number(year), Number(month)-1, Number(day), hour, minute, 0, 0);
    const isPast = slotDate.getTime() < Date.now();
    const isBooked = bookedTimes.includes(slotTime);

    if(isBooked) return `<option value="${slot}" disabled style="color:#d15965;">${slot} (DOLU)</option>`;
    if(isPast)   return `<option value="${slot}" disabled style="color:#888;">${slot} (GEÇTİ)</option>`;
    return `<option value="${slot}">${slot}</option>`;
  }).join('');

  timeSel.innerHTML = html;
  const firstAvailable = Array.from(timeSel.options).find(o => !o.disabled);
  if(firstAvailable) timeSel.value = firstAvailable.value;
}

// Supabase Randevu Gönderme İşlemi
async function handleBookingSubmit(e){
  e.preventDefault();
  const msgBox = document.getElementById('form-msg');
  msgBox.innerHTML = '';

  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const serviceId = document.getElementById('f-service').value;
  const barberId = document.getElementById('f-barber')?.value || selectedBarberId || 'barber_1';
  const day = parseInt(document.getElementById('f-day').value, 10);
  const month = parseInt(document.getElementById('f-month').value, 10);
  const year = parseInt(document.getElementById('f-year').value, 10);
  const time = document.getElementById('f-time').value;

  if(!name || !phone){
    msgBox.innerHTML = '<div class="msg err">Lütfen ad soyad ve telefon bilgisi girin.</div>';
    return;
  }

  const normalizedPhone = phone.replace(/\D/g, '');
  const service = SERVICES.find(s => s.id === serviceId);
  const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const startTime = normalizeTime(time);

  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Kaydediliyor...';

  const appointment = {
    id: 'appt_' + Date.now() + '_' + Math.random().toString(36).slice(2,8),
    name, phone: normalizedPhone,
    serviceId, serviceName: service ? service.name : serviceId,
    barberId,
    barberName: BARBERS.find(item => item.id === barberId)?.names?.tr || BARBERS.find(item => item.id === barberId)?.name || 'Berber',
    date: dateStr,
    time: startTime,
    createdAt: new Date().toISOString()
  };

  try{
    if(isSupabaseConfigured()){
      await addAppointmentToSupabase(appointment);
    } else {
      throw new Error('Supabase ayarları konfigüre edilmemiş.');
    }

    const barberName = BARBERS.find(item => item.id === barberId)?.names?.tr || BARBERS.find(item => item.id === barberId)?.name || 'Berber';
    msgBox.innerHTML = `<div class="msg ok">Randevunuz alındı! ${day} ${MONTHS[month-1]} ${year}, saat ${startTime} — ${barberName} ile sizi bekliyoruz.</div>`;
    
    e.target.reset();
    populateFormSelects();
    populateDays();
    fetchAppointmentsForSlots();
  }catch(err){
    console.error('Booking error:', err);
    msgBox.innerHTML = `<div class="msg err">Randevu kaydedilemedi: ${escapeHtml(err.message)}</div>`;
  }finally{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Randevuyu Onayla';
  }
}

function setupScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));
}