document.addEventListener('DOMContentLoaded', () => {
    const clickBtn = document.getElementById('clickBtn');
    const timeDisplay = document.getElementById('time');
    const countDisplay = document.getElementById('count');
    const resultPanel = document.getElementById('result');
    
    let timeLeft = 10;
    let count = 0;
    let timerId;
    let isGameActive = true;
    const unclickedImages = ['1','3','4','6','8','9','12','13','14','16','17','18','20'].map(n => `assets/${n}.png`);
    const clickedImages = ['2','5','7','10','11','15','19'].map(n => `assets/${n}.png`);

    function getRandomImage(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // 按钮点击处理
    function handleClick() {
        if (!isGameActive) return;
        
        count++;
        countDisplay.textContent = count; // 新增更新显示逻辑
        // 切换为随机点击状态图片
        clickBtn.style.backgroundImage = `url('${getRandomImage(clickedImages)}')`;
        
        setTimeout(() => {
            // 恢复为随机未点击状态图片
            clickBtn.style.backgroundImage = `url('${getRandomImage(unclickedImages)}')`;
        }, 300);
    }

    // 初始化游戏
    function initGame() {
        // 显示玩法提示
        alert('背景：王逸凡曾把月球拉下来改建成私人游乐场。\n游戏玩法：\n10秒内尽可能多点击按钮来帮助王逸凡拽下月球\n');
        // 设置初始随机图片
        clickBtn.style.backgroundImage = `url('${getRandomImage(unclickedImages)}')`;
        clickBtn.addEventListener('click', handleClick);
        startGame();
    }

    // 启动游戏
    function startGame() {
        console.log('启动游戏，计时器ID:', timerId);
        timerId = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                console.log('时间耗尽，你被逮捕了！');
                clearInterval(timerId);
                isGameActive = false;
                clickBtn.disabled = true;
                resultPanel.textContent = `游戏结束！最终得分：${count}次`;
                const easterEggs = {
                    13: '👍',
                    78: '👍',
                    91: '👍',
                    6: '就是，我想问一下',
                    9: '就是，我想问一下',
                    90: '就是，我想问一下',
                    2: '为什么每个单词后面都有两个空？',
                    114: '🤨🤓'
                };
                
                // 彩蛋检测
                let eggMessage = '';
                Object.entries(easterEggs).forEach(([num, msg]) => {
                    if (count === parseInt(num)) {
                        eggMessage = msg;
                    }
                });
                
                if (eggMessage) {
                    resultPanel.textContent = eggMessage;
                    alert(eggMessage);
                } else {
                    // 原有成功/失败判断
                    if(count < 50) {
                        alert('不是你废物啊，月球都拉不下来！');
                    } else {
                        alert('不是你傻逼啊，月球不得通过主权要求、使用或占领等方式据为己有，你违法了！');
                    }
                }
                resultPanel.style.display = 'block';
            }
        }, 1000);
    }

    initGame();
});