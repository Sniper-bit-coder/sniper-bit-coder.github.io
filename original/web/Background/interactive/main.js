$(document).ready(function() {
    // 窗口尺寸变量
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var bgHeight = $('.background').height();
    var bgWidth = $('.background').width();

    // 日期和时间格式
    var daysOfTheWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var monthsOfTheYear = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    // 更新时间函数
    function currentDate() {
        let date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        
        // 格式化时间，确保两位数显示
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dateNum = date.getDate();
        dateNum = dateNum < 10 ? '0' + dateNum : dateNum;

        // 添加作者信息
        if ($('.author').length === 0) {
            $('.cont').prepend('<div class="author">By Sniper Qyc</div>');
        }

        $('.time').html(hours + ' : ' + minutes + ' : ' + seconds);
        $('.date').html(year + '年 ' + monthsOfTheYear[month] + ' ' + dateNum + '日 ' + daysOfTheWeek[day]);
    }

    // 初始化时间并设置定时器
    currentDate();
    setInterval(currentDate, 1000);

    // 移除鼠标移动事件处理和晃动效果相关函数
    
    // 使用原生JavaScript创建粒子效果，不依赖Sketch.js
    createParticles();
});

// 使用原生JavaScript实现粒子效果
function createParticles() {
    var canvas = document.createElement('canvas');
    var container = document.getElementById('particles-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'particles-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = '10';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
    }
    
    container.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    // 添加以下样式确保canvas不会阻止鼠标事件
    canvas.style.pointerEvents = 'none';
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 30;
    
    // 粒子颜色
    var colors = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
    
    // 创建粒子对象
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.radius = Math.random() * 5 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 100 + Math.random() * 100;
        this.remainingLife = this.life;
    }
    
    // 创建初始粒子
    function createParticle() {
        if (particles.length < particleCount) {
            particles.push(new Particle());
        }
    }
    
    // 每200ms创建一个新粒子
    setInterval(createParticle, 200);
    
    // 初始创建一批粒子
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 更新和绘制粒子
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 设置混合模式
        ctx.globalCompositeOperation = 'lighter';
        
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            
            // 更新位置
            p.x += p.vx;
            p.y += p.vy;
            
            // 减少生命值
            p.remainingLife--;
            
            // 如果粒子生命结束，重置它
            if (p.remainingLife < 0) {
                particles[i] = new Particle();
            }
            
            // 边界检查
            if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.remainingLife / p.life;
            ctx.fill();
        }
        
        requestAnimationFrame(update);
    }
    
    // 开始动画
    update();
    
    // 修改：将鼠标事件监听器添加到document对象上，而不是canvas
    document.addEventListener('mousemove', function(e) {
        // 在鼠标位置创建粒子
        for (var i = 0; i < 5; i++) {
            var p = new Particle();
            p.x = e.clientX;
            p.y = e.clientY;
            // 给予粒子更明显的随机速度，使其从鼠标位置向四周扩散
            p.vx = (Math.random() - 0.5) * 4;
            p.vy = (Math.random() - 0.5) * 4;
            // 增加粒子大小，使其更明显
            p.radius = Math.random() * 8 + 3;
            // 增加粒子生命周期，使其存在时间更长
            p.life = 150 + Math.random() * 100;
            p.remainingLife = p.life;
            particles.push(p);
            
            // 保持粒子数量在限制内
            if (particles.length > particleCount) {
                particles.shift();
            }
        }
    });
    
    // 窗口大小改变时调整画布大小
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}