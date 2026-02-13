/**
 * Deutsche Bank - Mobile Menu Functionality
 * Handles responsive navigation for mobile devices
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initResponsiveTables();
        initTouchOptimizations();
    });

    /**
     * Initialize mobile hamburger menu
     */
    function initMobileMenu() {
        // Create mobile menu button if it doesn't exist
        const nav = document.querySelector('nav');
        if (!nav) return;

        // Check if mobile menu button already exists
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenuBtn) {
            // Create mobile menu button
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.setAttribute('aria-label', 'Menu öffnen');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            
            // Insert at the beginning of nav
            const navContainer = nav.querySelector('.max-w-7xl');
            if (navContainer) {
                navContainer.insertBefore(mobileMenuBtn, navContainer.firstChild);
            }
        }

        // Get navigation links container
        const navLinks = nav.querySelector('.flex.justify-center');
        
        if (navLinks && window.innerWidth <= 768) {
            navLinks.classList.add('mobile-nav-links');
        }

        // Toggle menu on click
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isOpen = this.classList.contains('active');
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            if (navLinks) {
                if (isOpen) {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.backgroundColor = '#00008B';
                    navLinks.style.padding = '1rem';
                    navLinks.style.zIndex = '40';
                    navLinks.style.borderTop = '1px solid rgba(255,255,255,0.1)';
                } else {
                    navLinks.style.display = '';
                    navLinks.style.position = '';
                    navLinks.style.flexDirection = '';
                    navLinks.style.top = '';
                    navLinks.style.left = '';
                    navLinks.style.right = '';
                    navLinks.style.backgroundColor = '';
                    navLinks.style.padding = '';
                    navLinks.style.zIndex = '';
                    navLinks.style.borderTop = '';
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks?.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                if (navLinks) {
                    navLinks.style.display = '';
                    navLinks.style.position = '';
                    navLinks.style.flexDirection = '';
                }
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    if (navLinks) {
                        navLinks.style.display = '';
                        navLinks.style.position = '';
                        navLinks.style.flexDirection = '';
                    }
                }
            }, 250);
        });
    }

    /**
     * Initialize responsive tables
     */
    function initResponsiveTables() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(function(table) {
            // Skip if already wrapped
            if (table.parentElement.classList.contains('table-responsive')) return;
            
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            
            // Wrap table
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    /**
     * Initialize touch optimizations
     */
    function initTouchOptimizations() {
        // Add touch class to body
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }

        // Prevent double-tap zoom on buttons
        const buttons = document.querySelectorAll('button, .btn, input[type="submit"]');
        buttons.forEach(function(btn) {
            btn.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            }, { passive: true });
        });

        // Improve scroll performance
        const scrollElements = document.querySelectorAll('.overflow-x-auto, .overflow-y-auto');
        scrollElements.forEach(function(el) {
            el.style.webkitOverflowScrolling = 'touch';
        });
    }

    /**
     * Handle orientation change
     */
    window.addEventListener('orientationchange', function() {
        // Small delay to allow orientation change to complete
        setTimeout(function() {
            // Reset any fixed elements that might be affected
            const fixedElements = document.querySelectorAll('.fixed, .sticky');
            fixedElements.forEach(function(el) {
                el.style.height = 'auto';
            });
        }, 100);
    });

})();
