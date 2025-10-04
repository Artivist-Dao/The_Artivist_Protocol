// DOM Elements
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const buttons = document.querySelectorAll('.btn');
const sections = document.querySelectorAll('.section');

// Smooth Scroll Navigation
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Header Scroll Effect
function handleHeaderScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const scrollY = window.scrollY + header.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Button Click Handlers
function handleButtonClicks() {
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const href = this.getAttribute('href');
            
            // Add ripple effect
            createRippleEffect(this, e);
            
            // Handle demo access
            if (buttonText.includes('demo') || buttonText.includes('Demo')) {
                e.preventDefault();
                showDemoModal();
            }
            
            // Handle smooth scroll for anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Ripple Effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Demo Modal
function showDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Access Demo DApp</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-preview">
                        <div class="demo-screen">
                            <h4>The Artivist Protocol DApp</h4>
                            <p>Experience the future of crowdfunding for public goods</p>
                            <div class="demo-features">
                                <div class="demo-feature">
                                    <div class="feature-icon">🎨</div>
                                    <span>Create Art Campaigns</span>
                                </div>
                                <div class="demo-feature">
                                    <div class="feature-icon">🌐</div>
                                    <span>Web3 Integration</span>
                                </div>
                                <div class="demo-feature">
                                    <div class="feature-icon">💎</div>
                                    <span>NFT Rewards</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn--primary" onclick="launchDemo()">Launch Demo</button>
                        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            padding: var(--space-32);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-24);
            padding-bottom: var(--space-16);
            border-bottom: 1px solid var(--color-border);
        }
        
        .modal-header h3 {
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-semibold);
            color: var(--color-text);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: var(--space-8);
            border-radius: var(--radius-sm);
            transition: all 0.2s ease;
            line-height: 1;
        }
        
        .modal-close:hover {
            background: var(--color-secondary);
            color: var(--color-text);
        }
        
        .demo-preview {
            margin-bottom: var(--space-24);
        }
        
        .demo-screen {
            background: var(--color-bg-1);
            padding: var(--space-24);
            border-radius: var(--radius-base);
            border: 2px solid var(--color-primary);
            text-align: center;
        }
        
        .demo-screen h4 {
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-semibold);
            color: var(--color-text);
            margin-bottom: var(--space-12);
        }
        
        .demo-screen p {
            color: var(--color-text-secondary);
            margin-bottom: var(--space-20);
        }
        
        .demo-features {
            display: flex;
            flex-direction: column;
            gap: var(--space-12);
        }
        
        .demo-feature {
            display: flex;
            align-items: center;
            gap: var(--space-12);
            background: var(--color-surface);
            padding: var(--space-12);
            border-radius: var(--radius-sm);
        }
        
        .feature-icon {
            font-size: var(--font-size-xl);
        }
        
        .demo-feature span {
            font-weight: var(--font-weight-medium);
            color: var(--color-text);
        }
        
        .modal-actions {
            display: flex;
            gap: var(--space-12);
        }
        
        .modal-actions .btn {
            flex: 1;
        }
        
        @media (max-width: 480px) {
            .modal-content {
                margin: var(--space-16);
                width: calc(100% - var(--space-32));
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    });
    
    // Close handlers
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.modal-overlay').onclick = closeModal;
    
    // Global functions for modal
    window.closeModal = closeModal;
    window.launchDemo = launchDemo;
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(styleSheet);
            delete window.closeModal;
            delete window.launchDemo;
        }, 300);
    }
    
    function launchDemo() {
        console.log('Launching Artivist Protocol Demo DApp...');
        
        // Simulate demo launch
        const demoUrl = 'https://demo.artivistprotocol.com';
        
        // Show loading state
        const launchBtn = modal.querySelector('.btn--primary');
        const originalText = launchBtn.textContent;
        launchBtn.textContent = 'Launching...';
        launchBtn.disabled = true;
        
        setTimeout(() => {
            // In a real implementation, this would open the actual demo
            alert('Demo DApp would open in a new window!\n\nDemo URL: ' + demoUrl);
            closeModal();
        }, 1500);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('growth__stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(
        '.problem-card, .feature, .stat, .differential, .roadmap__year, .quarter, .team-card, .value'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(element);
    });
}

// Animate Numbers
function animateCounters() {
    const numbers = document.querySelectorAll('.stat__number');
    
    numbers.forEach(numberElement => {
        const finalValue = numberElement.textContent;
        const hasPercent = finalValue.includes('%');
        const hasUSD = finalValue.includes('USD');
        const hasK = finalValue.includes('K');
        const hasBN = finalValue.includes('BN');
        
        let numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = current.toFixed(1);
            
            if (hasPercent) {
                displayValue += '%';
            } else if (hasUSD && hasBN) {
                displayValue = 'USD ' + displayValue + ' BN';
            } else if (hasUSD && hasK) {
                displayValue = displayValue + 'K USD';
            } else if (hasK) {
                displayValue = displayValue + 'K';
            }
            
            numberElement.textContent = displayValue;
        }, stepTime);
    });
}

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav__link.active {
            color: var(--color-primary);
            font-weight: var(--font-weight-semibold);
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Handle External Links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modal
        if (e.key === 'Escape' && window.closeModal) {
            window.closeModal();
        }
        
        // Enter key to trigger focused button
        if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
            document.activeElement.click();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 The Artivist Protocol - Initializing...');
    
    // Initialize all functionality
    initSmoothScroll();
    handleButtonClicks();
    initScrollAnimations();
    addRippleStyles();
    handleExternalLinks();
    initKeyboardNavigation();
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        updateActiveNavLink();
    });
    
    // Initial header state
    handleHeaderScroll();
    
    console.log('✅ The Artivist Protocol - Ready!');
});

// Handle page load
window.addEventListener('load', function() {
    // Fade in hero content
    const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .btn');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Set initial styles for hero elements
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
});

// Console welcome message
console.log(`
🎨 The Artivist Protocol
================================
Welcome to the future of Web3 crowdfunding!

🔗 Connect with us:
• Email: artivist.dapp@gmail.com
• Twitter: @artivist_dapp
• Discord: https://discord.gg/XCspNdPR9h
• GitHub: https://github.com/Artivist-Dao

💡 Ready to make an impact?
   Click "Access the demo DApp" to get started!
`);