// Mobile bottom navigation scroll behavior
let lastScrollTop = 0;
const mobileBottomNav = document.querySelector('.mobile-bottom-nav');

if (mobileBottomNav) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            mobileBottomNav.classList.add('hide');
            mobileBottomNav.classList.remove('show');
        } else {
            // Scrolling up
            mobileBottomNav.classList.remove('hide');
            mobileBottomNav.classList.add('show');
        }
        
        lastScrollTop = scrollTop;
    });
} 