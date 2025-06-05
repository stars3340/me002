/* =====================================
   CYBER GEEK PORTFOLIO - JavaScript
   高级动画和交互系统
   ===================================== */

class CyberPortfolio {
    constructor() {
        this.mouseTrails = [];
        this.mousePosition = { x: 0, y: 0 };
        this.init();
        this.setupEventListeners();
        this.startAnimations();
    }

    init() {
        console.log('🚀 Initializing Cyber Portfolio...');
        this.initializeLoading();
        this.initializeParticles();
        this.initializeMatrix();
        this.initializeThreeJS();
        this.initializeGSAP();
        this.initializeAOS();
        this.initializeTyped();
        this.initializeSkillsChart();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.initializeMouseTrails();
    }

    /* =====================================
       加载屏幕系统
       ===================================== */
    initializeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress-bar');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.startMainAnimations();
                    }, 500);
                }, 1000);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }

    /* =====================================
       粒子背景系统
       ===================================== */
    initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: { enable: true, value_area: 800 }
                    },
                    color: { value: ['#00ffff', '#ff0080', '#39ff14'] },
                    shape: {
                        type: 'circle',
                        stroke: { width: 0, color: '#000000' }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: true, speed: 4, size_min: 0.1, sync: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00ffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 400, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }

    /* =====================================
       矩阵代码雨效果
       ===================================== */
    initializeMatrix() {
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 10;
        const columns = canvas.width / fontSize;

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px "Fira Code", monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 35);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    /* =====================================
       Three.js 3D背景效果
       ===================================== */
    initializeThreeJS() {
        if (typeof THREE !== 'undefined') {
            const container = document.getElementById('three-container');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            // 创建几何体
            const geometries = [];
            const materials = [];

            // 创建多个几何体
            for (let i = 0; i < 50; i++) {
                const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
                const material = new THREE.MeshBasicMaterial({
                    color: Math.random() < 0.5 ? 0x00ffff : 0xff0080,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (Math.random() - 0.5) * 20;
                mesh.position.y = (Math.random() - 0.5) * 20;
                mesh.position.z = (Math.random() - 0.5) * 20;
                
                scene.add(mesh);
                geometries.push(mesh);
            }

            camera.position.z = 10;

            const animate = () => {
                requestAnimationFrame(animate);

                geometries.forEach((mesh, index) => {
                    mesh.rotation.x += 0.01;
                    mesh.rotation.y += 0.01;
                    mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
                });

                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }

    /* =====================================
       GSAP动画系统
       ===================================== */
    initializeGSAP() {
        if (typeof gsap !== 'undefined') {
            // 注册ScrollTrigger插件
            gsap.registerPlugin(ScrollTrigger);

            // 设置默认动画
            gsap.defaults({
                duration: 1,
                ease: "power2.out"
            });

            // 导航栏动画
            gsap.from('.cyber-nav', {
                y: -100,
                opacity: 0,
                duration: 1,
                delay: 3.5
            });
        }
    }

    /* =====================================
       AOS (Animate On Scroll) 初始化
       ===================================== */
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1200,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }
    }

    /* =====================================
       打字机效果
       ===================================== */
    initializeTyped() {
        if (typeof Typed !== 'undefined') {
            setTimeout(() => {
                new Typed('#typed-output', {
                    strings: [
                        'Building the future with innovative code...',
                        'Transforming ideas into scalable solutions...',
                        'Crafting digital experiences that matter...',
                        '构建未来，用代码改变世界...'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: false
                });
            }, 4000);
        }
    }

    /* =====================================
       技能雷达图
       ===================================== */
    initializeSkillsChart() {
        const canvas = document.getElementById('skills-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        const skills = [
            { name: 'Frontend', value: 95 },
            { name: 'Backend', value: 90 },
            { name: 'DevOps', value: 85 },
            { name: 'Mobile', value: 80 },
            { name: 'AI/ML', value: 75 },
            { name: 'Design', value: 70 }
        ];

        const drawRadarChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制背景网格
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
                ctx.stroke();
            }

            // 绘制轴线
            const angleStep = (2 * Math.PI) / skills.length;
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();

                // 绘制标签
                ctx.fillStyle = '#00ffff';
                ctx.font = '12px "Fira Code"';
                ctx.textAlign = 'center';
                const labelX = centerX + Math.cos(angle) * (radius + 15);
                const labelY = centerY + Math.sin(angle) * (radius + 15);
                ctx.fillText(skills[i].name, labelX, labelY);
            }

            // 绘制技能数据
            ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.beginPath();

            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const value = (skills[i].value / 100) * radius;
                const x = centerX + Math.cos(angle) * value;
                const y = centerY + Math.sin(angle) * value;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 绘制数据点
            for (let i = 0; i < skills.length; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const value = (skills[i].value / 100) * radius;
                const x = centerX + Math.cos(angle) * value;
                const y = centerY + Math.sin(angle) * value;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = '#ff0080';
                ctx.fill();
            }
        };

        // 延迟绘制以等待AOS动画
        setTimeout(() => {
            drawRadarChart();
        }, 1000);
    }

    /* =====================================
       滚动动画系统
       ===================================== */
    setupScrollAnimations() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // 技能进度条动画
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const skillItem = bar.parentElement.parentElement;
                const level = skillItem.getAttribute('data-level');
                
                gsap.to(bar, {
                    width: level + '%',
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: skillItem,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // 项目卡片动画
            const projectCards = document.querySelectorAll('.cyber-project');
            projectCards.forEach((card, index) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // 统计数字动画
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 80%'
                    },
                    onUpdate: function() {
                        const currentValue = Math.round(this.targets()[0].textContent);
                        if (finalValue.includes('+')) {
                            stat.textContent = currentValue + '+';
                        } else if (finalValue.includes('M')) {
                            stat.textContent = currentValue + 'M+';
                        } else if (finalValue.includes('K')) {
                            stat.textContent = currentValue + 'K+';
                        } else {
                            stat.textContent = currentValue;
                        }
                    }
                });
            });
        }
    }

    /* =====================================
       导航系统
       ===================================== */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.cyber-section, .cyber-hero');
        const burger = document.querySelector('.cyber-burger');
        const navMenu = document.querySelector('.nav-menu');

        // 平滑滚动
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // 导航高亮
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = '#' + entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // 移动端菜单
        if (burger) {
            burger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                burger.classList.toggle('active');
            });
        }
    }

    /* =====================================
       主要动画启动
       ===================================== */
    startMainAnimations() {
        if (typeof gsap !== 'undefined') {
            // Hero区域动画序列
            const tl = gsap.timeline();
            
            tl.from('.terminal-window', {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)'
            })
            .from('.avatar-frame', {
                scale: 0,
                rotation: 180,
                duration: 1,
                ease: 'back.out(1.7)'
            }, '-=0.5')
            .from('.status-item', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2
            }, '-=0.3')
            .from('.floating-data > *', {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'back.out(1.7)'
            }, '-=0.5');
        }
    }

    /* =====================================
       事件监听器设置
       ===================================== */
    setupEventListeners() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        window.addEventListener('resize', this.handleResize.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // 添加滚动检测
        this.setupScrollDetection();
        // 添加磁性效果
        this.setupMagneticElements();
        // 添加特殊区域拖尾效果
        this.setupSpecialTrailZones();
    }

    /* =====================================
       滚动检测和智能拖尾系统
       ===================================== */
    setupScrollDetection() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // 添加滚动状态类
            document.body.classList.add('scrolling');
            
            // 清除之前的超时
            clearTimeout(scrollTimeout);
            
            // 设置新的超时来移除滚动状态
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
            
            // 在滚动时增强拖尾效果
            this.enhanceTrailsOnScroll();
        });
    }

    enhanceTrailsOnScroll() {
        // 临时增加粒子生成频率
        if (this.particles) {
            this.particles.forEach(particle => {
                if (particle.age > 0) {
                    particle.age = Math.max(particle.age, 30); // 延长生命周期
                }
            });
        }
    }

    /* =====================================
       磁性效果系统
       ===================================== */
    setupMagneticElements() {
        // 为可交互元素添加磁性效果
        const magneticElements = document.querySelectorAll(
            '.nav-link, .action-btn, .submit-btn, .cyber-project'
        );
        
        magneticElements.forEach(element => {
            element.classList.add('magnetic-element');
            
            element.addEventListener('mouseenter', (e) => {
                this.activateMagneticEffect(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.deactivateMagneticEffect(e.target);
            });
            
            element.addEventListener('mousemove', (e) => {
                this.updateMagneticEffect(e);
            });
        });
    }

    activateMagneticEffect(element) {
        // 增强该元素附近的拖尾效果
        element.dataset.magneticActive = 'true';
        
        // 改变拖尾颜色和强度
        if (this.particles) {
            this.magneticZoneActive = true;
            this.magneticElement = element;
        }
    }

    deactivateMagneticEffect(element) {
        element.dataset.magneticActive = 'false';
        this.magneticZoneActive = false;
        this.magneticElement = null;
        
        // 重置元素位置
        element.style.transform = '';
    }

    updateMagneticEffect(e) {
        const element = e.target;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 100; // 最大影响距离
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance * 0.3;
            const moveX = deltaX * strength;
            const moveY = deltaY * strength;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.1})`;
            
            // 在磁性区域创建特殊拖尾
            this.createMagneticTrail(e.clientX, e.clientY, strength);
        }
    }

    createMagneticTrail(x, y, strength) {
        if (!this.magneticTrails) {
            this.magneticTrails = [];
            // 创建磁性拖尾元素
            for (let i = 0; i < 10; i++) {
                const trail = document.createElement('div');
                trail.className = 'magnetic-trail';
                trail.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #ff6600, transparent);
                    border-radius: 50%;
                    opacity: 0;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    box-shadow: 0 0 15px #ff6600;
                `;
                document.getElementById('mouse-trail-container').appendChild(trail);
                this.magneticTrails.push({
                    element: trail,
                    x: 0,
                    y: 0,
                    age: 0,
                    maxAge: 40
                });
            }
        }
        
        // 激活一个磁性拖尾
        const availableTrail = this.magneticTrails.find(trail => trail.age <= 0);
        if (availableTrail) {
            availableTrail.x = x + (Math.random() - 0.5) * 20;
            availableTrail.y = y + (Math.random() - 0.5) * 20;
            availableTrail.age = availableTrail.maxAge;
            
            // 根据磁性强度调整大小和颜色
            const scale = 0.5 + strength;
            const intensity = strength * 2;
            availableTrail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
            availableTrail.element.style.opacity = intensity;
        }
    }

    /* =====================================
       特殊区域拖尾效果
       ===================================== */
    setupSpecialTrailZones() {
        // 为特定区域添加特殊拖尾效果
        const specialZones = document.querySelectorAll(
            '.cyber-hero, .skills-radar, .terminal-window'
        );
        
        specialZones.forEach(zone => {
            zone.classList.add('special-trail-zone');
            
            zone.addEventListener('mouseenter', () => {
                this.activateSpecialTrailZone(zone);
            });
            
            zone.addEventListener('mouseleave', () => {
                this.deactivateSpecialTrailZone(zone);
            });
        });
    }

    activateSpecialTrailZone(zone) {
        this.specialZoneActive = true;
        this.currentSpecialZone = zone;
        
        // 根据区域类型改变拖尾效果
        if (zone.classList.contains('cyber-hero')) {
            this.currentTrailMode = 'hero';
        } else if (zone.classList.contains('skills-radar')) {
            this.currentTrailMode = 'radar';
        } else if (zone.classList.contains('terminal-window')) {
            this.currentTrailMode = 'terminal';
        }
    }

    deactivateSpecialTrailZone(zone) {
        this.specialZoneActive = false;
        this.currentSpecialZone = null;
        this.currentTrailMode = 'default';
    }

    /* =====================================
       工具方法
       ===================================== */
    handleFormSubmit(e) {
        e.preventDefault();
        
        // 表单验证和提交逻辑
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // 显示成功消息
        this.showNotification('消息发送成功！我会尽快回复您。', 'success');
        
        // 重置表单
        e.target.reset();
    }

    handleResize() {
        // 处理窗口大小变化
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    handleMouseMove(e) {
        // 鼠标跟随效果
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    }

    showNotification(message, type = 'info') {
        // 创建通知
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /* =====================================
       动画启动
       ===================================== */
    startAnimations() {
        // 启动所有动画系统
        console.log('🎨 Starting all animation systems...');
        
        // 添加自定义光标
        this.createCustomCursor();
        
        // 添加故障效果
        this.addGlitchEffects();
        
        // 添加扫描线效果
        this.addScanlineEffects();
    }

    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);
        
        // CSS for custom cursor
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            
            .cursor-dot {
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
            }
            
            .cursor-ring {
                width: 20px;
                height: 20px;
                border: 1px solid #00ffff;
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                opacity: 0.5;
                transition: all 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }

    addGlitchEffects() {
        // 为特定元素添加故障效果
        const glitchElements = document.querySelectorAll('.logo-text, .cyber-title .title-text');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'glitch 0.3s ease-in-out';
            });
            
            element.addEventListener('animationend', () => {
                element.style.animation = '';
            });
        });
    }

    addScanlineEffects() {
        // 添加扫描线效果到特定容器
        const containers = document.querySelectorAll('.profile-card, .cyber-project');
        
        containers.forEach(container => {
            const scanline = document.createElement('div');
            scanline.className = 'scanline-effect';
            container.appendChild(scanline);
        });
        
        // CSS for scanlines
        const style = document.createElement('style');
        style.textContent = `
            .scanline-effect {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ffff, transparent);
                opacity: 0;
                animation: scanLine 2s linear infinite;
            }
            
            .profile-card:hover .scanline-effect,
            .cyber-project:hover .scanline-effect {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    /* =====================================
       高级鼠标拖尾效果系统
       ===================================== */
    initializeMouseTrails() {
        // 创建拖尾容器
        const trailContainer = document.createElement('div');
        trailContainer.id = 'mouse-trail-container';
        trailContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        `;
        document.body.appendChild(trailContainer);

        // 初始化不同类型的拖尾效果
        this.initParticleTrail();
        this.initNeonTrail();
        this.initGeometricTrail();
        this.initDataStreamTrail();
        this.initRippleEffect();
        
        // 启动拖尾动画循环
        this.startTrailAnimation();
    }

    // 粒子拖尾效果
    initParticleTrail() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'trail-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #00ffff, transparent);
                border-radius: 50%;
                opacity: 0;
                transform: translate(-50%, -50%);
                pointer-events: none;
                box-shadow: 0 0 10px #00ffff;
            `;
            document.getElementById('mouse-trail-container').appendChild(particle);
            this.particles.push({
                element: particle,
                x: 0,
                y: 0,
                age: 0,
                maxAge: 60,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                color: this.getRandomCyberColor()
            });
        }
    }

    // 霓虹光线拖尾
    initNeonTrail() {
        this.neonTrails = [];
        for (let i = 0; i < 20; i++) {
            const trail = document.createElement('div');
            trail.className = 'neon-trail';
            trail.style.cssText = `
                position: absolute;
                width: 2px;
                height: 20px;
                background: linear-gradient(90deg, transparent, #ff0080, transparent);
                opacity: 0;
                transform: translate(-50%, -50%);
                pointer-events: none;
                filter: blur(1px);
                box-shadow: 0 0 15px #ff0080;
            `;
            document.getElementById('mouse-trail-container').appendChild(trail);
            this.neonTrails.push({
                element: trail,
                x: 0,
                y: 0,
                age: 0,
                maxAge: 30,
                rotation: Math.random() * 360
            });
        }
    }

    // 几何图案拖尾
    initGeometricTrail() {
        this.geometricShapes = [];
        const shapes = ['▲', '●', '■', '◆', '★'];
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'geometric-trail';
            shape.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            shape.style.cssText = `
                position: absolute;
                font-size: 12px;
                color: #39ff14;
                opacity: 0;
                transform: translate(-50%, -50%);
                pointer-events: none;
                text-shadow: 0 0 10px #39ff14;
                font-family: 'Orbitron', monospace;
            `;
            document.getElementById('mouse-trail-container').appendChild(shape);
            this.geometricShapes.push({
                element: shape,
                x: 0,
                y: 0,
                age: 0,
                maxAge: 45,
                scale: 1,
                rotation: 0
            });
        }
    }

    // 数据流拖尾
    initDataStreamTrail() {
        this.dataStreams = [];
        const dataChars = ['0', '1', 'A', 'B', 'C', 'F', 'X', 'Y', 'Z'];
        
        for (let i = 0; i < 25; i++) {
            const data = document.createElement('div');
            data.className = 'data-stream-trail';
            data.innerHTML = dataChars[Math.floor(Math.random() * dataChars.length)];
            data.style.cssText = `
                position: absolute;
                font-size: 10px;
                color: #b300ff;
                opacity: 0;
                transform: translate(-50%, -50%);
                pointer-events: none;
                font-family: 'Fira Code', monospace;
                text-shadow: 0 0 8px #b300ff;
            `;
            document.getElementById('mouse-trail-container').appendChild(data);
            this.dataStreams.push({
                element: data,
                x: 0,
                y: 0,
                age: 0,
                maxAge: 40,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3
            });
        }
    }

    // 波纹扩散效果
    initRippleEffect() {
        this.ripples = [];
        for (let i = 0; i < 5; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                border: 2px solid #00ffff;
                border-radius: 50%;
                opacity: 0;
                transform: translate(-50%, -50%);
                pointer-events: none;
                box-shadow: 0 0 20px #00ffff;
            `;
            document.getElementById('mouse-trail-container').appendChild(ripple);
            this.ripples.push({
                element: ripple,
                x: 0,
                y: 0,
                age: 0,
                maxAge: 60,
                size: 0,
                maxSize: 100
            });
        }
    }

    // 获取随机赛博朋克颜色
    getRandomCyberColor() {
        const colors = ['#00ffff', '#ff0080', '#39ff14', '#b300ff', '#ff6600'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 启动拖尾动画循环
    startTrailAnimation() {
        let particleIndex = 0;
        let neonIndex = 0;
        let geometricIndex = 0;
        let dataIndex = 0;
        let rippleIndex = 0;

        const animateTrails = () => {
            // 更新粒子拖尾
            this.particles.forEach((particle, index) => {
                if (particle.age > 0) {
                    particle.age--;
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    const opacity = particle.age / particle.maxAge;
                    const scale = opacity;
                    
                    particle.element.style.left = particle.x + 'px';
                    particle.element.style.top = particle.y + 'px';
                    particle.element.style.opacity = opacity;
                    particle.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
                    particle.element.style.background = `radial-gradient(circle, ${particle.color}, transparent)`;
                    particle.element.style.boxShadow = `0 0 ${10 * opacity}px ${particle.color}`;
                }
            });

            // 更新霓虹拖尾
            this.neonTrails.forEach(trail => {
                if (trail.age > 0) {
                    trail.age--;
                    trail.rotation += 5;
                    
                    const opacity = trail.age / trail.maxAge;
                    
                    trail.element.style.left = trail.x + 'px';
                    trail.element.style.top = trail.y + 'px';
                    trail.element.style.opacity = opacity;
                    trail.element.style.transform = `translate(-50%, -50%) rotate(${trail.rotation}deg)`;
                }
            });

            // 更新几何图案拖尾
            this.geometricShapes.forEach(shape => {
                if (shape.age > 0) {
                    shape.age--;
                    shape.rotation += 3;
                    shape.scale = (shape.age / shape.maxAge) * 1.5;
                    
                    const opacity = shape.age / shape.maxAge;
                    
                    shape.element.style.left = shape.x + 'px';
                    shape.element.style.top = shape.y + 'px';
                    shape.element.style.opacity = opacity;
                    shape.element.style.transform = `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(${shape.scale})`;
                }
            });

            // 更新数据流拖尾
            this.dataStreams.forEach(data => {
                if (data.age > 0) {
                    data.age--;
                    data.x += data.vx;
                    data.y += data.vy;
                    
                    const opacity = data.age / data.maxAge;
                    
                    data.element.style.left = data.x + 'px';
                    data.element.style.top = data.y + 'px';
                    data.element.style.opacity = opacity;
                }
            });

            // 更新波纹效果
            this.ripples.forEach(ripple => {
                if (ripple.age > 0) {
                    ripple.age--;
                    ripple.size = ((ripple.maxAge - ripple.age) / ripple.maxAge) * ripple.maxSize;
                    
                    const opacity = ripple.age / ripple.maxAge;
                    
                    ripple.element.style.left = ripple.x + 'px';
                    ripple.element.style.top = ripple.y + 'px';
                    ripple.element.style.width = ripple.size + 'px';
                    ripple.element.style.height = ripple.size + 'px';
                    ripple.element.style.opacity = opacity * 0.6;
                }
            });

            // 更新磁性拖尾
            if (this.magneticTrails) {
                this.magneticTrails.forEach(trail => {
                    if (trail.age > 0) {
                        trail.age--;
                        
                        const opacity = trail.age / trail.maxAge;
                        const scale = opacity * 1.5;
                        
                        trail.element.style.left = trail.x + 'px';
                        trail.element.style.top = trail.y + 'px';
                        trail.element.style.opacity = opacity;
                        trail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
                        
                        // 根据当前模式调整颜色
                        if (this.currentTrailMode === 'hero') {
                            trail.element.style.background = 'radial-gradient(circle, #ff6600, transparent)';
                            trail.element.style.boxShadow = `0 0 ${15 * opacity}px #ff6600`;
                        } else if (this.currentTrailMode === 'radar') {
                            trail.element.style.background = 'radial-gradient(circle, #39ff14, transparent)';
                            trail.element.style.boxShadow = `0 0 ${15 * opacity}px #39ff14`;
                        } else if (this.currentTrailMode === 'terminal') {
                            trail.element.style.background = 'radial-gradient(circle, #b300ff, transparent)';
                            trail.element.style.boxShadow = `0 0 ${15 * opacity}px #b300ff`;
                        }
                    }
                });
            }

            requestAnimationFrame(animateTrails);
        };

        animateTrails();

        // 鼠标移动时创建新的拖尾元素
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;

            // 根据当前模式调整拖尾效果
            let particleColor = this.getRandomCyberColor();
            let particleSize = 4;
            let particleIntensity = 1;

            // 特殊区域模式调整
            if (this.specialZoneActive) {
                switch (this.currentTrailMode) {
                    case 'hero':
                        particleColor = '#ff6600';
                        particleSize = 6;
                        particleIntensity = 1.5;
                        break;
                    case 'radar':
                        particleColor = '#39ff14';
                        particleSize = 3;
                        particleIntensity = 1.2;
                        break;
                    case 'terminal':
                        particleColor = '#b300ff';
                        particleSize = 5;
                        particleIntensity = 1.3;
                        break;
                }
            }

            // 磁性区域调整
            if (this.magneticZoneActive) {
                particleColor = '#ff6600';
                particleIntensity = 2;
            }

            // 创建新粒子
            const particle = this.particles[particleIndex % this.particles.length];
            particle.x = e.clientX + (Math.random() - 0.5) * 10;
            particle.y = e.clientY + (Math.random() - 0.5) * 10;
            particle.age = particle.maxAge;
            particle.vx = (Math.random() - 0.5) * 2 * particleIntensity;
            particle.vy = (Math.random() - 0.5) * 2 * particleIntensity;
            particle.color = particleColor;
            
            // 应用特殊样式
            particle.element.style.width = particleSize + 'px';
            particle.element.style.height = particleSize + 'px';
            particleIndex++;

            // 创建霓虹拖尾（降低频率）
            if (particleIndex % 3 === 0) {
                const neon = this.neonTrails[neonIndex % this.neonTrails.length];
                neon.x = e.clientX;
                neon.y = e.clientY;
                neon.age = neon.maxAge;
                neon.rotation = Math.random() * 360;
                
                // 根据模式调整霓虹拖尾
                if (this.currentTrailMode === 'terminal') {
                    neon.element.style.background = 'linear-gradient(90deg, transparent, #b300ff, transparent)';
                    neon.element.style.boxShadow = '0 0 15px #b300ff';
                } else if (this.currentTrailMode === 'radar') {
                    neon.element.style.background = 'linear-gradient(90deg, transparent, #39ff14, transparent)';
                    neon.element.style.boxShadow = '0 0 15px #39ff14';
                }
                
                neonIndex++;
            }

            // 创建几何图案（降低频率）
            if (particleIndex % 5 === 0) {
                const shape = this.geometricShapes[geometricIndex % this.geometricShapes.length];
                shape.x = e.clientX;
                shape.y = e.clientY;
                shape.age = shape.maxAge;
                shape.rotation = 0;
                shape.scale = 1;
                
                // 根据模式调整几何图案
                if (this.currentTrailMode === 'hero') {
                    shape.element.style.color = '#ff6600';
                    shape.element.style.textShadow = '0 0 10px #ff6600';
                }
                
                geometricIndex++;
            }

            // 创建数据流
            if (particleIndex % 4 === 0) {
                const data = this.dataStreams[dataIndex % this.dataStreams.length];
                data.x = e.clientX;
                data.y = e.clientY;
                data.age = data.maxAge;
                data.vx = (Math.random() - 0.5) * 3;
                data.vy = (Math.random() - 0.5) * 3;
                
                // 在终端模式下增加数据流频率
                if (this.currentTrailMode === 'terminal') {
                    data.age = data.maxAge * 1.5; // 延长生命周期
                }
                
                dataIndex++;
            }
        });

        // 鼠标点击时创建波纹效果
        document.addEventListener('click', (e) => {
            const ripple = this.ripples[rippleIndex % this.ripples.length];
            ripple.x = e.clientX;
            ripple.y = e.clientY;
            ripple.age = ripple.maxAge;
            ripple.size = 0;
            rippleIndex++;
        });
    }
}

/* =====================================
   初始化应用
   ===================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Cyber Portfolio Loading...');
    new CyberPortfolio();
});

/* =====================================
   全局工具函数
   ===================================== */
window.CyberUtils = {
    // 生成随机颜色
    randomCyberColor() {
        const colors = ['#00ffff', '#ff0080', '#39ff14', '#b300ff', '#ff6600'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // 创建霓虹光效
    createNeonGlow(element, color = '#00ffff') {
        element.style.boxShadow = `
            0 0 5px ${color},
            0 0 10px ${color},
            0 0 15px ${color},
            0 0 20px ${color}
        `;
    },
    
    // 移除霓虹光效
    removeNeonGlow(element) {
        element.style.boxShadow = '';
    }
};

/* =====================================
   性能优化
   ===================================== */
// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化的滚动监听
const optimizedScrollHandler = throttle(() => {
    // 滚动相关的操作
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

console.log('🚀 Cyber Portfolio JavaScript Loaded Successfully!'); 