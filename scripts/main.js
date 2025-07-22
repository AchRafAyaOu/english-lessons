    //<![CDATA[
    // Lesson URLs mapping
    const lessonUrls = {
      'lesson1': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-01-alphabet-numbers.html',
      'lesson2': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-02-greetings.html',
      'lesson3': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-03-family-home.html',
      'lesson4': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-04-colors-shapes.html',
      'lesson5': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-05-time-date.html',
      'lesson6': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-06-advanced-conversation.html',
      'lesson7': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/basic_virbs.html',
      'lesson8': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/Auxliary_verb.html',
      'lesson9': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/Question_words.html',
      'lesson10': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/adjective.html'
    };

    // About URL
    const aboutUrl = 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/aboutme.html';

    // Global variables
    let loadedLessons = new Set();
    let currentLesson = null;
    let lessonStartTime = null;
    let touchStartX = null;
    let touchStartY = null;
    let currentTheme = 'default';

    // Lesson order
    const lessonOrder = ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7', 'lesson8', 'lesson9', 'lesson10'];
    const lessonTitles = {
      'lesson1': 'الدرس الأول: الأبجدية والأرقام',
      'lesson2': 'الدرس الثاني: التحيات',
      'lesson3': 'الدرس الثالث: العائلة والمنزل',
      'lesson4': 'الدرس الرابع: الألوان والأشكال',
      'lesson5': 'الدرس الخامس: الوقت والتاريخ',
      'lesson6': 'الدرس السادس: المحادثة المتقدمة',
      'lesson7': 'الدرس السابع: الأفعال الأساسية',
      'lesson8': 'الدرس الثامن: الأفعال المساعدة',
      'lesson9': 'الدرس التاسع: كلمات الاستفهام',
      'lesson10': 'الدرس العاشر: الصفات والظروف'
    };

    // Lesson data for search
    const lessonData = [
      { id: 'lesson1', title: 'الأبجدية والأرقام', keywords: ['alphabet', 'numbers', 'حروف', 'أرقام', 'أبجدية'] },
      { id: 'lesson2', title: 'التحيات', keywords: ['greetings', 'hello', 'تحيات', 'مرحبا'] },
      { id: 'lesson3', title: 'العائلة والمنزل', keywords: ['family', 'home', 'عائلة', 'منزل', 'بيت'] },
      { id: 'lesson4', title: 'الألوان والأشكال', keywords: ['colors', 'shapes', 'ألوان', 'أشكال'] },
      { id: 'lesson5', title: 'الوقت والتاريخ', keywords: ['time', 'date', 'وقت', 'تاريخ', 'ساعة'] },
      { id: 'lesson6', title: 'المحادثة المتقدمة', keywords: ['conversation', 'advanced', 'محادثة', 'متقدم'] },
      { id: 'lesson7', title: 'الأفعال الأساسية', keywords: ['verbs', 'basic', 'أفعال', 'أساسية'] },
      { id: 'lesson8', title: 'الأفعال المساعدة', keywords: ['auxiliary', 'helping', 'مساعدة', 'أفعال مساعدة'] },
      { id: 'lesson9', title: 'كلمات الاستفهام', keywords: ['question', 'words', 'استفهام', 'أسئلة'] },
      { id: 'lesson10', title: 'الصفات والظروف', keywords: ['adjectives', 'adverbs', 'صفات', 'ظروف'] }
    ];

    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
      // Hide loading overlay
      setTimeout(() => {
        document.getElementById('loadingOverlay').classList.remove('active');
      }, 500);

      // Hide welcome notification after 3 seconds
      setTimeout(() => {
        const notification = document.getElementById('welcomeNotification');
        if (notification) {
          notification.style.display = 'none';
        }
      }, 3000);

      // Initialize all features
      initScrollListener();
      addKeyboardSupport();
      initTouchEvents();
      initTheme();
      addRippleEffect();
      initLazyLoad();
      initScrollAnimations();
      initSearch();
      initActiveNavLinks();
    });

    // Theme Functions
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'default';
      setTheme(savedTheme);

      // Mobile theme buttons
      const mobileThemeButtons = document.querySelectorAll('.mobile-theme-btn');
      mobileThemeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const theme = this.dataset.theme;
          setTheme(theme);
          
          // Update active state
          mobileThemeButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

    function setTheme(theme) {
      currentTheme = theme;
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Update active theme buttons
      document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
      });

      // Update meta theme color
      const metaThemeColor = document.getElementById('metaThemeColor');
      if (metaThemeColor) {
        switch(theme) {
          case 'blue':
            metaThemeColor.content = '#0056b3';
            break;
          case 'green':
            metaThemeColor.content = '#218838';
            break;
          case 'dark':
            metaThemeColor.content = '#333';
            break;
          default:
            metaThemeColor.content = '#1e3c72';
        }
      }
    }

    // Mobile Menu Functions
    function toggleMobileMenu() {
      const nav = document.getElementById('mainNav');
      const toggle = document.getElementById('mobileMenuToggle');
      const overlay = document.getElementById('mobileNavOverlay');
      const isActive = nav.classList.toggle('active');
      
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
      overlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    // Close mobile menu when clicking overlay
    document.getElementById('mobileNavOverlay').addEventListener('click', function() {
      const nav = document.getElementById('mainNav');
      const toggle = document.getElementById('mobileMenuToggle');
      
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      this.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Active Navigation Links
    function initActiveNavLinks() {
      const navLinks = document.querySelectorAll('.nav-link');
      
      // Update active state on scroll
      window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
              }
            });
          }
        });
      });
    }

    // Search Functions - Enhanced
    function initSearch() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) {
              firstResult.click();
            }
          }
        });
      }
    }

    function openSearchModal() {
      const modal = document.getElementById('searchModal');
      const searchInput = document.getElementById('searchInput');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }

    function closeSearchModal() {
      const modal = document.getElementById('searchModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Clear search
      document.getElementById('searchInput').value = '';
      document.getElementById('searchResults').innerHTML = '';
    }

    function performSearch() {
      const query = this.value.toLowerCase().trim();
      const resultsContainer = document.getElementById('searchResults');
      
      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
      }
      
      const results = lessonData.filter(lesson => {
        return lesson.title.toLowerCase().includes(query) ||
               lesson.keywords.some(keyword => keyword.toLowerCase().includes(query));
      });
      
      resultsContainer.innerHTML = '';
      
      if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-no-results">لا توجد نتائج مطابقة</div>';
        return;
      }
      
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <h4>${lessonTitles[result.id]}</h4>
          <p>انقر للانتقال إلى الدرس</p>
        `;
        resultItem.onclick = () => {
          closeSearchModal();
          openLesson(result.id, lessonTitles[result.id]);
        };
        resultsContainer.appendChild(resultItem);
      });
    }

    // Lazy Loading
    function initLazyLoad() {
      const lazyElements = document.querySelectorAll('.lazy-load');
      
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyLoadObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      lazyElements.forEach(element => {
        lazyLoadObserver.observe(element);
      });
    }

    // Scroll Animations for Lessons
    function initScrollAnimations() {
      const lessonCards = document.querySelectorAll('.lesson-card');
      
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.1
      });
      
      lessonCards.forEach(card => {
        scrollObserver.observe(card);
      });
    }

    // Ripple Effect
    function addRippleEffect() {
      const buttons = document.querySelectorAll('button, .cta-button, .lesson-button, .footer-nav-btn');
      
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    }

    // Lesson Functions
    function openLesson(lessonId, lessonTitle) {
      const modal = document.getElementById('lessonModal');
      const modalTitle = document.getElementById('lessonModalTitle');
      const contentBody = document.getElementById('lessonContentBody');
      
      // Show loading with progress
      showLoadingWithProgress();
      
      // Set current lesson and start time
      currentLesson = lessonId;
      lessonStartTime = Date.now();
      
      // Show modal
      modal.classList.add('active');
      modalTitle.textContent = lessonTitle;
      document.body.style.overflow = 'hidden';
      
      // Update navigation buttons
      updateLessonNavigation();
      
      // Show loading in content
      contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div><div class="lesson-content-loading"><div class="loading-spinner"></div><p>جاري تحميل الدرس...</p></div>';
      
      // Load lesson if not already loaded
      if (!loadedLessons.has(lessonId)) {
        loadLesson(lessonId);
      } else {
        // Show cached content
        const cachedContent = sessionStorage.getItem(`lesson_${lessonId}`);
        if (cachedContent) {
          contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div>' + cachedContent;
          hideLoading();
        } else {
          loadLesson(lessonId);
        }
      }
    }

    function loadLesson(lessonId) {
      const contentBody = document.getElementById('lessonContentBody');
      const url = lessonUrls[lessonId];
      
      if (!url) {
        contentBody.innerHTML = '<div class="lesson-content-error"><p>عذراً، لم يتم العثور على الدرس</p></div>';
        hideLoading();
        return;
      }

      // Fetch lesson content
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract body content from HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const bodyContent = doc.body ? doc.body.innerHTML : html;
          
          // Process content to ensure it works properly
          const processedContent = processContent(bodyContent);
          
          contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div><div class="lesson-loaded">' + processedContent + '</div>';
          loadedLessons.add(lessonId);
          
          // Cache content
          try {
            sessionStorage.setItem(`lesson_${lessonId}`, '<div class="lesson-loaded">' + processedContent + '</div>');
          } catch (e) {
            console.warn('Failed to cache lesson content:', e);
          }
          
          hideLoading();
          
          // Start lesson completion timer
          startLessonCompletionTimer();
        })
        .catch(error => {
          console.error('Error loading lesson:', error);
          contentBody.innerHTML = '<div class="lesson-content-error"><p>حدث خطأ في تحميل الدرس. يرجى المحاولة مرة أخرى.</p></div>';
          hideLoading();
        });
    }

    function processContent(html) {
      // Remove any script tags for security
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Remove scripts
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => script.remove());
      
      // Fix relative URLs if any
      const links = tempDiv.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
      
      // Enhance content styling
      const allElements = tempDiv.querySelectorAll('*');
      allElements.forEach(el => {
        // Add RTL support for Arabic content
        if (el.textContent && /[\u0600-\u06FF]/.test(el.textContent)) {
          el.style.direction = 'rtl';
          el.style.textAlign = 'right';
        }
        
        // Enhance typography
        if (el.tagName === 'P' || el.tagName === 'LI') {
          el.style.lineHeight = '1.8';
          el.style.marginBottom = '1rem';
        }
        
        if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
          el.style.marginTop = '1.5rem';
          el.style.marginBottom = '1rem';
          el.style.fontWeight = '700';
        }
      });
      
      return tempDiv.innerHTML;
    }

    function closeLessonModal() {
      const modal = document.getElementById('lessonModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
      currentLesson = null;
      lessonStartTime = null;
    }

    function updateLessonNavigation() {
      const prevBtn = document.querySelector('.lesson-nav-btn.prev');
      const nextBtn = document.querySelector('.lesson-nav-btn.next');
      
      const currentIndex = lessonOrder.indexOf(currentLesson);
      
      // Update previous button
      if (currentIndex > 0) {
        prevBtn.disabled = false;
      } else {
        prevBtn.disabled = true;
      }
      
      // Update next button
      if (currentIndex < lessonOrder.length - 1) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    }

    function navigateLesson(direction) {
      const currentIndex = lessonOrder.indexOf(currentLesson);
      let newIndex;
      
      if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (direction === 'next' && currentIndex < lessonOrder.length - 1) {
        newIndex = currentIndex + 1;
      } else {
        return;
      }
      
      const newLessonId = lessonOrder[newIndex];
      const newLessonTitle = lessonTitles[newLessonId];
      
      // Add transition effect
      const contentBody = document.getElementById('lessonContentBody');
      contentBody.style.opacity = '0';
      contentBody.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
      
      setTimeout(() => {
        openLesson(newLessonId, newLessonTitle);
        contentBody.style.opacity = '1';
        contentBody.style.transform = 'translateX(0)';
      }, 300);
    }

    // Touch swipe support for lesson navigation
    function initLessonSwipe() {
      const contentBody = document.getElementById('lessonContentBody');
      
      contentBody.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      contentBody.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (Math.abs(diffX) > 50) {
            contentBody.classList.add('swiping');
          }
        }
      }, { passive: true });
      
      contentBody.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        contentBody.classList.remove('swiping');
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 100) {
            // Swipe left - next lesson
            navigateLesson('next');
          } else if (diffX < -100) {
            // Swipe right - previous lesson
            navigateLesson('prev');
          }
        }
        
        touchStartX = null;
        touchStartY = null;
      }, { passive: true });
    }

    // Initialize swipe when modal opens
    document.getElementById('lessonModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeLessonModal();
      }
    });

    initLessonSwipe();

    function startLessonCompletionTimer() {
      // Show success notification after 30 seconds
      setTimeout(() => {
        if (currentLesson && lessonStartTime) {
          const timeSpent = Date.now() - lessonStartTime;
          if (timeSpent >= 30000) {
            showSuccessNotification();
          }
        }
      }, 30000);
    }

    // About Page Functions
    function showAboutPage(event) {
      if (event) event.preventDefault();
      
      const aboutModal = document.getElementById('aboutContent');
      const aboutBody = document.getElementById('aboutContentBody');
      
      // Show loading
      showLoadingWithProgress();
      
      // Show modal
      aboutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Show loading in content
      aboutBody.innerHTML = '<div class="lesson-content-loading"><div class="loading-spinner"></div><p>جاري التحميل...</p></div>';
      
      // Check cache first
      const cachedAbout = sessionStorage.getItem('about_content');
      if (cachedAbout) {
        aboutBody.innerHTML = cachedAbout;
        hideLoading();
        return;
      }
      
      // Fetch about content
      fetch(aboutUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract body content from HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const bodyContent = doc.body ? doc.body.innerHTML : html;
          
          // Process content
          const processedContent = processContent(bodyContent);
          
          aboutBody.innerHTML = processedContent;
          
          // Cache content
          try {
            sessionStorage.setItem('about_content', processedContent);
          } catch (e) {
            console.warn('Failed to cache about content:', e);
          }
          
          hideLoading();
        })
        .catch(error => {
          console.error('Error loading about page:', error);
          aboutBody.innerHTML = '<div class="lesson-content-error"><p>حدث خطأ في التحميل. يرجى المحاولة مرة أخرى.</p></div>';
          hideLoading();
        });
    }

    function closeAboutModal() {
      const aboutModal = document.getElementById('aboutContent');
      aboutModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close modals when clicking outside
    document.getElementById('aboutContent').addEventListener('click', function(e) {
      if (e.target === this) {
        closeAboutModal();
      }
    });

    // Close search modal when clicking outside
    document.getElementById('searchModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeSearchModal();
      }
    });

    // Success Notification
    function showSuccessNotification() {
      const notification = document.getElementById('successNotification');
      notification.classList.add('show');
      
      // Play success sound if available
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        audio.volume = 0.3;
        audio.play();
      } catch (e) {
        // Ignore audio errors
      }
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 5000);
    }

    // Loading Functions
    function showLoading() {
      document.getElementById('loadingOverlay').classList.add('active');
    }

    function hideLoading() {
      document.getElementById('loadingOverlay').classList.remove('active');
      document.getElementById('progressBar').classList.remove('active');
    }

    function showLoadingWithProgress() {
      showLoading();
      const progressBar = document.getElementById('progressBar');
      const progressFill = document.getElementById('progressBarFill');
      
      progressBar.classList.add('active');
      progressFill.style.width = '0%';
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) {
          progress = 90;
          clearInterval(interval);
        }
        progressFill.style.width = progress + '%';
      }, 200);
    }

    // Back to Top Functions
    function initScrollListener() {
      const backToTop = document.getElementById('backToTop');
      const header = document.getElementById('mainHeader');
      let scrollTimeout;
      let lastScroll = 0;
      
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        const currentScroll = window.pageYOffset;
        
        // Header scroll effect
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Back to top button
        scrollTimeout = setTimeout(() => {
          if (currentScroll > 300) {
            backToTop.classList.add('show');
          } else {
            backToTop.classList.remove('show');
          }
        }, 100);
        
        lastScroll = currentScroll;
      }, { passive: true });
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Keyboard Support
    function addKeyboardSupport() {
      // ESC key to close modals
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const lessonModal = document.getElementById('lessonModal');
          const aboutModal = document.getElementById('aboutContent');
          const searchModal = document.getElementById('searchModal');
          
          if (lessonModal.classList.contains('active')) {
            closeLessonModal();
          }
          if (aboutModal.classList.contains('active')) {
            closeAboutModal();
          }
          if (searchModal.classList.contains('active')) {
            closeSearchModal();
          }
        }
        
        // Arrow keys for lesson navigation
        if (currentLesson && e.key === 'ArrowLeft') {
          navigateLesson('next');
        } else if (currentLesson && e.key === 'ArrowRight') {
          navigateLesson('prev');
        }
      });

      // Enter key for lesson cards
      document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });
    }

    // Touch Events
    function initTouchEvents() {
      // Add touch feedback
      document.querySelectorAll('button, a, .lesson-card').forEach(element => {
        element.addEventListener('touchstart', function() {
          this.style.opacity = '0.7';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
          this.style.opacity = '';
        }, { passive: true });
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          showLoadingWithProgress();
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            hideLoading();
            
            // Close mobile menu if open
            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('active')) {
              toggleMobileMenu();
            }
          }, 300);
        }
      });
    });

    // Performance optimizations
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Service Worker Registration (for better performance)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, app will still work
        });
      });
    }
    //]]>
    const lessonUrls = {
      'lesson1': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-01-alphabet-numbers.html',
      'lesson2': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-02-greetings.html',
      'lesson3': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-03-family-home.html',
      'lesson4': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-04-colors-shapes.html',
      'lesson5': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-05-time-date.html',
      'lesson6': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/lesson-06-advanced-conversation.html',
      'lesson7': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/basic_virbs.html',
      'lesson8': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/Auxliary_verb.html',
      'lesson9': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/Question_words.html',
      'lesson10': 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/adjective.html'
    };

    // About URL
    const aboutUrl = 'https://raw.githubusercontent.com/AchRafAyaOu/english-lessons/refs/heads/main/aboutme.html';

    // Global variables
    let loadedLessons = new Set();
    let currentLesson = null;
    let lessonStartTime = null;
    let touchStartX = null;
    let touchStartY = null;
    let currentTheme = 'default';

    // Lesson order
    const lessonOrder = ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 'lesson6', 'lesson7', 'lesson8', 'lesson9', 'lesson10'];
    const lessonTitles = {
      'lesson1': 'الدرس الأول: الأبجدية والأرقام',
      'lesson2': 'الدرس الثاني: التحيات',
      'lesson3': 'الدرس الثالث: العائلة والمنزل',
      'lesson4': 'الدرس الرابع: الألوان والأشكال',
      'lesson5': 'الدرس الخامس: الوقت والتاريخ',
      'lesson6': 'الدرس السادس: المحادثة المتقدمة',
      'lesson7': 'الدرس السابع: الأفعال الأساسية',
      'lesson8': 'الدرس الثامن: الأفعال المساعدة',
      'lesson9': 'الدرس التاسع: كلمات الاستفهام',
      'lesson10': 'الدرس العاشر: الصفات والظروف'
    };

    // Lesson data for search
    const lessonData = [
      { id: 'lesson1', title: 'الأبجدية والأرقام', keywords: ['alphabet', 'numbers', 'حروف', 'أرقام', 'أبجدية'] },
      { id: 'lesson2', title: 'التحيات', keywords: ['greetings', 'hello', 'تحيات', 'مرحبا'] },
      { id: 'lesson3', title: 'العائلة والمنزل', keywords: ['family', 'home', 'عائلة', 'منزل', 'بيت'] },
      { id: 'lesson4', title: 'الألوان والأشكال', keywords: ['colors', 'shapes', 'ألوان', 'أشكال'] },
      { id: 'lesson5', title: 'الوقت والتاريخ', keywords: ['time', 'date', 'وقت', 'تاريخ', 'ساعة'] },
      { id: 'lesson6', title: 'المحادثة المتقدمة', keywords: ['conversation', 'advanced', 'محادثة', 'متقدم'] },
      { id: 'lesson7', title: 'الأفعال الأساسية', keywords: ['verbs', 'basic', 'أفعال', 'أساسية'] },
      { id: 'lesson8', title: 'الأفعال المساعدة', keywords: ['auxiliary', 'helping', 'مساعدة', 'أفعال مساعدة'] },
      { id: 'lesson9', title: 'كلمات الاستفهام', keywords: ['question', 'words', 'استفهام', 'أسئلة'] },
      { id: 'lesson10', title: 'الصفات والظروف', keywords: ['adjectives', 'adverbs', 'صفات', 'ظروف'] }
    ];

    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
      // Hide loading overlay
      setTimeout(() => {
        document.getElementById('loadingOverlay').classList.remove('active');
      }, 500);

      // Hide welcome notification after 3 seconds
      setTimeout(() => {
        const notification = document.getElementById('welcomeNotification');
        if (notification) {
          notification.style.display = 'none';
        }
      }, 3000);

      // Initialize all features
      initScrollListener();
      addKeyboardSupport();
      initTouchEvents();
      initTheme();
      addRippleEffect();
      initLazyLoad();
      initScrollAnimations();
      initSearch();
      initActiveNavLinks();
    });

    // Theme Functions
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'default';
      setTheme(savedTheme);

      // Mobile theme buttons
      const mobileThemeButtons = document.querySelectorAll('.mobile-theme-btn');
      mobileThemeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const theme = this.dataset.theme;
          setTheme(theme);
          
          // Update active state
          mobileThemeButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

    function setTheme(theme) {
      currentTheme = theme;
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // Update active theme buttons
      document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
      });

      // Update meta theme color
      const metaThemeColor = document.getElementById('metaThemeColor');
      if (metaThemeColor) {
        switch(theme) {
          case 'blue':
            metaThemeColor.content = '#0056b3';
            break;
          case 'green':
            metaThemeColor.content = '#218838';
            break;
          case 'dark':
            metaThemeColor.content = '#333';
            break;
          default:
            metaThemeColor.content = '#1e3c72';
        }
      }
    }

    // Mobile Menu Functions
    function toggleMobileMenu() {
      const nav = document.getElementById('mainNav');
      const toggle = document.getElementById('mobileMenuToggle');
      const overlay = document.getElementById('mobileNavOverlay');
      const isActive = nav.classList.toggle('active');
      
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
      overlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    // Close mobile menu when clicking overlay
    document.getElementById('mobileNavOverlay').addEventListener('click', function() {
      const nav = document.getElementById('mainNav');
      const toggle = document.getElementById('mobileMenuToggle');
      
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      this.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Active Navigation Links
    function initActiveNavLinks() {
      const navLinks = document.querySelectorAll('.nav-link');
      
      // Update active state on scroll
      window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
              }
            });
          }
        });
      });
    }

    // Search Functions - Enhanced
    function initSearch() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) {
              firstResult.click();
            }
          }
        });
      }
    }

    function openSearchModal() {
      const modal = document.getElementById('searchModal');
      const searchInput = document.getElementById('searchInput');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }

    function closeSearchModal() {
      const modal = document.getElementById('searchModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Clear search
      document.getElementById('searchInput').value = '';
      document.getElementById('searchResults').innerHTML = '';
    }

    function performSearch() {
      const query = this.value.toLowerCase().trim();
      const resultsContainer = document.getElementById('searchResults');
      
      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
      }
      
      const results = lessonData.filter(lesson => {
        return lesson.title.toLowerCase().includes(query) ||
               lesson.keywords.some(keyword => keyword.toLowerCase().includes(query));
      });
      
      resultsContainer.innerHTML = '';
      
      if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-no-results">لا توجد نتائج مطابقة</div>';
        return;
      }
      
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <h4>${lessonTitles[result.id]}</h4>
          <p>انقر للانتقال إلى الدرس</p>
        `;
        resultItem.onclick = () => {
          closeSearchModal();
          openLesson(result.id, lessonTitles[result.id]);
        };
        resultsContainer.appendChild(resultItem);
      });
    }

    // Lazy Loading
    function initLazyLoad() {
      const lazyElements = document.querySelectorAll('.lazy-load');
      
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyLoadObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      lazyElements.forEach(element => {
        lazyLoadObserver.observe(element);
      });
    }

    // Scroll Animations for Lessons
    function initScrollAnimations() {
      const lessonCards = document.querySelectorAll('.lesson-card');
      
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.1
      });
      
      lessonCards.forEach(card => {
        scrollObserver.observe(card);
      });
    }

    // Ripple Effect
    function addRippleEffect() {
      const buttons = document.querySelectorAll('button, .cta-button, .lesson-button, .footer-nav-btn');
      
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    }

    // Lesson Functions
    function openLesson(lessonId, lessonTitle) {
      const modal = document.getElementById('lessonModal');
      const modalTitle = document.getElementById('lessonModalTitle');
      const contentBody = document.getElementById('lessonContentBody');
      
      // Show loading with progress
      showLoadingWithProgress();
      
      // Set current lesson and start time
      currentLesson = lessonId;
      lessonStartTime = Date.now();
      
      // Show modal
      modal.classList.add('active');
      modalTitle.textContent = lessonTitle;
      document.body.style.overflow = 'hidden';
      
      // Update navigation buttons
      updateLessonNavigation();
      
      // Show loading in content
      contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div><div class="lesson-content-loading"><div class="loading-spinner"></div><p>جاري تحميل الدرس...</p></div>';
      
      // Load lesson if not already loaded
      if (!loadedLessons.has(lessonId)) {
        loadLesson(lessonId);
      } else {
        // Show cached content
        const cachedContent = sessionStorage.getItem(`lesson_${lessonId}`);
        if (cachedContent) {
          contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div>' + cachedContent;
          hideLoading();
        } else {
          loadLesson(lessonId);
        }
      }
    }

    function loadLesson(lessonId) {
      const contentBody = document.getElementById('lessonContentBody');
      const url = lessonUrls[lessonId];
      
      if (!url) {
        contentBody.innerHTML = '<div class="lesson-content-error"><p>عذراً، لم يتم العثور على الدرس</p></div>';
        hideLoading();
        return;
      }

      // Fetch lesson content
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract body content from HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const bodyContent = doc.body ? doc.body.innerHTML : html;
          
          // Process content to ensure it works properly
          const processedContent = processContent(bodyContent);
          
          contentBody.innerHTML = '<div class="swipe-indicator left"><i class="fas fa-chevron-left"></i></div><div class="swipe-indicator right"><i class="fas fa-chevron-right"></i></div><div class="lesson-loaded">' + processedContent + '</div>';
          loadedLessons.add(lessonId);
          
          // Cache content
          try {
            sessionStorage.setItem(`lesson_${lessonId}`, '<div class="lesson-loaded">' + processedContent + '</div>');
          } catch (e) {
            console.warn('Failed to cache lesson content:', e);
          }
          
          hideLoading();
          
          // Start lesson completion timer
          startLessonCompletionTimer();
        })
        .catch(error => {
          console.error('Error loading lesson:', error);
          contentBody.innerHTML = '<div class="lesson-content-error"><p>حدث خطأ في تحميل الدرس. يرجى المحاولة مرة أخرى.</p></div>';
          hideLoading();
        });
    }

    function processContent(html) {
      // Remove any script tags for security
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Remove scripts
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => script.remove());
      
      // Fix relative URLs if any
      const links = tempDiv.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
      
      // Enhance content styling
      const allElements = tempDiv.querySelectorAll('*');
      allElements.forEach(el => {
        // Add RTL support for Arabic content
        if (el.textContent && /[\u0600-\u06FF]/.test(el.textContent)) {
          el.style.direction = 'rtl';
          el.style.textAlign = 'right';
        }
        
        // Enhance typography
        if (el.tagName === 'P' || el.tagName === 'LI') {
          el.style.lineHeight = '1.8';
          el.style.marginBottom = '1rem';
        }
        
        if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
          el.style.marginTop = '1.5rem';
          el.style.marginBottom = '1rem';
          el.style.fontWeight = '700';
        }
      });
      
      return tempDiv.innerHTML;
    }

    function closeLessonModal() {
      const modal = document.getElementById('lessonModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
      currentLesson = null;
      lessonStartTime = null;
    }

    function updateLessonNavigation() {
      const prevBtn = document.querySelector('.lesson-nav-btn.prev');
      const nextBtn = document.querySelector('.lesson-nav-btn.next');
      
      const currentIndex = lessonOrder.indexOf(currentLesson);
      
      // Update previous button
      if (currentIndex > 0) {
        prevBtn.disabled = false;
      } else {
        prevBtn.disabled = true;
      }
      
      // Update next button
      if (currentIndex < lessonOrder.length - 1) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    }

    function navigateLesson(direction) {
      const currentIndex = lessonOrder.indexOf(currentLesson);
      let newIndex;
      
      if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (direction === 'next' && currentIndex < lessonOrder.length - 1) {
        newIndex = currentIndex + 1;
      } else {
        return;
      }
      
      const newLessonId = lessonOrder[newIndex];
      const newLessonTitle = lessonTitles[newLessonId];
      
      // Add transition effect
      const contentBody = document.getElementById('lessonContentBody');
      contentBody.style.opacity = '0';
      contentBody.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
      
      setTimeout(() => {
        openLesson(newLessonId, newLessonTitle);
        contentBody.style.opacity = '1';
        contentBody.style.transform = 'translateX(0)';
      }, 300);
    }

    // Touch swipe support for lesson navigation
    function initLessonSwipe() {
      const contentBody = document.getElementById('lessonContentBody');
      
      contentBody.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      
      contentBody.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (Math.abs(diffX) > 50) {
            contentBody.classList.add('swiping');
          }
        }
      }, { passive: true });
      
      contentBody.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        contentBody.classList.remove('swiping');
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 100) {
            // Swipe left - next lesson
            navigateLesson('next');
          } else if (diffX < -100) {
            // Swipe right - previous lesson
            navigateLesson('prev');
          }
        }
        
        touchStartX = null;
        touchStartY = null;
      }, { passive: true });
    }

    // Initialize swipe when modal opens
    document.getElementById('lessonModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeLessonModal();
      }
    });

    initLessonSwipe();

    function startLessonCompletionTimer() {
      // Show success notification after 30 seconds
      setTimeout(() => {
        if (currentLesson && lessonStartTime) {
          const timeSpent = Date.now() - lessonStartTime;
          if (timeSpent >= 30000) {
            showSuccessNotification();
          }
        }
      }, 30000);
    }

    // About Page Functions
    function showAboutPage(event) {
      if (event) event.preventDefault();
      
      const aboutModal = document.getElementById('aboutContent');
      const aboutBody = document.getElementById('aboutContentBody');
      
      // Show loading
      showLoadingWithProgress();
      
      // Show modal
      aboutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Show loading in content
      aboutBody.innerHTML = '<div class="lesson-content-loading"><div class="loading-spinner"></div><p>جاري التحميل...</p></div>';
      
      // Check cache first
      const cachedAbout = sessionStorage.getItem('about_content');
      if (cachedAbout) {
        aboutBody.innerHTML = cachedAbout;
        hideLoading();
        return;
      }
      
      // Fetch about content
      fetch(aboutUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract body content from HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const bodyContent = doc.body ? doc.body.innerHTML : html;
          
          // Process content
          const processedContent = processContent(bodyContent);
          
          aboutBody.innerHTML = processedContent;
          
          // Cache content
          try {
            sessionStorage.setItem('about_content', processedContent);
          } catch (e) {
            console.warn('Failed to cache about content:', e);
          }
          
          hideLoading();
        })
        .catch(error => {
          console.error('Error loading about page:', error);
          aboutBody.innerHTML = '<div class="lesson-content-error"><p>حدث خطأ في التحميل. يرجى المحاولة مرة أخرى.</p></div>';
          hideLoading();
        });
    }

    function closeAboutModal() {
      const aboutModal = document.getElementById('aboutContent');
      aboutModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close modals when clicking outside
    document.getElementById('aboutContent').addEventListener('click', function(e) {
      if (e.target === this) {
        closeAboutModal();
      }
    });

    // Close search modal when clicking outside
    document.getElementById('searchModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeSearchModal();
      }
    });

    // Success Notification
    function showSuccessNotification() {
      const notification = document.getElementById('successNotification');
      notification.classList.add('show');
      
      // Play success sound if available
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        audio.volume = 0.3;
        audio.play();
      } catch (e) {
        // Ignore audio errors
      }
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 5000);
    }

    // Loading Functions
    function showLoading() {
      document.getElementById('loadingOverlay').classList.add('active');
    }

    function hideLoading() {
      document.getElementById('loadingOverlay').classList.remove('active');
      document.getElementById('progressBar').classList.remove('active');
    }

    function showLoadingWithProgress() {
      showLoading();
      const progressBar = document.getElementById('progressBar');
      const progressFill = document.getElementById('progressBarFill');
      
      progressBar.classList.add('active');
      progressFill.style.width = '0%';
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) {
          progress = 90;
          clearInterval(interval);
        }
        progressFill.style.width = progress + '%';
      }, 200);
    }

    // Back to Top Functions
    function initScrollListener() {
      const backToTop = document.getElementById('backToTop');
      const header = document.getElementById('mainHeader');
      let scrollTimeout;
      let lastScroll = 0;
      
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        const currentScroll = window.pageYOffset;
        
        // Header scroll effect
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Back to top button
        scrollTimeout = setTimeout(() => {
          if (currentScroll > 300) {
            backToTop.classList.add('show');
          } else {
            backToTop.classList.remove('show');
          }
        }, 100);
        
        lastScroll = currentScroll;
      }, { passive: true });
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Keyboard Support
    function addKeyboardSupport() {
      // ESC key to close modals
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const lessonModal = document.getElementById('lessonModal');
          const aboutModal = document.getElementById('aboutContent');
          const searchModal = document.getElementById('searchModal');
          
          if (lessonModal.classList.contains('active')) {
            closeLessonModal();
          }
          if (aboutModal.classList.contains('active')) {
            closeAboutModal();
          }
          if (searchModal.classList.contains('active')) {
            closeSearchModal();
          }
        }
        
        // Arrow keys for lesson navigation
        if (currentLesson && e.key === 'ArrowLeft') {
          navigateLesson('next');
        } else if (currentLesson && e.key === 'ArrowRight') {
          navigateLesson('prev');
        }
      });

      // Enter key for lesson cards
      document.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });
    }

    // Touch Events
    function initTouchEvents() {
      // Add touch feedback
      document.querySelectorAll('button, a, .lesson-card').forEach(element => {
        element.addEventListener('touchstart', function() {
          this.style.opacity = '0.7';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
          this.style.opacity = '';
        }, { passive: true });
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          showLoadingWithProgress();
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            hideLoading();
            
            // Close mobile menu if open
            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('active')) {
              toggleMobileMenu();
            }
          }, 300);
        }
      });
    });

    // Performance optimizations
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Service Worker Registration (for better performance)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, app will still work
        });
      });
    }
    //]]>