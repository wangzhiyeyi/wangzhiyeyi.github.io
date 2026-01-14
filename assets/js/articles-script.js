// 加载文章数据并渲染到页面
async function loadArticlesData() {
    try {
        const response = await fetch('../articles-data.json');
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error loading articles data:', error);
        // 如果无法加载远程数据，则返回默认数据
        return [
            {
                id: "database-analysis-report",
                title: "投资者问答数据质量评估分析报告",
                filename: "posts/database-analysis-report.html",
                publishedDate: "January 10, 2026",
                category: "Data Analysis",
                excerpt: "本报告对来自CSMAR与CNRDS两个数据库的投资者问答数据进行了全面的质量与一致性评估。评估结果显示，两个数据源在整体记录规模与实体覆盖上高度一致，整体差异率为0%，但在时间序列覆盖和特定时间点上存在显著差异。"
            },
            {
                id: "stata-time-variable-guide",
                title: "Stata时间变量不完全处理指南",
                filename: "posts/stata-time-variable-guide.html",
                publishedDate: "October 14, 2025",
                category: "Technical Guide",
                excerpt: "本文档简要介绍了Stata中时间变量的存储原理、处理思路和实际操作示例。涵盖了Stata变量类型基础、时间变量核心概念、处理时间变量的核心思路等内容。"
            }
        ];
    }
}

// 渲染文章列表到posts页面
async function renderArticleList() {
    const articles = await loadArticlesData();
    const articleListContainer = document.querySelector('.article-list');
    
    if (!articleListContainer) {
        console.log('Article list container not found');
        return;
    }
    
    articleListContainer.innerHTML = articles.map(article => `
        <li class="article-item">
            <h3 class="article-title">
                <a href="${article.filename}" class="article-link">${article.title}</a>
            </h3>
            <p class="article-meta">Published: ${article.publishedDate} | Category: ${article.category}</p>
            <p class="article-excerpt">${article.excerpt}</p>
        </li>
    `).join('');
}

// 更新文章详情页中的信息
async function updateArticleInfo() {
    // 获取当前页面文件名
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    const articles = await loadArticlesData();
    const article = articles.find(a => a.filename.includes(filename));
    
    if (article) {
        const infoElement = document.querySelector('.article-info');
        if (infoElement) {
            // 更新发布日期和类别
            const spans = infoElement.querySelectorAll('span');
            if (spans.length >= 2) {
                spans[0].innerHTML = `Published: ${article.publishedDate}`;
                spans[1].textContent = `Category: ${article.category}`;
            }
        }
    }
}

// 页面加载完成后渲染文章列表或更新文章详情
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在文章列表容器（posts.html页面）
    if (document.querySelector('.article-list')) {
        renderArticleList();
    }
    // 检查是否是文章详情页（有.article-info元素）
    else if (document.querySelector('.article-info')) {
        updateArticleInfo();
    }
});