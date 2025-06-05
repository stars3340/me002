document.addEventListener('DOMContentLoaded', () => {
    // 响应式导航栏菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // 如果是移动端，点击链接后关闭菜单
                if (navUl && navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // 英雄区域打字机效果
    const heroSubtitle = document.querySelector('#hero .subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const textToType = "专注于 " + originalText.replace("专注于", "").trim(); 
        let i = 0;
        heroSubtitle.textContent = '专注于 '; // 清空并设置前缀
        const typingSpeed = 100; // 打字速度 (ms)

        function typeWriter() {
            if (i < textToType.replace("专注于 ", "").length) {
                heroSubtitle.textContent += textToType.charAt(i + "专注于 ".length);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        // 延迟启动打字效果，让页面先加载内容
        setTimeout(typeWriter, 500);
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
}); 