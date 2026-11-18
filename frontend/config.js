// config.js - Konstanta untuk menghubungkan Frontend ke Backend
const CONFIG = {
    // Ubah URL ini sesuai dengan port backend Express.js Anda (misal: 3000, 5000, dll)
    API_BASE_URL: "http://localhost:3000/api",
    
    // Atau jika sudah di-deploy ke server online:
    // API_BASE_URL: "https://api.namadomainanda.com/api"
};

// Ekspor agar bisa digunakan di file HTML/JS lain
export default CONFIG;