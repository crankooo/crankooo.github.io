// Show detailed project modal
function showDetailModal(type, title) {
    const details = getProjectDetails(type, title);
    
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(20px);
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 40px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        backdrop-filter: blur(30px);
        transform: scale(0.9) translateY(30px);
        transition: all 0.4s ease;
    `;
    
    modalContent.innerHTML = details;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(50px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 400);
    };
    
    // Find and attach close button after modal is rendered
    setTimeout(() => {
        const closeBtn = modal.querySelector('#closeDetailModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }, 50);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initBackgroundEffects();
    initMorphingBackground();
    initScrollFunctionality();
    
    // Start entrance animation
    setTimeout(() => {
        startEntranceAnimation();
    }, 500);
    
    // Initialize interactions
    initNameInteraction();
    initProjectFiltering();
    initDetailedProjects();
    initWrittenWorks();
});

// Background effects - Always rotating text
function initBackgroundEffects() {
    const bgText = document.getElementById('bgText');
    const texts = ['CREATIVE', 'DESIGNER', 'VISUAL', 'DIGITAL', 'MEDIA', 'INNOVATE', 'ARTISTIC', 'MODERN'];
    let currentIndex = 0;
    
    // Rotate background text continuously
    function rotateText() {
        bgText.style.opacity = '0';
        bgText.style.transform = 'translate(-50%, -50%) scale(0.9) rotateY(-90deg)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            bgText.textContent = texts[currentIndex];
            bgText.style.opacity = '1';
            bgText.style.transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
        }, 500);
    }
    
    // Start rotation immediately
    setInterval(rotateText, 2500);
}

// Morphing SVG background
function initMorphingBackground() {
    const morphPath = document.getElementById('morphPath');
    
    const shapes = [
        "M200,100 C300,50 700,50 800,100 L900,400 C850,500 650,600 500,550 C350,600 150,500 100,400 Z",
        "M100,200 C200,100 500,150 600,200 L800,500 C750,700 550,650 400,600 C250,650 50,700 100,500 Z",
        "M300,150 C450,80 650,120 750,200 L850,450 C800,580 600,620 450,580 C300,620 100,580 150,450 Z",
        "M150,250 C350,180 550,220 700,300 L750,550 C700,650 500,680 350,650 C200,680 50,650 100,550 Z",
        "M250,120 C400,70 600,90 750,160 L880,420 C830,550 630,590 480,560 C330,590 120,550 170,420 Z"
    ];
    
    let currentShape = 0;
    
    function morphShape() {
        currentShape = (currentShape + 1) % shapes.length;
        morphPath.setAttribute('d', shapes[currentShape]);
    }
    
    // Start morphing
    setInterval(morphShape, 4000);
}

// Scroll functionality
function initScrollFunctionality() {
    const scrollHint = document.getElementById('scrollHint');
    const backToTop = document.getElementById('backToTop');
    const workSection = document.getElementById('work');
    const heroSection = document.getElementById('home');
    
    // Scroll to work section when clicking "Scroll to Explore"
    scrollHint.addEventListener('click', () => {
        workSection.scrollIntoView({ 
            behavior: 'smooth'
        });
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', () => {
        heroSection.scrollIntoView({ 
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Top navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            const href = item.getAttribute('href');
            if (href === '#home') {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            } else if (href.includes('work')) {
                workSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Enhanced entrance animation
function startEntranceAnimation() {
    const container = document.querySelector('.hero-section');
    const chars = document.querySelectorAll('.char');
    const words = document.querySelectorAll('.word');
    const profileSection = document.querySelector('.profile-section');
    
    // Add loaded class to trigger staggered animation
    container.classList.add('loaded');
    
    // Animate profile image first
    setTimeout(() => {
        profileSection.classList.add('animate');
    }, 200);
    
    // Animate name characters
    setTimeout(() => {
        chars.forEach((char) => {
            char.classList.add('animate');
        });
    }, 600);
    
    // Animate subtitle
    setTimeout(() => {
        words.forEach(word => {
            word.classList.add('animate');
        });
    }, 1400);
}

// Interactive name letters
function initNameInteraction() {
    const chars = document.querySelectorAll('.char');
    
    chars.forEach((char, index) => {
        char.addEventListener('mouseenter', () => {
            char.classList.add('hover-effect');
            
            // Ripple effect to nearby letters
            const adjacentChars = [chars[index - 1], chars[index + 1]].filter(Boolean);
            adjacentChars.forEach(adjacentChar => {
                setTimeout(() => {
                    adjacentChar.style.transform = 'translateY(-5px) scale(1.05)';
                }, 100);
                
                setTimeout(() => {
                    adjacentChar.style.transform = '';
                }, 400);
            });
        });
        
        char.addEventListener('mouseleave', () => {
            char.classList.remove('hover-effect');
        });
    });
}

// Enhanced modal system
function showModal(type, title, content) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(20px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 50px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        text-align: center;
        backdrop-filter: blur(30px);
        transform: scale(0.8) translateY(50px);
        transition: all 0.4s ease;
    `;
    
    const typeIcon = getTypeIcon(type);
    
    modalContent.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">${typeIcon}</div>
        <h3 style="color: white; margin-bottom: 25px; font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem;">${title}</h3>
        <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 40px; line-height: 1.6; font-size: 1rem;">
            ${content}
        </p>
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button id="closeModal" style="
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
                font-weight: 500;
            ">Close</button>
            <button id="learnMore" style="
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: rgba(255, 255, 255, 0.8);
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
            ">Learn More</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    // Button hover effects
    const closeBtn = modal.querySelector('#closeModal');
    const learnBtn = modal.querySelector('#learnMore');
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.25)';
        closeBtn.style.transform = 'translateY(-2px)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        closeBtn.style.transform = '';
    });
    
    learnBtn.addEventListener('mouseenter', () => {
        learnBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        learnBtn.style.color = '#fff';
        learnBtn.style.transform = 'translateY(-2px)';
    });
    
    learnBtn.addEventListener('mouseleave', () => {
        learnBtn.style.background = 'transparent';
        learnBtn.style.color = 'rgba(255, 255, 255, 0.8)';
        learnBtn.style.transform = '';
    });
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(50px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 400);
    };
    
    closeBtn.addEventListener('click', closeModal);
    learnBtn.addEventListener('click', () => {
        alert('More detailed information would be available here!');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}



// Helper functions
function getTypeIcon(type) {
    const icons = {
        'video': '🎬',
        'audio': '🎙️',
        'article': '✍️',
        'website': '💻',
        'tracker': '🚇',
        'unitea': '🍵',
        'spacerace': '🏢',
        'written-article': '📄',
        'written-thesis': '🎓'
    };
    return icons[type] || '📄';
}

function getProjectDetails(type, title) {
    const details = {
        'video': {
            'Documentary Series': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎬</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Documentary Series - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>This documentary series explores the intersection of traditional storytelling and modern digital media, showcasing how interactive elements can enhance narrative experiences.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Features</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Interactive timeline integration</li>
                            <li>Multi-perspective narrative structure</li>
                            <li>Real-time audience engagement tools</li>
                            <li>Cross-platform distribution strategy</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <p>Produced using industry-standard equipment and post-production workflows, with custom interactive elements developed for web and mobile platforms.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Results</h3>
                        <p>The series achieved significant engagement metrics and positive critical reception, demonstrating the effectiveness of interactive storytelling approaches.</p>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'audio': {
            'Interview Series': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎙️</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Interview Series - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>An in-depth interview series featuring conversations with leading creative professionals, exploring their methodologies, challenges, and insights in the digital media landscape.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Featured Guests</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Digital media pioneers and innovators</li>
                            <li>Award-winning filmmakers and storytellers</li>
                            <li>Technology leaders in creative industries</li>
                            <li>Emerging artists pushing boundaries</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Quality</h3>
                        <p>Professional-grade audio recording with post-production enhancement, ensuring crystal-clear sound quality and engaging listening experience.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Distribution</h3>
                        <p>Available across major podcast platforms with enhanced show notes, transcripts, and supplementary resources for deeper engagement.</p>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'article': {
            'Featured Articles': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">✍️</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Featured Articles - Portfolio</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Published Works</h3>
                        <p>A collection of thought leadership articles exploring the evolving landscape of interactive media, digital storytelling, and creative technology.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Topics</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>The future of interactive storytelling</li>
                            <li>Emerging trends in digital media</li>
                            <li>Technology's impact on creative processes</li>
                            <li>User experience in narrative design</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Publications</h3>
                        <p>Featured in leading industry magazines, digital platforms, and creative technology journals, reaching audiences of creative professionals and technology enthusiasts.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Research & Analysis</h3>
                        <p>Each article combines thorough research with practical insights, offering actionable perspectives on industry developments and creative methodologies.</p>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'website': {
            'BHA Digital Equity Website': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">💻</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">BHA Digital Equity - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Brief</h3>
                        <p>Designed and developed a comprehensive educational website for the Boston Housing Authority's Digital Equity Program, focusing on accessibility and user-centered design.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Features</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Fully responsive design across all devices</li>
                            <li>Accessibility-first approach (WCAG compliant)</li>
                            <li>Intuitive navigation and clear information hierarchy</li>
                            <li>Interactive elements for enhanced user engagement</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Implementation</h3>
                        <p>Built with semantic HTML5 and modern CSS3, ensuring optimal performance, SEO optimization, and cross-browser compatibility. Clean, maintainable code structure for easy updates.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact</h3>
                        <p>Successfully delivers digital literacy resources to Boston Housing Authority residents, promoting digital equity and inclusion through thoughtful design and accessible technology.</p>
                        
                        <div style="margin: 25px 0;">
                            <a href="https://crankooo.github.io/bha-digital-equity/" target="_blank" style="
                                display: inline-block;
                                background: rgba(54, 162, 235, 0.2);
                                border: 1px solid rgba(54, 162, 235, 0.5);
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                text-decoration: none;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-right: 15px;
                                transition: all 0.3s ease;
                            ">Visit Live Site</a>
                        </div>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'tracker': {
            'MBTA Subway Tracker': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🚇</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">MBTA Subway Tracker - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>Developed a comprehensive real-time subway tracking tool that visualizes live train locations across Boston's MBTA system, highlighting transit patterns, system delays, and peak travel times.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Stack</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>JavaScript for dynamic functionality and API integration</li>
                            <li>MBTA API for real-time transit data</li>
                            <li>Leaflet.js for interactive mapping</li>
                            <li>D3.js for advanced data visualization</li>
                            <li>HTML5 & CSS3 for responsive design</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Features</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Real-time train position tracking</li>
                            <li>Interactive route visualization</li>
                            <li>Delay and disruption alerts</li>
                            <li>Peak travel time analysis</li>
                            <li>Mobile-responsive interface</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Usage</h3>
                        <p>Provides Boston commuters and transit enthusiasts with valuable insights into subway operations, helping users make informed travel decisions and understand transit patterns across the city.</p>
                        
                        <div style="margin: 25px 0;">
                            <a href="https://crankooo.github.io/MBTA-Train-Tracker/" target="_blank" style="
                                display: inline-block;
                                background: rgba(255, 193, 7, 0.2);
                                border: 1px solid rgba(255, 193, 7, 0.5);
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                text-decoration: none;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-right: 15px;
                                transition: all 0.3s ease;
                            ">View Live Tracker</a>
                        </div>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'unitea': {
            'A Cup of UniTea': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🍵</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">A Cup of UniTea - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Vision</h3>
                        <p>The main goal of this project was to showcase tea's significance beyond just a beverage. I wanted to dive into its cultural, economic, environmental, and social impact, while also using interactive elements to make the learning experience more engaging and fun.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Interactive Experience</h3>
                        <p>Through this site, I aim to not only inform but also inspire people to appreciate the layers of meaning behind that simple cup of chai. The project combines storytelling with data visualization to create an immersive educational journey.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Components</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Cultural exploration of tea traditions worldwide</li>
                            <li>Economic impact analysis and data visualization</li>
                            <li>Environmental sustainability insights</li>
                            <li>Social connections and community aspects</li>
                            <li>Interactive multimedia elements</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Skills & Technologies</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Data Visualization techniques</li>
                            <li>Video Production and editing</li>
                            <li>Wix website development</li>
                            <li>Interactive design principles</li>
                            <li>Content strategy and storytelling</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact</h3>
                        <p>This project demonstrates the power of combining traditional research with modern digital storytelling to create meaningful, educational experiences that resonate with diverse audiences.</p>
                        
                        <div style="margin: 25px 0;">
                            <a href="https://namiraaharis.wixsite.com/acupofunitea" target="_blank" style="
                                display: inline-block;
                                background: rgba(139, 69, 19, 0.3);
                                border: 1px solid rgba(139, 69, 19, 0.6);
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                text-decoration: none;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-right: 15px;
                                transition: all 0.3s ease;
                            ">Explore UniTea Project</a>
                        </div>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'spacerace': {
            'SpaceRace': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🏢</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">SpaceRace - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>SpaceRace explores how Northeastern University students navigate the challenge of limited campus spaces in an ever-evolving urban environment. This documentary project examines the real impact of space constraints on student life and community building.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Research Focus</h3>
                        <p>From displaced clubs to overcrowded study areas, SpaceRace dives into the stories, data, and voices that shape how students connect, create, and thrive in an urban city campus. The project combines qualitative and quantitative research methods.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Methodology</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>In-depth student interviews and testimonials</li>
                            <li>Data collection on space utilization patterns</li>
                            <li>Video documentation of campus environments</li>
                            <li>Analysis of urban campus challenges</li>
                            <li>Community impact assessment</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Skills</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Documentary filmmaking and storytelling</li>
                            <li>Interview conducting and audio recording</li>
                            <li>Video editing and post-production</li>
                            <li>Data visualization and analysis</li>
                            <li>Web development and content organization</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Insights</h3>
                        <p>This project sheds light on the often-overlooked challenges of urban campus life, providing valuable insights for university planning and student experience improvement initiatives.</p>
                        
                        <div style="margin: 25px 0;">
                            <a href="https://namiraaharis.wixsite.com/spacerunner" target="_blank" style="
                                display: inline-block;
                                background: rgba(70, 130, 180, 0.2);
                                border: 1px solid rgba(70, 130, 180, 0.5);
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                text-decoration: none;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-right: 15px;
                                transition: all 0.3s ease;
                            ">Explore SpaceRace Project</a>
                        </div>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'firstname': {
            'First Names, Lasting Impressions': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🧠</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">First Names, Lasting Impressions - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">🔍 The Challenge</h3>
                        <p>How do we help people reflect on their biases without making them feel accused or defensive? Unconscious name-based bias affects hiring, perception, and social judgment—but many people don't realize they hold these assumptions. I wanted to create a <strong>more engaging, gamified alternative</strong> that encourages users to uncover their own biases in a reflective and interactive way.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">💡 The Concept</h3>
                        <p>I designed a <strong>web-based interactive quiz</strong> where users are introduced to a name and asked to guess that person's profession from a list of options. After each guess, the site provides <strong>instant feedback</strong>, revealing the correct answer along with a <strong>brief fact or story</strong> that challenges common stereotypes. This creates a series of subtle "aha" moments, making bias visible without being accusatory.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">🛠️ The Process</h3>
                        
                        <h4 style="color: white; margin: 20px 0 10px 0;">1. Research & Interviews</h4>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Studied academic research on name bias, including studies on resume discrimination and racial name profiling</li>
                            <li>Interviewed people with "non-Western" names to understand real-life experiences</li>
                            <li>Analyzed how media platforms and DEI tools typically approach implicit bias</li>
                        </ul>
                        
                        <h4 style="color: white; margin: 20px 0 10px 0;">2. Story & Structure Design</h4>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Sketched a scroll-based multi-page format with animated transitions</li>
                            <li>Added a <strong>carousel-like effect</strong> for quiz slides</li>
                            <li>Developed a structure that mixes interaction with storytelling and data</li>
                        </ul>
                        
                        <h4 style="color: white; margin: 20px 0 10px 0;">3. Development & Interactivity</h4>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Coded the site using <strong>HTML, CSS, and JavaScript</strong></li>
                            <li>Implemented feedback logic that responds to user selections</li>
                            <li>Added <strong>animated name bubbles</strong>, <strong>silhouettes</strong>, and <strong>scroll-triggered fades</strong></li>
                            <li>Ensured mobile compatibility and accessibility</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">🧰 Tools Used</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>HTML / CSS / JavaScript</strong> – Interactive site development</li>
                            <li><strong>Figma / Adobe XD</strong> – Prototyping and wireframing</li>
                            <li><strong>Google Sheets</strong> – Tracking user feedback</li>
                            <li><strong>Audacity</strong> – Audio processing for ambient sounds</li>
                            <li><strong>The Boston Globe brand kit</strong> – Fonts and colors for publication-readiness</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">🎯 The Outcome</h3>
                        <p>The final product is a <strong>playable, data-informed story</strong> that has been submitted for possible publication by <em>The Emancipator</em> and praised by professors and testers for its clarity, interactivity, and tone. Users reported learning about their own implicit assumptions in a <strong>non-judgmental way</strong>, proving that <strong>interactivity can make difficult topics more approachable</strong>.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">🏁 What I Learned</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Designing for bias requires empathy</strong>—you can't shame people into reflection, you must guide them there</li>
                            <li><strong>Gamification can drive engagement</strong> even for serious topics</li>
                            <li><strong>Small design details</strong> (like button layout or scroll feel) drastically affect user experience</li>
                            <li><strong>Code and storytelling must work hand in hand</strong> for maximum emotional impact</li>
                        </ul>
                        
                        <div style="margin: 25px 0;">
                            <a href="https://crankooo.github.io/First-names-Lasting-Impressions/" target="_blank" style="
                                display: inline-block;
                                background: rgba(147, 51, 234, 0.2);
                                border: 1px solid rgba(147, 51, 234, 0.5);
                                color: white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                text-decoration: none;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                margin-right: 15px;
                                transition: all 0.3s ease;
                            ">Take the Interactive Quiz</a>
                        </div>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'dance-team': {
            'Northeastern University Dance Team': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">💃</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Northeastern University Dance Team - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>Created a dynamic promotional video showcasing the talent, dedication, and vibrant energy of Northeastern University's Dance Team. This project captures the essence of collegiate dance culture, highlighting both the artistic expression and athletic prowess of the performers through cinematic storytelling.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Creative Vision</h3>
                        <p>The video aims to convey the passion and commitment of student dancers who balance rigorous academics with their love for dance. Through carefully choreographed sequences and intimate behind-the-scenes moments, the piece celebrates the team's diversity, unity, and artistic excellence.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Highlights</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Dynamic multi-camera coverage of live performances</li>
                            <li>Slow-motion sequences capturing intricate choreography</li>
                            <li>Behind-the-scenes footage showing rehearsal dedication</li>
                            <li>Interviews with team members about their dance journey</li>
                            <li>High-energy montage sequences with beat-synced editing</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Execution</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Adobe Premiere Pro</strong> - Advanced video editing and color grading</li>
                            <li><strong>After Effects</strong> - Motion graphics, title sequences, and visual effects</li>
                            <li><strong>Professional Audio</strong> - Multi-track mixing and sound design</li>
                            <li><strong>Cinematography</strong> - Multiple camera angles and creative shot composition</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Post-Production Process</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Color correction to enhance performance lighting</li>
                            <li>Rhythm-based editing to match choreography</li>
                            <li>Dynamic transitions between dance styles</li>
                            <li>Motion tracking for text and graphic elements</li>
                            <li>Audio mastering for optimal impact</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Purpose</h3>
                        <p>This promotional video serves multiple purposes: recruiting new dancers, showcasing the team at university events, and preserving the legacy of the 2024 dance season. It demonstrates the power of visual storytelling in capturing the spirit of student organizations and campus culture.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Duration:</strong> 3:17</li>
                            <li><strong>Software:</strong> Adobe Premiere Pro, After Effects, Audition</li>
                            <li><strong>Format:</strong> Promotional/Documentary</li>
                            <li><strong>Year:</strong> 2024</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'elections': {
            'Amidst the US Presidential Elections 2024': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🗳️</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Amidst the US Presidential Elections 2024 - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>During the heated 2024 presidential election season, I conducted a series of man-on-the-street interviews exploring college students' perspectives on abortion rights and healthcare policy. This documentary captures the raw, unfiltered voices of young voters grappling with issues that directly impact their lives and futures.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Interview Approach</h3>
                        <p>The project focused on creating a safe space for students to express their views on sensitive political topics. By conducting interviews across campus, I captured diverse perspectives from students of different backgrounds, political affiliations, and personal experiences with healthcare access.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Process</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Pre-production research on key election issues affecting young voters</li>
                            <li>Developed thoughtful, non-partisan interview questions</li>
                            <li>Conducted on-location interviews with proper audio equipment</li>
                            <li>Captured B-roll of campus life and election-related imagery</li>
                            <li>Edited for balanced representation of diverse viewpoints</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Execution</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Adobe Premiere Pro</strong> - Multi-camera editing and color correction</li>
                            <li><strong>Adobe Audition</strong> - Audio enhancement and noise reduction</li>
                            <li><strong>Interview Techniques</strong> - Creating comfortable environments for authentic responses</li>
                            <li><strong>Ethical Journalism</strong> - Ensuring balanced, fair representation</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Themes Explored</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Student perspectives on reproductive rights</li>
                            <li>Healthcare accessibility for young adults</li>
                            <li>First-time voter experiences and concerns</li>
                            <li>Impact of policy on student life</li>
                            <li>Civic engagement among college students</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Reception</h3>
                        <p>This documentary served as a platform for young voices during a critical election period. It highlighted the importance of student perspectives in national conversations about healthcare and reproductive rights, demonstrating how political decisions directly affect the next generation.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Duration:</strong> 4:50</li>
                            <li><strong>Software:</strong> Adobe Premiere Pro, Adobe Audition</li>
                            <li><strong>Format:</strong> Documentary/Street Interviews</li>
                            <li><strong>Year:</strong> 2024</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'dogparade': {
            'Howl-o-ween Dog Parade': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎃</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Howl-o-ween Dog Parade - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>Covered South Boston's beloved annual Howl-o-ween dog parade, capturing the festive Halloween spirit through the lens of community journalism. This feature story showcases the vibrant local culture and the special bond between Bostonians and their costumed canine companions.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Coverage Strategy</h3>
                        <p>Approached this event as a heartwarming community story, focusing on the human-animal connections and neighborhood traditions that make this Halloween celebration unique. The goal was to create an engaging piece that captures both the fun atmosphere and the deeper community bonds.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Approach</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Pre-event planning and location scouting</li>
                            <li>Dynamic handheld filming to capture parade energy</li>
                            <li>Conducted spontaneous interviews with participants</li>
                            <li>Captured diverse costume creativity and crowd reactions</li>
                            <li>Focused on storytelling through visual moments</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Interview Highlights</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Pet owners discussing costume choices and preparation</li>
                            <li>First-time parade participants sharing excitement</li>
                            <li>Local organizers on community tradition</li>
                            <li>Spectators enjoying the festive atmosphere</li>
                            <li>Children's reactions to creative costumes</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Production</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Camera Work</strong> - Mobile shooting for crowd navigation</li>
                            <li><strong>Adobe Premiere Pro</strong> - Fast-paced editing to match event energy</li>
                            <li><strong>Audio Production</strong> - Balanced parade ambience with clear interviews</li>
                            <li><strong>Color Grading</strong> - Enhanced autumn colors and costume vibrancy</li>
                            <li><strong>Music Selection</strong> - Upbeat soundtrack matching festive mood</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Storytelling Elements</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Opening with parade atmosphere establishment</li>
                            <li>Character-driven narratives through pet-owner pairs</li>
                            <li>Costume showcase montages</li>
                            <li>Community voice integration</li>
                            <li>Closing with tradition's impact on neighborhood</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Outcome</h3>
                        <p>Successfully created an engaging feature that celebrates local culture while demonstrating skills in event coverage, community journalism, and feel-good storytelling. The piece showcases ability to find compelling narratives in everyday community events.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Duration:</strong> 3:27</li>
                            <li><strong>Software:</strong> Adobe Premiere Pro, Adobe Audition</li>
                            <li><strong>Format:</strong> Event Coverage/Feature Story</li>
                            <li><strong>Year:</strong> 2024</li>
                            <li><strong>Location:</strong> South Boston, MA</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'audio-interview': {
            'JP Centre/South Main Streets: Interview with Ginger Brown': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎙️</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">JP Centre/South Main Streets Interview - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>Conducted an in-depth interview with Ginger Brown, Executive Director of JP Centre/South Main Streets, exploring the organization's crucial role in revitalizing Jamaica Plain's business district. This documentary-style interview was featured in The Scope Boston's Q&A Changemakers series.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">About JP Centre/South Main Streets</h3>
                        <p>JP Centre/South Main Streets is a volunteer-driven nonprofit organization dedicated to revitalizing the Jamaica Plain business district. As part of the National Main Street Program, they work to preserve historic commercial architecture while fostering economic development that serves the diverse JP community.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Interview Focus Areas</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>The Main Streets model for urban neighborhood revitalization</li>
                            <li>Supporting small, locally-owned businesses</li>
                            <li>Community engagement and volunteer mobilization</li>
                            <li>Balancing development with neighborhood character preservation</li>
                            <li>Economic initiatives and business technical assistance programs</li>
                            <li>Creating an inclusive business environment for diverse entrepreneurs</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Process</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Pre-interview research on Main Streets programs and JP business landscape</li>
                            <li>On-location recording at the JP Centre Street office</li>
                            <li>Professional audio setup for clear, broadcast-quality sound</li>
                            <li>Conversational interview style to capture authentic insights</li>
                            <li>Post-production editing for clarity and flow</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Production Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Adobe Audition</strong> - Primary audio editing and mastering</li>
                            <li><strong>Audacity</strong> - Initial recording and basic processing</li>
                            <li><strong>Otter.ai</strong> - Automated transcription for accessibility</li>
                            <li><strong>Field Recording Equipment</strong> - Professional microphone setup</li>
                            <li><strong>Noise Reduction</strong> - Ensuring clean audio in office environment</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Insights from the Interview</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>The four-point approach: Organization, Promotion, Design, and Economic Vitality</li>
                            <li>Importance of volunteer committees in driving neighborhood initiatives</li>
                            <li>Success stories of local businesses supported by the program</li>
                            <li>Challenges facing urban commercial districts post-pandemic</li>
                            <li>Vision for Jamaica Plain's continued growth and inclusivity</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Publication & Impact</h3>
                        <p>This interview was featured in The Scope Boston's "Q&A Changemakers" series, reaching a wide audience interested in urban development and community activism. The piece highlights successful models for neighborhood revitalization that balance economic growth with community values.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Duration:</strong> 3:11</li>
                            <li><strong>Format:</strong> Documentary Interview</li>
                            <li><strong>Year:</strong> 2024</li>
                            <li><strong>Location:</strong> JP Centre Street Office, Jamaica Plain</li>
                            <li><strong>Featured in:</strong> <a href="https://thescopeboston.org/9558/q-a-changemakers/jp-centre-south-main-streets-fosters-businesses/" style="color: rgba(255, 255, 255, 0.8); text-decoration: underline;">The Scope Boston</a></li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'video-news': {
            'Seaport Boston Holiday Market': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎥</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Seaport Boston Holiday Market - Case Study</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Project Overview</h3>
                        <p>Created a broadcast-style news segment on the Snowport Holiday Market in Boston's Seaport District, spotlighting its role in supporting 120+ small businesses. This multimedia journalism project showcased the economic and cultural impact of the market while refining storytelling and production skills.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Production Process</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Conducted comprehensive vendor research and interviews</li>
                            <li>Crafted strategic narratives focusing on small business support</li>
                            <li>Filmed on location capturing the market's vibrant atmosphere</li>
                            <li>Edited high-quality video content using Adobe Premiere Pro</li>
                            <li>Enhanced audio using professional post-production techniques</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Skills Demonstrated</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Video Production</strong> - Camera operation, shot composition, lighting</li>
                            <li><strong>News Reporting</strong> - Research, interviewing, storytelling</li>
                            <li><strong>Post-Production</strong> - Video editing, color grading, audio mixing</li>
                            <li><strong>Multimedia Journalism</strong> - Combining visual and narrative elements</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Focus</h3>
                        <p>The segment highlighted the market's vital role in supporting local small businesses during the holiday season, demonstrating the power of multimedia journalism in covering community stories. The project focused on:</p>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Small business support and economic impact</li>
                            <li>Local community coverage and cultural significance</li>
                            <li>Professional broadcast-style production values</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Technical Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Duration:</strong> 4:29</li>
                            <li><strong>Software:</strong> Adobe Premiere Pro, Adobe Creative Suite</li>
                            <li><strong>Format:</strong> Broadcast-style news segment</li>
                            <li><strong>Year:</strong> 2024</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
        'written-article': {
            'Public Perception of AI in Journalism': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🤖</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Public Perception of AI in Journalism - Article Details</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Article Overview</h3>
                        <p>Published in Storybench (syndicated from Reuters Institute), this article presents crucial findings from an international survey examining public attitudes toward generative AI in journalism across six diverse countries: Argentina, Denmark, France, Japan, the UK, and the US.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Findings</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Public sees AI making news production cheaper and more current</li>
                            <li>Significant concerns about transparency in AI-generated content</li>
                            <li>Trust issues remain a major barrier to acceptance</li>
                            <li>Varied perspectives across different countries and demographics</li>
                            <li>Expectations vs. reality of AI implementation in newsrooms</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Research Methodology</h3>
                        <p>The article synthesizes survey data from six countries, providing a global perspective on how audiences perceive AI's role in journalism. It balances quantitative findings with qualitative insights about public expectations and concerns.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Impact & Relevance</h3>
                        <p>This piece contributes to the critical conversation about AI in journalism at a time when newsrooms worldwide are grappling with how to implement these technologies responsibly while maintaining public trust.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Publication Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Published:</strong> October 18, 2024</li>
                            <li><strong>Platform:</strong> Storybench</li>
                            <li><strong>Original Source:</strong> Reuters Institute</li>
                            <li><strong>Type:</strong> News Brief / Survey Analysis</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `,
            'AI\'s Creative Revolution in Music': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎵</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">AI's Creative Revolution in Music - Article Details</h2>
                    <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                        <h3 style="color: white; margin: 25px 0 15px 0;">Article Overview</h3>
                        <p>Featured on Storybench and highlighting reporting from The Washington Post's Yan Wu, this article explores the rapidly evolving intersection of artificial intelligence and musical creativity, examining how AI tools are fundamentally changing the way music is composed, produced, and understood.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Key Topics Explored</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>Musicians' adoption of AI tools like Suno and ChatGPT</li>
                            <li>The acceleration of composition and production processes</li>
                            <li>AI as a source of creative inspiration and collaboration</li>
                            <li>Intellectual property challenges in AI-generated music</li>
                            <li>Questions of authorship and artistic authenticity</li>
                            <li>The future of human creativity in an AI-enhanced world</li>
                        </ul>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Critical Analysis</h3>
                        <p>The piece balances enthusiasm for AI's creative possibilities with thoughtful consideration of its challenges. It features perspectives from musicians actively using these tools while addressing concerns from traditionalists and legal experts about the implications for copyright and artistic integrity.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Industry Impact</h3>
                        <p>This article contributes to the vital discourse on AI's role in creative industries, offering insights valuable to musicians, producers, technologists, and policymakers navigating this transformative period in music history.</p>
                        
                        <h3 style="color: white; margin: 25px 0 15px 0;">Publication Details</h3>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Published:</strong> September 24, 2024</li>
                            <li><strong>Platform:</strong> Storybench</li>
                            <li><strong>Featuring:</strong> The Washington Post's Yan Wu</li>
                            <li><strong>Type:</strong> Feature / Opinion Analysis</li>
                        </ul>
                    </div>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-top: 30px;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `,
            'Sample Article Title': `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">📄</div>
                    <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Article - Details</h2>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 30px;">Full article content would be displayed here.</p>
                    <button id="closeDetailModal" style="
                        background: rgba(255, 255, 255, 0.15);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        transition: all 0.3s ease;
                    ">Close</button>
                </div>
            `
        },
       'written-thesis': {
    'Sample Thesis Title': `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎓</div>
            <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Thesis - Details</h2>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 30px;">Full thesis content would be displayed here.</p>
            <button id="closeDetailModal" style="
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `,
           
'Social Media Analytics for Customer Engagement': `
    <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 20px;">📊</div>
        <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">Social Media Analytics Research - Study Details</h2>
        <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
            <h3 style="color: white; margin: 25px 0 15px 0;">🔍 Research Overview</h3>
            <p>This comprehensive study explores how businesses can leverage Twitter and Facebook analytics to enhance customer engagement strategies. Using the ride-hailing company Umber as a case study, this research employs sentiment analysis and content analysis to transform social media data into actionable business insights.</p>
            
            <h3 style="color: white; margin: 25px 0 15px 0;">🛠️ Research Methodology</h3>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li><strong>Data Collection:</strong> Systematic gathering of Twitter interactions and Facebook engagement data from Umber's social media presence</li>
                <li><strong>Sentiment Analysis:</strong> Natural language processing to categorize customer feedback as positive, negative, or neutral</li>
                <li><strong>Content Analysis:</strong> Qualitative examination of user-generated content themes and patterns</li>
                <li><strong>Engagement Metrics:</strong> Quantitative analysis of likes, shares, comments, and response rates</li>
                <li><strong>Temporal Analysis:</strong> Tracking engagement patterns across different time periods and campaigns</li>
            </ul>
            
            <h3 style="color: white; margin: 25px 0 15px 0;">📈 Key Findings</h3>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li><strong>Customer Sentiment Patterns:</strong> Identified peak times for positive and negative feedback correlating with service quality</li>
                <li><strong>Engagement Optimization:</strong> Determined optimal posting times and content types for maximum customer interaction</li>
                <li><strong>Issue Resolution:</strong> Demonstrated how proactive social media monitoring improved customer service response times</li>
                <li><strong>Brand Loyalty Indicators:</strong> Established metrics for measuring long-term customer engagement and retention</li>
                <li><strong>Competitive Analysis:</strong> Benchmarked Umber's social media performance against industry standards</li>
            </ul>
            
            <h3 style="color: white; margin: 25px 0 15px 0;">💡 Practical Applications</h3>
            <p>The research provides actionable frameworks for businesses to implement data-driven social media strategies. Key applications include real-time customer feedback analysis, predictive engagement modeling, and automated response systems that enhance customer satisfaction while reducing operational costs.</p>
            
            <h3 style="color: white; margin: 25px 0 15px 0;">🎯 Business Impact</h3>
            <p>This study demonstrates the tangible value of social media analytics in driving business outcomes. The methodologies developed can be adapted across industries to improve customer engagement, brand perception, and ultimately, business performance through strategic social media management.</p>
            
            <h3 style="color: white; margin: 25px 0 15px 0;">🔮 Future Research Directions</h3>
            <p>The research establishes a foundation for exploring advanced analytics applications, including machine learning-driven engagement prediction and automated customer service optimization through social media platforms.</p>
        </div>
        <button id="closeDetailModal" style="
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 30px;
            transition: all 0.3s ease;
        ">Close</button>
    </div>
`,
    'Evaluating Generative AI Models for Game Narrative Design': `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎮</div>
            <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">AI Game Narrative Research - Study Details</h2>
            <div style="text-align: left; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                <h3 style="color: white; margin: 25px 0 15px 0;">🔍 Research Overview</h3>
                <p>This study represents the first comprehensive comparative analysis of generative AI models specifically for game narrative creation. As the gaming industry increasingly explores AI-assisted content generation, this research provides critical insights into which models excel at different aspects of interactive storytelling, from character dialogue to branching narratives.</p>
                
                <h3 style="color: white; margin: 25px 0 15px 0;">🛠️ Methodology</h3>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><strong>Model Testing:</strong> Systematic evaluation of ChatGPT-4, Claude, and NovelAI across standardized narrative prompts</li>
                    <li><strong>Multi-Genre Analysis:</strong> Testing across RPG, adventure, horror, and sci-fi game scenarios</li>
                    <li><strong>Expert Review:</strong> Professional game writers assessed output quality, consistency, and creativity</li>
                    <li><strong>Player Testing:</strong> User experience studies measuring engagement with AI-generated vs. human-written content</li>
                    <li><strong>Quantitative Metrics:</strong> Analysis of coherence scores, character consistency, and narrative flow</li>
                </ul>
                
                <h3 style="color: white; margin: 25px 0 15px 0;">📊 Key Findings</h3>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li><strong>ChatGPT:</strong> Excelled in dialogue generation and character voice consistency across long conversations</li>
                    <li><strong>Claude:</strong> Demonstrated superior narrative structure and plot coherence in complex branching scenarios</li>
                    <li><strong>NovelAI:</strong> Showed strength in creative world-building and atmospheric description generation</li>
                    <li><strong>Hybrid Approach:</strong> Combining models for different narrative elements yielded optimal results</li>
                    <li><strong>Genre Variations:</strong> Each model performed differently across game genres, with specific strengths emerging</li>
                </ul>
                
                <h3 style="color: white; margin: 25px 0 15px 0;">🎯 Impact & Applications</h3>
                <p>This research provides actionable guidelines for game developers considering AI integration in their narrative workflows. The findings suggest that rather than replacing human writers, these AI models serve best as collaborative tools, with each excelling in specific aspects of story creation. The study establishes benchmarks for evaluating future AI narrative tools and offers a framework for implementing AI-assisted storytelling in game development pipelines.</p>
                
                <h3 style="color: white; margin: 25px 0 15px 0;">🔮 Future Implications</h3>
                <p>As generative AI continues evolving, this research lays groundwork for understanding how these technologies can enhance rather than replace human creativity in interactive entertainment. The study's methodology can be adapted for evaluating new AI models and measuring improvements in narrative generation capabilities.</p>
            </div>
            <button id="closeDetailModal" style="
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-top: 30px;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `
}
    };
    
    return details[type]?.[title] || `
        <div style="text-align: center;">
            <h2 style="color: white; margin-bottom: 30px; font-family: 'Space Grotesk', sans-serif;">${title} - Details</h2>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 30px;">Detailed information about this project would be displayed here.</p>
            <button id="closeDetailModal" style="
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `;
}

// Project filtering system
function initProjectFiltering() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const categorySections = document.querySelectorAll('.category-section');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding section
            categorySections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(`${filter}-projects`);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 100);
            }
            
            // Add visual feedback
            tab.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tab.style.transform = '';
            }, 150);
        });
    });
}

// Initialize detailed project interactions
function initDetailedProjects() {
    // Fullscreen buttons for website previews
    const fullscreenBtns = document.querySelectorAll('.fullscreen-btn');
    fullscreenBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = btn.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Video controls
    const playBtns = document.querySelectorAll('.play-btn-large');
    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoId = btn.getAttribute('data-video-id');
            const showcase = btn.closest('.video-showcase');
            const poster = showcase.querySelector('.video-poster');
            const iframeContainer = showcase.querySelector('.video-iframe-container');
            const videoElement = showcase.querySelector('.project-video-large');
            
            if (videoId && iframeContainer) {
                // For Google Drive videos
                const playHint = showcase.querySelector('.video-play-hint');
                
                if (poster.style.display !== 'none') {
                    // Show video
                    poster.style.display = 'none';
                    iframeContainer.style.display = 'block';
                    btn.style.opacity = '0';
                    btn.style.pointerEvents = 'none';
                    
                    // Show play hint
                    if (playHint) {
                        playHint.style.display = 'block';
                        // Hide hint after 3 seconds
                        setTimeout(() => {
                            playHint.style.display = 'none';
                        }, 3000);
                    }
                } else {
                    // Hide video
                    poster.style.display = 'block';
                    iframeContainer.style.display = 'none';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                    
                    // Hide play hint
                    if (playHint) {
                        playHint.style.display = 'none';
                    }
                }
            } else if (videoElement) {
                // For local videos
                if (videoElement.paused) {
                    videoElement.play();
                    btn.textContent = '⏸';
                    btn.style.opacity = '0.8';
                } else {
                    videoElement.pause();
                    btn.textContent = '▶';
                    btn.style.opacity = '1';
                }
            }
        });
    });
    
    // Audio controls
    const audioPlayBtns = document.querySelectorAll('.play-pause-large');
    audioPlayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const audio = btn.closest('.audio-showcase').querySelector('.project-audio-large');
            const progressBar = btn.closest('.audio-showcase').querySelector('.progress-bar-large');
            const timeDisplay = btn.closest('.audio-showcase').querySelector('.audio-time-large');
            const visualizer = btn.closest('.audio-showcase').querySelector('.audio-visualizer');
            
            if (audio.paused) {
                // Pause all other audio first
                document.querySelectorAll('.project-audio-large').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        const otherBtn = a.closest('.audio-showcase').querySelector('.play-pause-large');
                        const otherVisualizer = a.closest('.audio-showcase').querySelector('.audio-visualizer');
                        otherBtn.textContent = '▶';
                        stopAudioVisualizer(otherVisualizer);
                    }
                });
                
                audio.play();
                btn.textContent = '⏸';
                startAudioVisualizer(visualizer);
            } else {
                audio.pause();
                btn.textContent = '▶';
                stopAudioVisualizer(visualizer);
            }
            
            // Update progress bar
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progress + '%';
                
                const currentMin = Math.floor(audio.currentTime / 60);
                const currentSec = Math.floor(audio.currentTime % 60);
                const totalMin = Math.floor(audio.duration / 60);
                const totalSec = Math.floor(audio.duration % 60);
                
                timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
            });
        });
    });
    
    // Project links in detailed view
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.tagName === 'BUTTON') {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const action = link.getAttribute('data-action');
                const project = link.closest('.detailed-project');
                const projectType = project.getAttribute('data-type');
                const projectTitle = project.querySelector('h3').textContent;
                
                // Handle different actions
                switch(action) {
                    case 'watch':
                    case 'watch-video':
                        const videoId = link.getAttribute('data-video-id');
                        if (videoId) {
                            // Find the play button and trigger click
                            const playBtn = project.querySelector('.play-btn-large');
                            if (playBtn) playBtn.click();
                        } else {
                            showModal('video', projectTitle, 'Full video experience coming soon! This would open the complete documentary with interactive elements and behind-the-scenes content.');
                        }
                        break;
                    case 'listen':
                        showModal('audio', projectTitle, 'Full audio experience coming soon! This would open the complete podcast series with additional resources and transcripts.');
                        break;
                    case 'read':
                        showModal('article', projectTitle, 'Complete article collection coming soon! This would showcase all published articles with full text and references.');
                        break;
                    case 'details':
                        showDetailModal(projectType, projectTitle);
                        break;
                    default:
                        console.log(`Action ${action} clicked for ${projectTitle}`);
                }
                
                // Visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        }
    });
}

