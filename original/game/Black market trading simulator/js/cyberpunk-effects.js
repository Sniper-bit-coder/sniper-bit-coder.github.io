// 随机添加故障效果
setInterval(() => {
    const items = document.querySelectorAll('.item');
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    if (randomItem) {
        randomItem.classList.add('glitch-effect');
        setTimeout(() => {
            randomItem.classList.remove('glitch-effect');
        }, 200);
    }
}, 3000);