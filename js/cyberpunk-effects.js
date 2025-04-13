// 随机添加故障效果到文章卡片
function addRandomGlitch() {
    const cards = document.querySelectorAll('.article-card');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    
    if (randomCard) {
        // 添加主要故障效果
        randomCard.classList.add('glitch-effect');
        
        // 添加颜色分离效果
        randomCard.style.setProperty('--glitch-offset', `${Math.random() * 10 - 5}px`);
        
        // 随机添加额外视觉效果
        const effects = [
            'invert(0.1)',
            'hue-rotate(45deg)',
            'brightness(1.2)',
            'contrast(1.1)'
        ];
        randomCard.style.filter = effects[Math.floor(Math.random() * effects.length)];
        
        // 移除所有效果
        setTimeout(() => {
            randomCard.classList.remove('glitch-effect');
            randomCard.style.filter = '';
            randomCard.style.removeProperty('--glitch-offset');
        }, 300);
    }
}

// 每3秒随机触发一次故障效果
setInterval(addRandomGlitch, 3000);

// 鼠标悬停时触发故障效果
document.querySelector('.article-grid').addEventListener('mouseover', (e) => {
    if (e.target.closest('.article-card') && Math.random() < 0.1) {
        const card = e.target.closest('.article-card');
        
        // 添加更强烈的悬停故障效果
        card.classList.add('glitch-effect');
        card.style.setProperty('--glitch-offset', `${Math.random() * 15 - 7.5}px`);
        
        // 随机组合多个滤镜效果
        const filters = [
            'brightness(1.2)',
            'contrast(1.2)',
            'hue-rotate(90deg)',
            'saturate(1.5)'
        ];
        card.style.filter = filters.slice(0, Math.floor(Math.random() * 3 + 1)).join(' ');
        
        // 移除效果
        setTimeout(() => {
            card.classList.remove('glitch-effect');
            card.style.filter = '';
            card.style.removeProperty('--glitch-offset');
        }, 300);
    }
});