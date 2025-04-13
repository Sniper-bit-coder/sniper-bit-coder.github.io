// 粒子效果
document.addEventListener('DOMContentLoaded', function() {
    // 询问用户设置粒子数量
    let particleCount = 100; // 默认值
    const userInput = prompt('请输入想要的粒子数量 (推荐值：\n性能好: 150-200\n性能一般: 80-120\n性能差: 30-60)');
    
    // 确保输入是有效的数字
    if (userInput !== null && !isNaN(userInput)) {
        particleCount = Math.max(10, Math.min(300, parseInt(userInput)));
    }

    // 创建canvas元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas样式
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';
    
    // 将canvas添加到cyber-particle容器
    const container = document.getElementById('cyber-particle');
    container.appendChild(canvas);
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 粒子设置
    const particlesArray = [];
    const numberOfParticles = particleCount;  // 使用用户选择的粒子数量
    const colors = [
        'rgba(0, 255, 255, 0.7)',  // 青色
        'rgba(255, 0, 255, 0.7)',  // 粉色
        'rgba(0, 255, 0, 0.7)',    // 绿色
        'rgba(255, 255, 0, 0.7)',  // 黄色
        'rgba(0, 0, 255, 0.7)'     // 蓝色
    ];
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 2;
            this.speedY = Math.random() * 1 - 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检查
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 创建粒子
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // 处理鼠标移动事件
    let mouse = {
        x: null,
        y: null,
        radius: 100
    };
    
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        
        // 在鼠标位置添加额外粒子
        for (let i = 0; i < 2; i++) {
            const particle = new Particle();
            particle.x = mouse.x;
            particle.y = mouse.y;
            particle.size = Math.random() * 5 + 2;
            particle.speedX = Math.random() * 3 - 2;
            particle.speedY = Math.random() * 3 - 2;
            particlesArray.push(particle);
            
            // 限制粒子数量，使用相同的粒子数量限制
            if (particlesArray.length > particleCount) {
                particlesArray.splice(0, 1);
            }
        }
    });
    
    // 连接粒子
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArray[a].color;
                    ctx.globalAlpha = 0.2;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
});