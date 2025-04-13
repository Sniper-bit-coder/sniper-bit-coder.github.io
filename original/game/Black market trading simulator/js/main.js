let game;

window.onload = function() {
    try {
        window.game = new BlackMarket();  // 修改为全局变量
    } catch (error) {
        console.error('游戏初始化失败:', error);
    }
}