// gallery-slideshow.js
document.addEventListener('DOMContentLoaded', function() {
    // Image paths for each category - these should match your actual directory structure
    const galleryImages = {
        rescue: [
            '/img/galleryTitles/aimon.jpg',
            '/img/aimonHilos/image1.jpg',
            '/img/aimonHilos/image2.jpg'
        ],
        purim: [
            '/img/galleryTitles/purim.jpg',
            '/img/purim/image1.jpg',
            '/img/purim/image2.jpg'
        ],
        random: [
            '/img/galleryTitles/sleep.jpg',
            '/img/pictures/image1.jpg',
            '/img/pictures/image2.jpg'
        ],
        evening: [
            '/img/erveMahlka/2b6a8486-fede-473c-9436-4aebb1790298.jpg',
            '/img/erveMahlka/image1.jpg',
            '/img/erveMahlka/image2.jpg'
        ],
        samalim: [
            '/img/samalim/2b3d3782-2bb6-4712-a130-5361bd1569cb.jpg',
            '/img/samalim/image1.jpg',
            '/img/samalim/image2.jpg'
        ]
    };

    // Initialize slideshows
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const category = container.dataset.category;
        const images = galleryImages[category];
        
        // Clear existing slides except the first one
        const existingSlides = container.querySelectorAll('.slide:not(:first-child)');
        existingSlides.forEach(slide => slide.remove());

        // Create image elements
        images.forEach((src, index) => {
            if (index === 0) return; // Skip first image as it's already in HTML
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${category} ${index + 1}`;
            img.className = 'slide';
            container.appendChild(img);
        });

        // Clear and recreate progress bars
        const progressBarsContainer = container.querySelector('.progress-bars');
        progressBarsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const bar = document.createElement('div');
            bar.className = index === 0 ? 'progress-bar active' : 'progress-bar';
            progressBarsContainer.appendChild(bar);
        });

        // Initialize slideshow state
        let currentSlide = 0;
        const slides = container.querySelectorAll('.slide');
        const progressBars = container.querySelectorAll('.progress-bar');

        // Function to show specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            progressBars.forEach(bar => bar.classList.remove('active'));
            
            slides[index].classList.add('active');
            progressBars[index].classList.add('active');
        }

        // Function to advance to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Start slideshow
        const intervalId = setInterval(nextSlide, 3000);

        // Cleanup on page leave
        window.addEventListener('beforeunload', () => {
            clearInterval(intervalId);
        });
    });
});