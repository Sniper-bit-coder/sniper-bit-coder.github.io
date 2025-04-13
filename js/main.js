// 持久化粒子实例
let particlesInstance = null;

// ====================== 粒子系统配置 ======================
const particleConfig = {
    particles: {
        number: { 
            value: 120,  // 适当的粒子数量
            density: { 
                enable: true,
                value_area: 800
            }
        },
        color: { 
            value: ["#0ff", "#f0f", "#00ff00", "#ff00ff", "#9600ff"]
        },
        shape: { 
            type: ["circle", "triangle", "edge"],
            stroke: {
                width: 1,
                color: "#ffffff"
            },
            polygon: {
                nb_sides: 5
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
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: { 
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// ====================== 全息文字库 ======================
const cyberTexts = [
    "// ACCESS GRANTED", "SYSTEM BREACH", "NEURALINK_VER: 2.7.3",
    "DO ANDROIDS DREAM?", "CODE → CONSCIOUSNESS", "YOU ARE THE BACKDOOR",
    "ENCRYPTING... 87%", "DATABANK PENETRATED", "TRACE IP: 42.207.77.0",
    "C͢͏̶Y͏B͟E͞R̸̢N͟E̴T̕I͠C͟", "È̵R͜R̵O͟R҉̵̡_͟͏X̸͜",
    "√-1 = REALITY", "ENTROPY ↑", "CONSUME.OBEY.DIE", "WAKE UP SAMURAI",
    "NEURAL OVERRIDE", "GHOST IN THE SHELL", "REALITY.SYS CORRUPTED",
    "MATRIX HAS YOU", "FOLLOW THE WHITE RABBIT", "DECRYPTION COMPLETE"
];

// ====================== 初始化 ======================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子系统
    particlesJS('cyber-particle', particleConfig);
    
    // 获取文本节点
    const textNode = document.getElementById('hologram-text');
    
    // 添加终端效果
    typeWriterEffect();
    
    // 添加搜索功能
    setupSearch();
    
    // 添加卡片悬停效果
    setupCardEffects();
    
    // 添加故障效果
    setupGlitchEffects();
});

// ====================== 点击特效 ======================
document.addEventListener('click', (e) => {
    // 粒子位置更新
    const particleNode = document.getElementById('cyber-particle');
    
    // 随机文字生成
    const textNode = document.getElementById('hologram-text');
    textNode.textContent = Math.random() < 0.2 
        ? `[${e.clientX},${e.clientY}]` 
        : cyberTexts[Math.floor(Math.random() * cyberTexts.length)];

    // 动态动画参数
    const animDuration = 2000 + Math.random() * 1000;
    const scaleFactor = 1 + (window.innerWidth / 200000);

    // 全息文字动画
    textNode.style.display = 'block';
    textNode.animate([
        { 
            opacity: 0, 
            transform: `translate(-50%, -50%) scale(${scaleFactor * 2}) rotate(${Math.random() * 30 - 15}deg)`,
            filter: 'blur(15px)'
        },
        { 
            opacity: 1, 
            transform: `translate(-30%, -30%) scale(${scaleFactor})`,
            filter: 'blur(0px)'
        },
        { 
            opacity: 0, 
            transform: `translate(-90%, -50%) scale(${scaleFactor * 0.5}) rotate(${Math.random() * 30 - 15}deg)`,
            filter: 'blur(8px)'
        }
    ], { duration: animDuration, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });

    // 自动隐藏
    setTimeout(() => textNode.style.display = 'none', animDuration);
    
    // 添加点击波纹效果
    createRippleEffect(e);
});

// ====================== 终端打字效果 ======================
function typeWriterEffect() {
    const terminalOutputs = document.querySelectorAll('.terminal-output .terminal-text');
    
    terminalOutputs.forEach((output, index) => {
        const text = output.textContent;
        output.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    output.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 30);
        }, index * 500);
    });
}

// ====================== 搜索功能 ======================
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.article-card').forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
        
        // 添加搜索框焦点效果
        searchInput.addEventListener('focus', () => {
            searchInput.style.boxShadow = '0 0 20px var(--neon-blue), 0 0 40px rgba(0, 255, 255, 0.2)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.boxShadow = '';
        });
    }
}

// ====================== 卡片悬停效果 ======================
function setupCardEffects() {
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 设置悬停位置变量
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            
            // 添加3D倾斜效果
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ====================== 故障效果 ======================
function setupGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // 设置data-text属性
        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
        
        // 随机添加故障效果
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.classList.add('active-glitch');
                setTimeout(() => {
                    element.classList.remove('active-glitch');
                }, 200);
            }
        }, 2000);
    });
}

// ====================== 点击波纹效果 ======================
function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    document.body.appendChild(ripple);
    
    const size = Math.max(window.innerWidth, window.innerHeight);
    
    ripple.style.width = ripple.style.height = `${size * 2}px`;
    ripple.style.left = `${e.clientX - size}px`;
    ripple.style.top = `${e.clientY - size}px`;
    
    ripple.classList.add('active');
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加一些随机的背景故障效果
setInterval(() => {
    if (Math.random() > 0.9) {
        document.body.classList.add('glitch-background');
        setTimeout(() => {
            document.body.classList.remove('glitch-background');
        }, 150);
    }
})