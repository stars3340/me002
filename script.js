document.addEventListener('DOMContentLoaded', () => {
    // 响应式导航栏菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 平滑滚动到锚点 & 关闭移动端菜单 & 更新激活链接
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // 如果是移动端，点击链接后关闭菜单
            if (navUl && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 英雄区域打字机效果
    const heroSubtitle = document.querySelector('#hero .subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const skillsToType = originalText.replace("专注于", "").trim(); 
        heroSubtitle.innerHTML = '专注于 <span class="typed-text"></span>'; // 使用span进行打字
        const typedTextSpan = heroSubtitle.querySelector('.typed-text');
        let i = 0;
        const typingSpeed = 100; 

        function typeWriter() {
            if (i < skillsToType.length) {
                typedTextSpan.textContent += skillsToType.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        setTimeout(typeWriter, 1200); // 配合hero区域其他动画延迟启动
    }
    
    // 联系表单提交 (仅作示例，实际需要后端处理)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 在这里可以添加发送邮件的逻辑，或者显示一个成功消息
            alert('消息已发送！(这只是一个前端演示)');
            contactForm.reset();
        });
    }

    // Intersection Observer 用于元素滚动进入视区动画
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // 默认视口
        rootMargin: '0px',
        threshold: 0.1 // 10% 可见时触发
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 可选: 动画执行一次后停止观察，如果不需要重复动画
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Intersection Observer 用于导航链接激活状态
    const navObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -60% 0px', // 调整触发区域，当区段在屏幕中间部分时激活
        threshold: 0 // 只要有部分可见即开始计算，但rootMargin更关键
    };

    const highlightNavLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active-link');
            }
        });
    };

    const navSectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                highlightNavLink(entry.target.id);
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        if(section.id) { //确保section有id才观察
             navSectionObserver.observe(section);
        }
    });

}); 