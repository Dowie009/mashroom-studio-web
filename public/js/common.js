// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    // GSAPとScrollTriggerが読み込まれるまで待つ
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        window.addEventListener('load', initCommon);
    } else {
        initCommon();
    }
});

function initCommon() {
    // カーソル機能（PC版のみ）
    const cursor = document.querySelector('.cursor');
    if (cursor && window.innerWidth > 900) {
        const magnets = document.querySelectorAll('.magnet, a, button, .dock-item');
        const coloredSections = document.querySelectorAll('[data-cursor]');

        document.addEventListener('mousemove', (e) => { 
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' }); 
        });
        
        magnets.forEach(magnet => { 
            magnet.addEventListener('mouseenter', () => cursor.classList.add('hovered')); 
            magnet.addEventListener('mouseleave', () => cursor.classList.remove('hovered')); 
        });
        
        coloredSections.forEach(section => {
            section.addEventListener('mouseenter', () => cursor.classList.add('is-colored', section.getAttribute('data-cursor')));
            section.addEventListener('mouseleave', () => cursor.classList.remove('is-colored', section.getAttribute('data-cursor')));
        });
    }

    // ハンバーガーメニュー
    const burger = document.getElementById('hamburger');
    const popSidebar = document.getElementById('pop-sidebar');
    const menuLinks = document.querySelectorAll('.menu-link');
    const menuOverlay = document.getElementById('menu-overlay');

    if (burger && popSidebar && menuOverlay) {
        let isMenuOpen = false;

        // ハンバーガーメニューが色を変えながら転がるアニメーション
        const colors = ["#FF0055", "#CCFF00", "#FF9900", "#9D00FF", "#00FFFF", "#FFFF00"];
        
        // 回転アニメーション（ページの長さに応じて回転量を動的計算）
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const rotations = Math.max(1, Math.round(maxScroll / 1700));
        gsap.to(burger, {
            rotation: 360 * rotations,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
        
        // 色変更アニメーション
        ScrollTrigger.create({
            trigger: "body", start: "top top", end: "bottom bottom",
            onUpdate: (self) => {
                const index = Math.floor(self.progress * colors.length) % colors.length;
                burger.style.borderColor = colors[index];
            }
        });

        // Combined Menu Open/Close Logic
        const toggleMenu = () => {
            if (!isMenuOpen) {
                // OPEN
                isMenuOpen = true; 
                burger.classList.add('is-active');
                menuOverlay.classList.add('is-active');
                gsap.to(popSidebar, { x: 0, skewX: 0, duration: 0.6, ease: "back.out(0.8)" });
                gsap.fromTo(menuLinks, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" });
            } else {
                // CLOSE
                isMenuOpen = false; 
                burger.classList.remove('is-active');
                menuOverlay.classList.remove('is-active');
                gsap.to(popSidebar, { x: "120%", skewX: -5, duration: 0.5, ease: "power2.in" });
            }
        };

        burger.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
    }
}

