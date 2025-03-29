        // 持久化粒子实例
        let particlesInstance = null;
        
        // ====================== 粒子系统配置 ======================
        const particleConfig = {
        particles: {
            number: { 
                value: 800,  // 增加粒子数量（原30）
                density: { 
                    enable: true,  // 开启密度模式
                    value_area: 8000 // 增大粒子分布区域
                }
            },
            color: { 
                value: ["#0ff", "#f0f"],
                opacity: 0.9  // 增加透明度
            },
            shape: { 
                type: "circle",
                stroke: {
                    width: 2,  // 增加描边宽度
                    color: "#fff"
                }
            },
            opacity: {
                value: 0.8,  // 修正透明度（原错误值99999）
                random: true
            },
            size: {
                value: 5,  // 增大基础尺寸（原1）
                random: {
                    enable: true,
                    minimumValue: 1  // 随机尺寸下限
                },
                anim: {
                    enable: true,
                    speed: 5,  // 尺寸动画速度
                    size_min: 0.1
                }
            },
            move: {
                enable: true,
                speed: 5,  // 加快运动速度（原5）
                direction: "none",
                random: true, 
                straight: false,
                out_mode: "destroy",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,  // 增加引力效果
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            events: {
                onclick: { 
                    enable: true,
                    mode: "push",
                    particles: {
                        number: 20000  // 每次点击生成更多粒子
                    }
                }
            }
        },
        retina_detect: true  // 启用视网膜屏优化
    };

        // ====================== 全息文字库 ======================
        const cyberTexts = [
            "// ACCESS DENIED", "SYSTEM BREACH", "NEURALINK_VER: 0.7.2",
            "DO ANDROIDS DREAM?", "CODE → CONSCIOUSNESS", "YOU ARE THE BACKDOOR",
            "ENCRYPTING... 37%", "DATABANK PENETRATED", "TRACE IP: 42.207.77.0",
            "C͢͏̶Y͏B͟E͞R̸̢N͟E̴T̕I͠C͟", "È̵R͜R̵O͟R҉̵̡_͟͏X̸͜",
            "√-1 = REALITY", "ENTROPY ↑", "CONSUME.OBEY.DIE", "WAKE UP SAMURAI"
        ];

        // ====================== 初始化 ======================
        particlesJS('cyber-particle', particleConfig);
        const textNode = document.getElementById('hologram-text');

        // ====================== 点击特效 ======================
        document.addEventListener('click', (e) => {
            // 粒子位置更新
            const particleNode = document.getElementById('cyber-particle');
            particleNode.style.left = `${e.clientX}px`;
            particleNode.style.top = `${e.clientY}px`;

            // 随机文字生成
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
    });