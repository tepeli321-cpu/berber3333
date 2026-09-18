// ============================================================
// theme.js — Açık/koyu tema geçiş butonu.
// index.html ve admin.html, sayfalarında #theme-toggle id'li
// bir buton bulundurmalı.
// ============================================================

(function(){
  function applyTheme(theme){
    if(theme === 'light'){
      document.documentElement.setAttribute('data-theme', 'light');
    }else{
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function getSavedTheme(){
    try{
      return localStorage.getItem('gb-theme');
    }catch(err){
      return null;
    }
  }

  function saveTheme(theme){
    try{
      localStorage.setItem('gb-theme', theme);
    }catch(err){ /* önemli değil, sadece tercih hatırlanmaz */ }
  }

  // Sayfa ilk yüklenirken: kayıtlı tercih varsa onu, yoksa
  // cihazın sistem temasını uygula.
  const saved = getSavedTheme();
  if(saved){
    applyTheme(saved);
  }else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
    applyTheme('light');
  }

  document.addEventListener('DOMContentLoaded', function(){
    const toggle = document.getElementById('theme-toggle');
    if(!toggle) return;

    toggle.innerHTML = `<span class="knob">${sunIconSVG ? sunIconSVG() : ''}</span>`;

    toggle.addEventListener('click', function(){
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next === 'dark' ? '' : 'light');
      saveTheme(next);
      updateKnobIcon(toggle);
    });

    updateKnobIcon(toggle);
  });

  function updateKnobIcon(toggle){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const knob = toggle.querySelector('.knob');
    if(knob && typeof sunIconSVG === 'function' && typeof moonIconSVG === 'function'){
      knob.innerHTML = isLight ? sunIconSVG() : moonIconSVG();
    }
  }
})();