// Initialize written works functionality
function initWrittenWorks() {
    const writtenWorkCards = document.querySelectorAll('.written-work-card');
    const readWorkBtns = document.querySelectorAll('.read-work-btn');
    
    // Add hover effects for written work cards
    writtenWorkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Handle read work button clicks
    readWorkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const action = btn.getAttribute('data-action');
            const card = btn.closest('.written-work-card');
            const title = card.getAttribute('data-title');
            const type = card.getAttribute('data-type');
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // Handle different written work actions
            switch(action) {
                case 'read-article':
                    showWrittenWorkModal('article', title);
                    break;
                case 'read-thesis':
                    showWrittenWorkModal('thesis', title);
                    break;
                default:
                    showWrittenWorkModal(type, title);
            }
        });
    });
}

// Show written work modal
function showWrittenWorkModal(type, title) {
    const modal = document.createElement('div');
    modal.className = 'written-work-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(20px);
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 50px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
        backdrop-filter: blur(30px);
        transform: scale(0.8) translateY(50px);
        transition: all 0.4s ease;
    `;
    
    const icon = type === 'thesis' ? '🎓' : '📄';
    const typeText = type === 'thesis' ? 'Thesis' : 'Article';
    
    modalContent.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">${icon}</div>
        <h3 style="color: white; margin-bottom: 25px; font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem;">${title}</h3>
        <p style="color: rgba(255, 255, 255, 0.6); margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.9rem;">
            ${typeText}
        </p>
        <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 40px; line-height: 1.6; font-size: 1rem;">
            The full content of "${title}" would be displayed here. This could include the complete article text, abstract, methodology, findings, and conclusions.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button id="closeWrittenModal" style="
                background: rgba(255, 255, 255, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
                font-weight: 500;
            ">Close</button>
            <button id="downloadWork" style="
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: rgba(255, 255, 255, 0.8);
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: all 0.3s ease;
            ">Download PDF</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 10);
    
    // Button interactions
    const closeBtn = modal.querySelector('#closeWrittenModal');
    const downloadBtn = modal.querySelector('#downloadWork');
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(50px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 400);
    };
    
    closeBtn.addEventListener('click', closeModal);
    downloadBtn.addEventListener('click', () => {
        alert('PDF download would be available here!');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Audio visualizer controls
function startAudioVisualizer(visualizer) {
    const waves = visualizer.querySelectorAll('.sound-wave-large');
    waves.forEach(wave => {
        wave.style.animationPlayState = 'running';
    });
}

function stopAudioVisualizer(visualizer) {
    const waves = visualizer.querySelectorAll('.sound-wave-large');
    waves.forEach(wave => {
        wave.style.animationPlayState = 'paused';
    });
}
// Sidebar Navigation
document.addEventListener('DOMContentLoaded', function() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const heroSection = document.querySelector('.hero-section');
    
    // Show/hide sidebar based on scroll position
    function updateSidebarVisibility() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > heroBottom - 100) {
            sidebarNav.classList.add('visible');
        } else {
            sidebarNav.classList.remove('visible');
            sidebarNav.classList.remove('expanded');
        }
    }
    
    // Toggle sidebar expansion
    sidebarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebarNav.classList.toggle('expanded');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebarNav.contains(e.target)) {
            sidebarNav.classList.remove('expanded');
        }
    });
    
    // Handle sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filter = this.getAttribute('data-filter');
            const action = this.getAttribute('data-action');
            
            if (filter) {
                // Handle category filters
                const filterTab = document.querySelector(`.filter-tab[data-filter="${filter}"]`);
                if (filterTab) {
                    filterTab.click();
                    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
                }
                
                // Update active state
                sidebarLinks.forEach(l => {
                    if (l.hasAttribute('data-filter')) {
                        l.classList.remove('active');
                    }
                });
                this.classList.add('active');
            } else if (action === 'about') {
                // Scroll to about section
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close sidebar after action
            sidebarNav.classList.remove('expanded');
        });
    });
    
    // Update active state based on current filter
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-tab')) {
            const activeFilter = e.target.getAttribute('data-filter');
            sidebarLinks.forEach(link => {
                if (link.getAttribute('data-filter') === activeFilter) {
                    link.classList.add('active');
                } else if (link.hasAttribute('data-filter')) {
                    link.classList.remove('active');
                }
            });
        }
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', updateSidebarVisibility);
    
    // Initial check
    updateSidebarVisibility();
});
// Contact Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const openContactBtn = document.getElementById('openContactPanel');
    const closeContactBtn = document.getElementById('closeContactPanel');
    const contactPanel = document.getElementById('contactPanel');
    const contactOverlay = document.getElementById('contactOverlay');
    
    // Open contact panel
    if (openContactBtn) {
        openContactBtn.addEventListener('click', function() {
            contactPanel.classList.add('active');
            contactOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close contact panel
    function closeContactPanel() {
        contactPanel.classList.remove('active');
        contactOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', closeContactPanel);
    }
    
    // Close on overlay click
    if (contactOverlay) {
        contactOverlay.addEventListener('click', closeContactPanel);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactPanel.classList.contains('active')) {
            closeContactPanel();
        }
    });
});

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        const event = new CustomEvent('copied');
        document.dispatchEvent(event);
        
        // Simple alert for now - you can make this fancier
        alert('Copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard!');
    });
}
// Enhanced copy to clipboard function with beautiful feedback
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showCopySuccess();
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess();
    });
}

// Show beautiful copy success animation
function showCopySuccess() {
    // Remove any existing success message
    const existingSuccess = document.querySelector('.copy-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'copy-success';
    successMessage.innerHTML = '✓ Copied to clipboard!';
    
    document.body.appendChild(successMessage);
    
    // Remove after animation
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 2000);
}
