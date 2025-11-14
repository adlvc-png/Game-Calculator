// Dil çevirileri
const siteTranslations = {
    TR: {
        // GENEL
        siteTitle: "Yükseltme Hesaplayıcıları",
        menuTitle: "Hesaplayıcılar",
        welcomeTitle: "🏆 Yükseltme Hesaplayıcıları",
        welcomeDesc: "Hesaplayıcıları kullanarak yükseltme maliyetlerini hesaplayın",
        
        // SOL MENÜ
        chefEquipment: "Şef Ekipmanı Yükseltmeleri",
        otherCalculators: "Diğer Hesaplayıcılar",
        
        // ... Diğer çeviriler
    },
    EN: {
        // GENERAL
        siteTitle: "Upgrade Calculators",
        menuTitle: "Calculators", 
        welcomeTitle: "🏆 Upgrade Calculators",
        welcomeDesc: "Calculate upgrade costs using calculators",
        
        // ... Diğer çeviriler
    }
};

// Mevcut dil
let currentSiteLanguage = 'TR';

/**
 * Site dilini değiştirir
 * @param {string} lang - Yeni dil (TR/EN)
 */
function changeSiteLanguage(lang) {
    currentSiteLanguage = lang;
    
    // Dil butonlarını güncelle
    $$('.global-lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === lang) {
            btn.classList.add('active');
        }
    });
    
    // Tüm siteyi güncelle
    updateEntireSiteLanguage();
    
    // Hesaplayıcıları güncelle
    if (typeof changeLanguageDonanim === 'function') {
        changeLanguageDonanim(lang);
    }
    if (typeof changeLanguageTilsim === 'function') {
        changeLanguageTilsim(lang);
    }
    
    // Ayarları kaydet
    saveToStorage('userLanguage', lang);
}

/**
 * Tüm site dilini günceller
 */
function updateEntireSiteLanguage() {
    const t = siteTranslations[currentSiteLanguage];
    
    // Site başlığı
    document.title = t.siteTitle;
    
    // Ana elementleri güncelle
    $('#menuTitle').textContent = t.menuTitle;
    $('#welcomeTitle').textContent = t.welcomeTitle;
    $('#welcomeDesc').textContent = t.welcomeDesc;
    
    // ... Diğer element güncellemeleri
}

/**
 * Kart özelliklerini günceller
 * @param {object} t - Çeviri objesi
 */
function updateCardFeatures(t) {
    const card1Features = $('#card1Features');
    if (card1Features) {
        card1Features.innerHTML = `
            <li>${t.card1Feature1}</li>
            <li>${t.card1Feature2}</li>
            <li>${t.card1Feature3}</li>
            <li>${t.card1Feature4}</li>
        `;
    }
    
    // ... Diğer kartlar
}

// Sayfa yüklendiğinde dili yükle
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = getFromStorage('userLanguage') || 'TR';
    changeSiteLanguage(savedLanguage);
});