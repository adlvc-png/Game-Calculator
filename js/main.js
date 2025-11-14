// Menü durumu
let menuVisible = true;

/**
 * Menüyü açar/kapatır
 */
function toggleMenu() {
    const mainLayout = $('#mainLayout');
    const toggleButton = $('.menu-toggle');
    
    menuVisible = !menuVisible;
    
    if (menuVisible) {
        mainLayout.classList.remove('menu-hidden');
        toggleButton.innerHTML = '☰';
    } else {
        mainLayout.classList.add('menu-hidden');
        toggleButton.innerHTML = '☰';
    }
    
    // Menü durumunu kaydet
    saveToStorage('menuState', menuVisible);
}

/**
 * Ana sayfayı gösterir
 */
function showMainPage() {
    toggleElement('welcome-message', true);
    $('.main-categories-grid').style.display = 'grid';
    
    // Tüm kategori ve hesaplayıcı görünümlerini gizle
    $$('.category-view, .calculator-section').forEach(element => {
        element.style.display = 'none';
    });
}

/**
 * Kategori gösterir
 * @param {string} categoryId - Kategori ID
 */
function showCategory(categoryId) {
    // Ana sayfayı gizle
    toggleElement('welcome-message', false);
    $('.main-categories-grid').style.display = 'none';
    
    // Sol menüde aktif butonu güncelle
    $$('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Tüm görünümleri gizle
    $$('.category-view, .calculator-section').forEach(view => {
        view.style.display = 'none';
    });
    
    // Seçilen kategoriyi göster
    toggleElement(`${categoryId}-view`, true);
}

/**
 * Hesaplayıcı gösterir
 * @param {string} type - Hesaplayıcı tipi
 */
function showCalculator(type) {
    // Diğer görünümleri gizle
    toggleElement('welcome-message', false);
    $('.main-categories-grid').style.display = 'none';
    $$('.category-view').forEach(view => {
        view.style.display = 'none';
    });
    $$('.calculator-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Seçilen hesaplayıcıyı göster
    toggleElement(`${type}-calc`, true);
    
    // Hesaplayıcıyı başlat
    if (type === 'donanim') {
        initializeSelectsDonanim();
    } else if (type === 'tilsim') {
        initializeSelectsTilsim();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    showMainPage();
    
    // ESC tuşu ile menüyü kapat
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuVisible) {
            toggleMenu();
        }
    });
    
    // Mobilde menü dışına tıklayınca menüyü kapat
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && menuVisible && 
            !event.target.closest('.side-menu') && 
            !event.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });
    
    // Kayıtlı menü durumunu yükle
    const savedMenuState = getFromStorage('menuState');
    if (savedMenuState === false) {
        toggleMenu();
    }
});