document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const footerNav = document.querySelectorAll('.footer-nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const breadcrumb = document.getElementById('breadcrumb');
    const loader = document.querySelector('.loader');
    const scrollToTop = document.querySelector('.scroll-to-top');
    const form = document.querySelector('.message-form');
    const accordionItems = document.querySelectorAll('.accordion-item');

    const switchSection = (sectionId) => {
        navItems.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);

        if (targetNav) targetNav.classList.add('active');
        if (targetSection) targetSection.classList.add('active');

        updateBreadcrumb(sectionId);

        loader.classList.add('active');
        document.body.classList.add('loading');

        setTimeout(() => {
            loader.classList.remove('active');
            document.body.classList.remove('loading');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 600);
    };

    const updateBreadcrumb = (sectionId) => {
        const sectionNames = {
            'about': 'من أنا',
            'privacy': 'سياسة الخصوصية',
            'contact': 'اتصل بنا'
        };
        breadcrumb.innerHTML = `<span>${sectionNames[sectionId] || 'من أنا'}</span>`;
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    footerNav.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    if (form) {
        const nameInput = form.querySelector('input[placeholder="الاسم الكامل"]');
        const emailInput = form.querySelector('input[placeholder="البريد الإلكتروني"]');
        const messageInput = form.querySelector('textarea');
        const submitBtn = form.querySelector('.submit-btn');

        const telegramBotToken = '7644456641:AAG8cy4ExrkP4x8fX6HLbl6KS3SMCKmBoqA';
        const telegramChatId = '1719616821';

        form.addEventListener('submit', async (e) => {
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

            const telegramMessage = `📩 رسالة جديدة:\n\nمن موقع Acadmic,en\n\n👤 الاسم: ${name}\n📧 البريد: ${email}\n💬 الرسالة:\n${message}`;
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
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
                    submitBtn.style.background = 'var(--primary-600)';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 1500);
                } else {
                    alert('❌ فشل الإرسال. تحقق من الإعدادات.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('حدث خطأ أثناء الإرسال.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }
        });
    }

    if (accordionItems.length) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');

            if (header && content) {
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = content.classList.contains('open');

                    // Close all other accordion items
                    accordionItems.forEach(otherItem => {
                        const otherContent = otherItem.querySelector('.accordion-content');
                        const otherIcon = otherItem.querySelector('.accordion-icon');
                        if (otherItem !== item && otherContent.classList.contains('open')) {
                            otherContent.classList.remove('open');
                            otherItem.classList.remove('active');
                            if (otherIcon) otherIcon.classList.remove('open');
                        }
                    });

                    // Toggle the clicked accordion item
                    content.classList.toggle('open', !isOpen);
                    item.classList.toggle('active', !isOpen);
                    if (icon) {
                        icon.classList.toggle('open', !isOpen);
                    }
                });
            }
        });
    }

    if (scrollToTop) {
        const handleScroll = () => {
            scrollToTop.classList.toggle('show', window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        scrollToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
});
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferredTheme") || "blue";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Set initial icon based on saved theme
  const themeIcon = document.querySelector("#themeToggle i");
  themeIcon.className = savedTheme === "blue" ? "fas fa-moon" : "fas fa-sun";
});


document.getElementById("themeToggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("preferredTheme", newTheme);
  const themeIcon = document.querySelector("#themeToggle i");
  themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferredTheme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const themeIcon = document.querySelector("#themeToggle i");
  themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
});