document.addEventListener('DOMContentLoaded', function () {
    
    // --- 1. Hamburger Menu ---
    const navbarnav = document.querySelector(".navbar-nav");
    document.querySelector("#hamburger-menu").onclick = (e) => {
        navbarnav.classList.toggle("active");
        e.preventDefault();
    };
    const hamburger = document.querySelector("#hamburger-menu");
    document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navbarnav.contains(e.target)) {
            navbarnav.classList.remove("active");
        }
    });

    // --- 2. Hitung Mundur 3 Jam ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        let timerDuration = 3 * 60 * 60;
        let storedEndTime = localStorage.getItem('promoEndTime');
        let endTime;

        if (storedEndTime && parseInt(storedEndTime) > Date.now()) {
            endTime = parseInt(storedEndTime);
        } else {
            endTime = Date.now() + timerDuration * 1000;
            localStorage.setItem('promoEndTime', endTime);
        }

        const countdownInterval = setInterval(() => {
            const distance = endTime - Date.now();
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "PROMO BERAKHIR";
                return;
            }
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // --- 3. Tombol Konsultasi WhatsApp ---
    const ctaButton = document.getElementById('cta-whatsapp');
    if (ctaButton) {
        const waNumber = "MDgxMjIwODY5NjAz";
        const waMessage = "Halo, saya ingin konsultasi gratis mengenai maklon skincare.";
        const encodedMessage = btoa(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`);
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(atob(encodedMessage), '_blank');
        });
    }

    // --- 4. Duplikasi Gambar Otomatis untuk Loop ---
    const imageRow = document.getElementById('fast-image-container');
    if (imageRow) {
        const originalImages = Array.from(imageRow.children);
        
       
        for (let i = 0; i < 3; i++) {
            originalImages.forEach(img => {
                imageRow.appendChild(img.cloneNode(true));
            });
        }
    }

    // --- 5. Fungsi Slider Generic ---
    function setupSlider(sliderId, autoSlideConfig) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const wrapper = slider.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;
        let slideInterval;

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            wrapper.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetInterval();
        });
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetInterval();
        });

        wrapper.querySelectorAll('.btn-promo').forEach(btn => {
            const encodedUrl = btn.getAttribute('data-wa-link');
            if(encodedUrl) {
                btn.setAttribute('href', atob(encodedUrl));
                btn.setAttribute('target', '_blank');
            }
        });

        function startInterval() {
            if (autoSlideConfig && autoSlideConfig.enabled) {
                slideInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, autoSlideConfig.interval);
            }
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();
    }

    // Inisialisasi Slider Paket Bisnis (Auto-slide aktif)
    setupSlider('layanan-slider', { enabled: true, interval: 5000 });

    // Inisialisasi Slider Sertifikasi (Auto-slide non-aktif)
    setupSlider('sertifikasi-slider', { enabled: false });


    // --- 6. Video Autoplay Saat Terlihat ---
    const video = document.getElementById('production-video');
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(error => console.log("Autoplay dicegah:", error));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(video);
    }
    
    // Panggil Feather Icons
    feather.replace();
});