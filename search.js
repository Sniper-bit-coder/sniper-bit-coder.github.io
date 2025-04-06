// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const articleCards = document.querySelectorAll('.article-card');
    
    // 搜索文章函数
    function searchArticles(query) {
        query = query.toLowerCase().trim();
        
        // 如果搜索框为空，显示所有文章
        if (query === '') {
            articleCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        // 遍历所有文章卡片
        articleCards.forEach(card => {
            const title = card.querySelector('a').textContent.toLowerCase();
            const category = card.querySelector('.article-category').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const meta = card.querySelector('.article-meta').textContent.toLowerCase();
            
            // 如果查询匹配任何内容，显示文章
            if (title.includes(query) || category.includes(query) || 
                content.includes(query) || meta.includes(query)) {
                card.style.display = 'block';
                
                // 添加高亮效果
                card.classList.add('search-highlight');
                setTimeout(() => {
                    card.classList.remove('search-highlight');
                }, 1000);
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示搜索结果计数
        const visibleCount = Array.from(articleCards).filter(
            card => card.style.display !== 'none'
        ).length;
        
        // 创建或更新搜索结果提示
        let searchResultInfo = document.querySelector('.search-result-info');
        if (!searchResultInfo) {
            searchResultInfo = document.createElement('div');
            searchResultInfo.className = 'search-result-info';
            document.querySelector('.search-box').appendChild(searchResultInfo);
        }
        
        searchResultInfo.textContent = `找到 ${visibleCount} 个结果`;
        searchResultInfo.style.display = 'block';
        
        // 如果没有结果，显示提示
        if (visibleCount === 0) {
            searchResultInfo.textContent = '没有找到匹配的结果';
        }
    }
    
    // 监听搜索输入
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchArticles(this.value);
        });
        
        // 监听回车键
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles(this.value);
            }
        });
    }
    
    // 添加搜索图标点击事件
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            searchArticles(searchInput.value);
        });
    }
});
