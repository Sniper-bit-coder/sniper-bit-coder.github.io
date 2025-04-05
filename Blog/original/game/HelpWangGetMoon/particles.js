// 赛博朋克粒子系统配置
const particlesConfig = {
    particles: {
        number: { 
            value: 80,
            density: { 
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#00f7ff", "#ff00ff", "#9600ff"]
        },
        shape: {
            type: ["circle", "triangle"],
            stroke: {
                width: 1,
                color: "#ffffff"
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00ffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    }
};

// 初始化粒子系统
function initParticles() {
    particlesJS('particles-js', particlesConfig, function() {
        console.log('粒子系统初始化完成');
    });
}

// 添加防抖调整函数
function debounceResize() {
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            initParticles();
        }, 250);
    });
}

// 启动粒子系统
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    debounceResize();
});