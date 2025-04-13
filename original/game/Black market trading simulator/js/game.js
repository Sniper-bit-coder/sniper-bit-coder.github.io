class BlackMarket {
    constructor() {
        this.player = {
            money: 10000,  // 增加初始资金
            inventory: []
        };
        
        // 添加折叠状态追踪
        this.collapsedCategories = new Set();
        
        // 所有可能出现的物品池
        this.allItems = [
            {
                id:1,
                name:"Glock 17 Gen 5 MOS 9MM 17+1",
                basePrice:3500,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 2,
                name:"Glock 43 9MM Subcompact",
                basePrice:3080,
                volatility:0.1,
                category:"枪械"
            },
            {
                id: 3,
                name:"BERETTA 92FS M9",
                basePrice:4060,
                volatility:0.2,
                category:"枪械"
            },
            {
                name:"Taurus 905 9mm Luger Matte Stainless",
                basePrice:3010,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 5,
                name:"Magnum Desert Eagle .44",
                basePrice:8960,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 6,
                name:"Walther Arms PPS M2 9mm Pistol -7+1 Rounds",
                basePrice:3325,
                volatility:0.2,
                category:"枪械"
            },
            {
                id: 7,
                name:"Canik TTI COMBAT",
                basePrice:5250,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 8,
                name:"PMC Bronze 9mm 124gr FMJ Ammunition 50rds 9G",
                basePrice:350,
                volatility:0.5,
                category:"枪械"
            },
            {
                id: 9,
                name:"REMINGTON",
                basePrice:875000,
                volatility:0.5,
                category:"枪械"
            },
            {
                id: 10,
                name:"SMITH & WESSON",
                basePrice:525000,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 11,
                name:"Glock 17 Gen 5",
                basePrice:3500,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 12,
                name:"BARRETT",
                basePrice:121338,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 13,
                name:"SPRINGFIELD ARMORY",
                basePrice:10000,
                volatility:0.3,
                category:"枪械"
            },
            {
                id: 14,
                name:"大麻(50g)",
                basePrice:10000,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 15,
                name:"冰毒(50g)",
                basePrice:40000,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 16,
                name:"海洛因(50g)",
                basePrice:75000,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 17,
                name:"可卡因(50g)",
                basePrice:100000,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 18,
                name:"LSD致幻剂(50g)",
                basePrice:25000,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 19,
                name:"MDMA摇头丸(50g)",
                basePrice:7500,
                volatility:0.3,
                category:"毒品"
            },
            {
                id: 20,
                name:"达·芬奇《救世主》",
                basePrice:3150000000,
                volatility:0.3,
                category:"文物"
            },
            {
                id: 21,
                name:"梵高《加歇医生肖像》",
                basePrice:577500000,
                volatility:0.3,
                category:"文物"
            },
            {
                id: 22,
                name:"齐白石《山水十二条屏》",
                basePrice:931500000,
                volatility:0.3,
                category:"文物"
            },
            {
                id: 23,
                name:"毕加索《阿尔及尔的女人(O版)》",
                basePrice:179000000,
                volatility:0.3,
                category:"文物"
            },
            {
                id: 24,
                name:"假钞(10000元)",
                basePrice:100,
                volatility:0.3,
                category:"假冒商品"
            },
            {
                id: 24,
                name:"伪造护照",
                basePrice:5000,
                volatility:0.3,
                category:"假冒商品"
            },
            {
                id: 25,
                name:"伪造身份证",
                basePrice:4500,
                volatility:0.3,
                category:"假冒商品"
            },
            {
                id: 26,
                name:"非洲奴隶",
                basePrice:200000,
                volatility:0.3,
                category:"人口"
            },          
            {
                id: 27,
                name:"王逸凡",
                basePrice:10000000,
                volatility:1,
                category:"人口"
            }
        ];

        this.items = [];  // 当前市场上的物品
        this.priceMultipliers = {};
        this.dayCount = 1;  // 添加天数计数
        this.logMessages = [];  // 添加日志存储
        this.restockMarket();
        this.init();
    }

    // 添加日志方法
    addLog(message, type = 'info') {
        const logContent = document.getElementById('log-content');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry log-${type}`;
        logEntry.textContent = `第${this.dayCount}天: ${message}`;
        logContent.insertBefore(logEntry, logContent.firstChild);
        
        // 保持最多显示20条日志
        this.logMessages.push(logEntry);
        if (this.logMessages.length > 20) {
            const oldLog = this.logMessages.shift();
            if (oldLog.parentNode === logContent) {
                logContent.removeChild(oldLog);
            }
        }
    }

    updatePrices() {
        // 计算每日开销
        const dailyCost = 91;
        this.player.money -= dailyCost;
        
        // 检查游戏是否结束
        if (this.player.money <= 0) {
            this.addLog('你破产了！游戏结束！', 'error');
            setTimeout(() => window.location.reload(), 3000);
            return;
        }

        this.dayCount++;  // 增加天数
        this.addLog(`每日开销：91元`, 'info');

        // 随机移除一些物品
        this.items = this.items.filter(() => Math.random() > 0.3);
        
        // 更新所有物品价格
        const allItemIds = new Set([
            ...this.items.map(item => item.id),
            ...this.player.inventory.map(item => item.id)
        ]);
        
        allItemIds.forEach(id => {
            const itemTemplate = this.allItems.find(item => item.id === id);
            if (itemTemplate) {
                const volatility = itemTemplate.volatility;
                const change = (Math.random() - 0.5) * 2 * volatility;
                this.priceMultipliers[id] *= (1 + change);
                
                if (this.priceMultipliers[id] < 0.5) this.priceMultipliers[id] = 0.5;
                if (this.priceMultipliers[id] > 2) this.priceMultipliers[id] = 2;
            }
        });

        // 补充新物品
        this.restockMarket();
        
        // 更新显示
        this.updatePlayerInfo();
        this.updateMarket();
        this.updateInventory();
    }

    restockMarket() {
        // 确保市场上至少有3个物品
        while (this.items.length < 3) {
            // 从物品池中随机选择未在市场上的物品
            const availableItems = this.allItems.filter(item => 
                !this.items.some(marketItem => marketItem.id === item.id) &&
                !this.player.inventory.some(invItem => invItem.id === item.id)
            );
            
            if (availableItems.length === 0) break;
            
            const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
            this.items.push({...randomItem});
            
            // 初始化价格倍数
            if (!this.priceMultipliers[randomItem.id]) {
                this.priceMultipliers[randomItem.id] = 1;
            }
        }
    }

    init() {
        this.updateMarket();
        this.updatePlayerInfo();
        this.updateInventory();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 设置"下一天"按钮事件
        document.getElementById('next-day').addEventListener('click', () => {
            this.updatePrices();
        });

        // 添加存档按钮事件
        const exportButton = document.querySelector('.export-save');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                this.exportSave();
            });
        }

        // 添加读档按钮事件
        const importButton = document.querySelector('.import-save');
        if (importButton) {
            importButton.addEventListener('click', () => {
                this.importSave();
            });
        }
    }

    // 导出存档方法
    exportSave() {
        try {
            const saveData = {
                player: this.player,
                items: this.items,
                priceMultipliers: this.priceMultipliers,
                dayCount: this.dayCount,
                collapsedCategories: Array.from(this.collapsedCategories)
            };
            
            // 将对象转换为JSON字符串，然后使用encodeURIComponent处理非Latin1字符
            const jsonString = JSON.stringify(saveData);
            const saveString = btoa(encodeURIComponent(jsonString));
            
            // 显示在文本框中
            const saveCodeElement = document.querySelector('.save-code');
            if (saveCodeElement) {
                saveCodeElement.value = saveString;
                saveCodeElement.select();
                this.addLog('存档已生成，请复制保存', 'success');
            } else {
                console.error('找不到存档文本框元素');
                this.addLog('存档生成失败：找不到文本框', 'error');
            }
        } catch (error) {
            console.error('导出存档失败:', error);
            this.addLog('存档生成失败：' + error.message, 'error');
        }
    }

    // 导入存档方法
    importSave() {
        try {
            // 获取文本框中的存档代码
            const saveCodeElement = document.querySelector('.save-code');
            if (!saveCodeElement) {
                this.addLog('找不到存档文本框', 'error');
                return;
            }
            
            const saveString = saveCodeElement.value.trim();
            
            // 添加测试模式判断
            if (saveString === "test") {
                this.player.money = 9007199254740991;
                this.updatePlayerInfo();
                this.addLog('测试模式已激活!获得了9007199254740991元(这是我能给你的最大的数,即2^53)', 'success');
                saveCodeElement.value = '';
                return;
            }
            
            if (!saveString) {
                this.addLog('请先输入存档代码', 'error');
                return;
            }
            
            // 解码：先用atob解码Base64，然后用decodeURIComponent处理特殊字符
            const jsonString = decodeURIComponent(atob(saveString));
            const saveData = JSON.parse(jsonString);
            
            // 恢复游戏状态
            this.player = saveData.player;
            this.items = saveData.items;
            this.priceMultipliers = saveData.priceMultipliers;
            this.dayCount = saveData.dayCount;
            
            // 恢复折叠状态
            this.collapsedCategories = new Set(saveData.collapsedCategories || []);
            
            // 更新界面
            this.updatePlayerInfo();
            this.updateMarket();
            this.updateInventory();
            
            this.addLog('存档已成功导入', 'success');
            
            // 清空文本框
            saveCodeElement.value = '';
        } catch (error) {
            console.error('导入存档失败:', error);
            this.addLog('存档代码无效，导入失败: ' + error.message, 'error');
        }
    }

    updateInventory() {
        const inventoryDiv = document.getElementById('player-inventory');
        inventoryDiv.innerHTML = '';
        
        this.player.inventory.forEach(item => {
            const currentPrice = this.calculatePrice(item);
            const originalPrice = item.boughtPrice || 0;
            const profit = currentPrice - originalPrice;
            
            // 改进利润显示的颜色和样式
            let profitColor, profitSymbol, profitClass;
            if (profit > 0) {
                profitColor = '#4caf50'; // 绿色
                profitSymbol = '↑';
                profitClass = 'profit-up';
            } else if (profit < 0) {
                profitColor = '#f44336'; // 红色
                profitSymbol = '↓';
                profitClass = 'profit-down';
            } else {
                profitColor = '#ffc107'; // 黄色
                profitSymbol = '=';
                profitClass = 'profit-neutral';
            }
            
            // 计算利润百分比
            const profitPercent = originalPrice > 0 ? ((profit / originalPrice) * 100).toFixed(1) : 0;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <div class="item-content">
                    <h4>${item.name}</h4>
                    <p>购入价格: <span class="price-original">${originalPrice}</span> 元</p>
                    <p>当前价格: <span class="price-current">${currentPrice}</span> 元</p>
                    <p class="${profitClass}">
                        <span style="color: ${profitColor}; font-weight: bold;">
                            ${profitSymbol} 预期利润: ${profit} 元 (${profitPercent}%)
                        </span>
                    </p>
                </div>
            `;

            // 创建并添加出售按钮
            const sellButton = document.createElement('button');
            sellButton.textContent = '出售';
            sellButton.className = profit > 0 ? 'sell-button profitable' : 'sell-button';
            sellButton.onclick = () => this.sellItem(item.id);
            itemElement.appendChild(sellButton);
            
            inventoryDiv.appendChild(itemElement);
        });
    }

    updateMarket() {
        const marketDiv = document.getElementById('items-list');
        marketDiv.innerHTML = '';
        
        const categories = {};
        this.items.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            categories[item.category].push(item);
        });
        
        for (const category in categories) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'category-header';
            headerDiv.innerHTML = `
                <h3>${category}</h3>
                <span class="toggle-icon">${this.collapsedCategories.has(category) ? '+' : '-'}</span>
            `;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = `category-content ${this.collapsedCategories.has(category) ? 'collapsed' : ''}`;
            
            headerDiv.addEventListener('click', () => {
                if (this.collapsedCategories.has(category)) {
                    this.collapsedCategories.delete(category);
                    contentDiv.classList.remove('collapsed');
                    headerDiv.querySelector('.toggle-icon').textContent = '-';
                } else {
                    this.collapsedCategories.add(category);
                    contentDiv.classList.add('collapsed');
                    headerDiv.querySelector('.toggle-icon').textContent = '+';
                }
            });
            
            categories[category].forEach(item => {
                const currentPrice = this.calculatePrice(item);
                const priceChange = ((this.priceMultipliers[item.id] - 1) * 100).toFixed(1);
                
                // 改进价格变化的颜色和样式
                let priceColor, priceSymbol, priceClass;
                if (parseFloat(priceChange) > 0) {
                    priceColor = '#4caf50'; // 绿色
                    priceSymbol = '↑';
                    priceClass = 'price-up';
                } else if (parseFloat(priceChange) < 0) {
                    priceColor = '#f44336'; // 红色
                    priceSymbol = '↓';
                    priceClass = 'price-down';
                } else {
                    priceColor = '#ffc107'; // 黄色
                    priceSymbol = '=';
                    priceClass = 'price-neutral';
                }
                
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                
                // 先创建内容容器
                const contentContainer = document.createElement('div');
                contentContainer.className = 'item-content';
                contentContainer.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>当前价格: <span class="price-current">${currentPrice}</span> 元</p>
                    <p class="${priceClass}">
                        <span style="color: ${priceColor}; font-weight: bold;">
                            ${priceSymbol} 价格变化: ${priceChange}%
                        </span>
                    </p>
                `;
                itemElement.appendChild(contentContainer);
                
                // 创建购买按钮
                const buyButton = document.createElement('button');
                buyButton.textContent = '购买';
                buyButton.addEventListener('click', () => {
                    this.buyItem(item.id);
                });
                itemElement.appendChild(buyButton);
                
                contentDiv.appendChild(itemElement);
            });
            
            categoryDiv.appendChild(headerDiv);
            categoryDiv.appendChild(contentDiv);
            marketDiv.appendChild(categoryDiv);
        }
    }

    sellItem(itemId) {
        const index = this.player.inventory.findIndex(i => i.id === itemId);
        if (index !== -1) {
            const item = this.player.inventory[index];
            const sellPrice = this.calculatePrice(item);
            this.player.money += sellPrice;
            this.player.inventory.splice(index, 1);
            
            this.addLog(`出售 ${item.name}，获得 ${sellPrice} 元`, 'success');
            
            this.updatePlayerInfo();
            this.updateInventory();
        }
    }

    calculatePrice(item) {
        const marketFactor = this.priceMultipliers[item.id];
        return Math.round(item.basePrice * marketFactor);
    }

    updatePlayerInfo() {
        const moneyElement = document.getElementById('player-money');
        if (moneyElement) {
            moneyElement.textContent = this.player.money;
        }
    }

    // 添加缺失的 buyItem 方法
    buyItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        const price = this.calculatePrice(item);
        if (this.player.money >= price) {
            this.player.money -= price;
            const boughtItem = {...item, boughtPrice: price};
            this.player.inventory.push(boughtItem);
            
            this.items = this.items.filter(i => i.id !== itemId);
            this.restockMarket();
            
            this.addLog(`购买 ${item.name}，花费 ${price} 元`, 'success');
            
            this.updatePlayerInfo();
            this.updateInventory();
            this.updateMarket();
        } else {
            this.addLog(`资金不足，无法购买 ${item.name}！`, 'error');
        }
    }
}

