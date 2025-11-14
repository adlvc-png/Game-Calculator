// Genel yardımcı fonksiyonlar

/**
 * Sayıları binlik ayraçla formatlar
 * @param {number} num - Formatlanacak sayı
 * @returns {string} Formatlanmış sayı
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * DOM elementini seçer
 * @param {string} selector - CSS seçici
 * @returns {Element} DOM elementi
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Tüm DOM elementlerini seçer
 * @param {string} selector - CSS seçici
 * @returns {NodeList} DOM elementleri listesi
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Element göster/gizle
 * @param {string} elementId - Element ID
 * @param {boolean} show - Gösterilecek mi?
 */
function toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

/**
 * LocalStorage'dan veri okur
 * @param {string} key - Anahtar
 * @returns {any} Kayıtlı veri
 */
function getFromStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error('Storage okuma hatası:', error);
        return null;
    }
}

/**
 * LocalStorage'a veri yazar
 * @param {string} key - Anahtar
 * @param {any} data - Kaydedilecek veri
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Storage yazma hatası:', error);
    }
}

/**
 * Input değerini güvenli şekilde alır
 * @param {string} elementId - Input ID
 * @returns {number} Sayısal değer
 */
function getInputValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? parseInt(element.value) || 0 : 0;
}

/**
 * Debounce fonksiyonu - performans için
 * @param {Function} func - Çalıştırılacak fonksiyon
 * @param {number} wait - Bekleme süresi (ms)
 * @returns {Function} Debounce edilmiş fonksiyon
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}