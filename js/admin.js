// ============================================================
// admin.js — Supabase Entegrasyonlu Tam Kod
// ============================================================

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('admin-login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  document.getElementById('refresh-btn').addEventListener('click', loadAppointments);

  const barberFilter = document.getElementById('admin-barber-filter');
  if(barberFilter){
    barberFilter.innerHTML = '<option value="all">Tümü</option>' + BARBERS.map(barber => `<option value="${barber.id}">${barber.names?.tr || barber.name}</option>`).join('');
    barberFilter.addEventListener('change', loadAppointments);
  }

  const dateFilter = document.getElementById('admin-date-filter');
  if(dateFilter){
    dateFilter.addEventListener('change', loadAppointments);
  }

  window.addEventListener('gentlemens-barber-appointments-updated', () => {
    loadAppointments();
  });

  if(sessionStorage.getItem('adminTokenV2')){
    showPanel();
  }
});

async function handleLogin(e){
  e.preventDefault();
  const val = document.getElementById('admin-pass').value;
  const secureVal = String(val || '').trim();
  const msgBox = document.getElementById('admin-login-msg');

  // Şifrenizi buradan kontrol eder
  if(secureVal === '175886963'){
    sessionStorage.setItem('adminTokenV2', 'local-admin');
    showPanel();
  } else {
    msgBox.innerHTML = `<div class="msg err">Hatalı şifre.</div>`;
  }
}

function handleLogout(){
  sessionStorage.removeItem('adminTokenV2');
  document.getElementById('login-view').style.display = '';
  document.getElementById('panel-view').style.display = 'none';
  document.getElementById('admin-pass').value = '';
}

function showPanel(){
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('panel-view').style.display = '';
  loadAppointments();
}

function getFilteredAppointments(list){
  const barberFilter = document.getElementById('admin-barber-filter');
  const dateFilter = document.getElementById('admin-date-filter');
  const selectedBarber = barberFilter ? barberFilter.value : 'all';
  const selectedDate = dateFilter ? dateFilter.value : '';

  return list.filter(appt => {
    const barberMatch = selectedBarber === 'all' || (appt.barberId || appt.barber) === selectedBarber;
    const dateMatch = !selectedDate || normalizeDate(appt.date) === selectedDate;
    return barberMatch && dateMatch;
  });
}

function renderAdminSummary(list){
  const summaryEl = document.getElementById('admin-summary');
  if(!summaryEl) return;

  const total = list.length;
  const today = new Date().toISOString().slice(0,10);
  const todayCount = list.filter(appt => normalizeDate(appt.date) === today).length;

  summaryEl.innerHTML = `
    <div class="summary-card">
      <span>Toplam</span>
      <strong>${total}</strong>
    </div>
    <div class="summary-card">
      <span>Bugün</span>
      <strong>${todayCount}</strong>
    </div>
  `;
}

async function loadAppointments(){
  const listBox = document.getElementById('admin-list');
  listBox.innerHTML = '<div class="loading">Randevular yükleniyor...</div>';

  const token = sessionStorage.getItem('adminTokenV2');
  if(!token){ handleLogout(); return; }

  let list = await fetchAllAppointments();
  list.sort((a,b) => (normalizeDate(a.date) + normalizeTime(a.time)).localeCompare(normalizeDate(b.date) + normalizeTime(b.time)));

  // Özet kartlarını güncelle
  renderAdminSummary(list);

  const filteredList = getFilteredAppointments(list);

  if(filteredList.length === 0){
    listBox.innerHTML = '<div class="empty-state">Henüz randevu bulunamadı.</div>';
    return;
  }

  let html = '';
  let lastDate = null;

  for(const appt of filteredList){
    const normalizedDate = normalizeDate(appt.date);
    const dateParts = normalizedDate.split('-').map(Number);
    const appointmentLabel = `${dateParts[2]} ${MONTHS[dateParts[1] - 1]} ${dateParts[0]}`;
    const serviceName = appt.serviceName || 'Hizmet';
    let whatsappPhone = String(appt.phone || '').replace(/\D/g, '');
    if(whatsappPhone.startsWith('0')) whatsappPhone = '90' + whatsappPhone.slice(1);

    if(normalizedDate !== lastDate){
      html += `<div class="day-divider">${appointmentLabel.toUpperCase()}</div>`;
      lastDate = normalizedDate;
    }

    html += `
      <div class="appt-item">
        <div class="appt-date">${appointmentLabel}<br>${normalizeTime(appt.time)}</div>
        <div class="appt-details">
          <div class="name">${escapeHtml(appt.name)} · ${escapeHtml(appt.phone)}</div>
          <div class="meta">${escapeHtml(serviceName)} · ${escapeHtml(appt.barberName || 'Berber')}</div>
        </div>
        <a class="whatsapp-btn" href="https://wa.me/${escapeHtml(whatsappPhone)}" target="_blank" rel="noopener">WhatsApp</a>
        <button class="del-btn" data-id="${escapeHtml(appt.id)}">Sil</button>
      </div>
    `;
  }
  listBox.innerHTML = html;

  listBox.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteAppointment(btn.dataset.id));
  });
}

async function deleteAppointment(id){
  if(!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
  try{
    await supabaseRequest(`appointments?id=eq.${id}`, { method: 'DELETE' });
    await loadAppointments();
  }catch(err){
    alert('Randevu silinirken hata oluştu: ' + err.message);
  }
}