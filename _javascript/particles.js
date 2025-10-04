// 精美粒子效果 - 支持明亮/暗黑模式
class AdvancedParticleEffect {
  constructor() {
    this.particles = [];
    this.haloEffects = [];
    this.canvas = null;
    this.ctx = null;
    this.isDarkMode = false;
    this.init();
  }

  init() {
    this.detectThemeMode();
    this.setupCanvas();
    this.bindEvents();
    this.startAnimation();
  }

  detectThemeMode() {
    // 检测当前主题模式
    const htmlElement = document.documentElement;
    this.isDarkMode = htmlElement.getAttribute('data-mode') === 'dark' ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    
    document.body.appendChild(this.canvas);
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    document.addEventListener('click', this.handleClick.bind(this));
    
    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-mode') {
          this.isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
  }

  handleClick(e) {
    // 在侧边栏区域点击时不触发粒子效果（同时排除遮罩和侧边栏触发按钮）
    const sidebar = document.getElementById('sidebar');
    const trigger = document.getElementById('sidebar-trigger');
    const mask = document.getElementById('mask');
    const path = typeof e.composedPath === 'function' ? e.composedPath() : null;

    const inSidebar = sidebar && (sidebar.contains(e.target) || (path && path.includes(sidebar)));
    const onTrigger = trigger && (trigger.contains(e.target) || (path && path.includes(trigger)));
    const onMask = mask && (mask.contains(e.target) || (path && path.includes(mask)));

    if (inSidebar || onTrigger || onMask) {
      return; // 侧边栏相关点击不触发
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // 统一使用暗黑模式效果
    this.createDarkModeExplosion(mouseX, mouseY);
  }

  // 明亮模式 - 简洁流畅效果
  createLightModeExplosion(x, y) {
    const lightColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    const particleCount = 20;

    // 创建中心光晕
    this.haloEffects.push({
      x: x,
      y: y,
      size: 25,
      life: 1,
      decay: 0.03
    });

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      
      const particle = {
        x: x,
        y: y,
        size: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: lightColors[Math.floor(Math.random() * lightColors.length)],
        life: 1,
        decay: Math.random() * 0.01 + 0.008,
        type: 'light'
      };
      this.particles.push(particle);
    }
  }

  // 暗黑模式 - 炫酷科技效果
  createDarkModeExplosion(x, y) {
    const darkColors = ['#00FFFF', '#FF7F50', '#9400D3', '#FFD700'];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      const isLineParticle = Math.random() < 0.2; // 20% 的粒子是线条状
      
      const particle = {
        x: x,
        y: y,
        size: isLineParticle ? Math.random() * 3 + 1 : Math.random() * 2 + 1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2, // 初始向上
        color: darkColors[Math.floor(Math.random() * darkColors.length)],
        life: 1,
        decay: Math.random() * 0.01 + 0.008,
        gravity: 0.2,
        flicker: Math.random() * 0.1 + 0.05,
        isLine: isLineParticle,
        lineLength: isLineParticle ? Math.random() * 10 + 5 : 0,
        type: 'dark'
      };
      this.particles.push(particle);
    }
  }

  startAnimation() {
    const render = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.updateAndRenderHaloEffects();
      this.updateAndRenderParticles();
      
      requestAnimationFrame(render);
    };
    
    render();
  }

  updateAndRenderHaloEffects() {
    for (let i = this.haloEffects.length - 1; i >= 0; i--) {
      const halo = this.haloEffects[i];
      halo.life -= halo.decay;
      
      if (halo.life <= 0) {
        this.haloEffects.splice(i, 1);
        continue;
      }
      
      // 只在明亮模式下显示光晕，暗黑模式下不显示以避免背景痕迹
      if (!this.isDarkMode) {
        this.ctx.globalAlpha = halo.life * 0.2;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.arc(halo.x, halo.y, halo.size * halo.life, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  updateAndRenderParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // 更新粒子状态
      this.updateParticle(particle);
      
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      
      // 渲染粒子
      this.renderParticle(particle);
    }
  }

  updateParticle(particle) {
    // 明亮模式粒子更新
    if (particle.type === 'light') {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 缓慢减速
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;
      
      particle.life -= particle.decay;
    }
    // 暗黑模式粒子更新
    else if (particle.type === 'dark') {
      particle.speedY += particle.gravity || 0;
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 闪烁效果
      if (particle.life < 0.3) {
        particle.life -= particle.decay * 2;
      } else {
        particle.life -= particle.decay;
      }
      

    }
  }

  renderParticle(particle) {
    this.ctx.globalAlpha = particle.life;
    
    if (particle.type === 'light') {
      // 简单圆形粒子渲染
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (particle.type === 'dark') {
      // 科技感粒子渲染
      this.ctx.fillStyle = particle.color;
      
      if (particle.isLine) {
        // 线条状粒子
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        const angle = Math.atan2(particle.speedY, particle.speedX);
        this.ctx.rotate(angle);
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, particle.lineLength, particle.size, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
      } else {
        // 圆形粒子
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }
}

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedParticleEffect();
});