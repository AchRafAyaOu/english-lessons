document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const footerNav = document.querySelectorAll('.footer-nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const breadcrumb = document.getElementById('breadcrumb');

    function switchSection(sectionId) {
        navItems.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);
        
        if (targetNav) targetNav.classList.add('active');
        if (targetSection) targetSection.classList.add('active');
        
        updateBreadcrumb(sectionId);
    }

    function updateBreadcrumb(sectionId) {
        const sectionNames = {
            'about': 'من أنا',
            'privacy': 'سياسة الخصوصية',
            'contact': 'اتصل بنا'
        };
        
        breadcrumb.innerHTML = `<span>${sectionNames[sectionId] || 'من أنا'}</span>`;
    }

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    footerNav.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    const form = document.querySelector('.message-form');
    if (form) {
        const nameInput = form.querySelector('input[placeholder="الاسم الكامل"]');
        const emailInput = form.querySelector('input[placeholder="البريد الإلكتروني"]');
        const messageInput = form.querySelector('textarea');
        const submitBtn = form.querySelector('.submit-btn');

        const telegramBotToken = '7644456641:AAG8cy4ExrkP4x8fX6HLbl6KS3SMCKmBoqA';
        const telegramChatId = '1719616821';

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            const originalText = submitBtn.innerHTML;

            if (!name || name.length < 2) {
                alert('يرجى إدخال اسم صحيح (على الأقل حرفين).');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح.');
                return;
            }

            if (!message || message.length < 10) {
                alert('يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل.');
                return;
            }

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;

            const telegramMessage = `📩 رسالة جديدة من نموذج الموقع:\n\nتم إرسال الرسالة من موقع Acadmic,en \n\n👤 الاسم: ${name}\n📧 البريد: ${email}\n💬 الرسالة:\n${message}`;
            const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

            try {
                const response = await fetch(telegramUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: telegramMessage,
                    }),
                });

                const result = await response.json();
                if (result.ok) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
                    submitBtn.style.background = '#28a745';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '#2b4a8c';
                        form.reset();
                    }, 2000);
                } else {
                    alert('❌ فشل في إرسال الرسالة. تحقق من الإعدادات.');
                    console.error(result);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '#2b4a8c';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('حدث خطأ أثناء الإرسال.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '#2b4a8c';
            }
        });
    }

    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));

    const accordionItems = document.querySelectorAll('.accordion-item');

    document.addEventListener('click', function(event) {
        const header = event.target.closest('.accordion-header');
        if (header) {
            const item = header.parentElement;
            const icon = header.querySelector('.accordion-icon');

            accordionItems.forEach(openItem => {
                if (openItem !== item && openItem.classList.contains('open')) {
                    openItem.classList.remove('open', 'active');
                    const openIcon = openItem.querySelector('.accordion-icon');
                    if (openIcon) openIcon.style.transform = 'rotate(0deg)';
                }
            });

            const isOpen = item.classList.toggle('open');
            item.classList.toggle('active', isOpen);
            if (icon) {
                icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }
    });

    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTop.style.opacity = '1';
                scrollToTop.style.visibility = 'visible';
            } else {
                scrollToTop.style.opacity = '0';
                scrollToTop.style.visibility = 'hidden';
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const loader = document.querySelector('.loader');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // منع السلوك الافتراضي

      // إزالة الكلاس active من جميع العناصر
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));

      // إضافة active للعنصر الحالي
      item.classList.add('active');

      // الحصول على القسم المستهدف
      const targetId = item.getAttribute('data-target'); // افترض أن لديك data-target في nav-item
      const targetSection = document.querySelector(targetId);

      // إظهار دائرة التحميل
      loader.classList.add('active');
      document.body.classList.add('loading');

      // محاكاة تأخير التحميل (يمكن استبداله بمنطق تحميل فعلي)
      setTimeout(() => {
        // إخفاء الدائرة
        loader.classList.remove('active');
        document.body.classList.remove('loading');

        // إظهار القسم المستهدف
        targetSection.classList.add('active');

        // التمرير السلس إلى القسم
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }, 800); // تأخير 0.8 ثانية لمحاكاة التحميل
    });
  });
});