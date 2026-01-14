// 通用导航栏渲染函数
function renderNavigation(currentPage = 'home') {
    const navContainer = document.getElementById('mainNav');
    if (!navContainer) return;

    let navItems = '';

    switch(currentPage) {
        case 'post':
            navItems = `
                <ul>
                    <li><a href="../index.html#about" class="nav-link">About</a></li>
                    <li><a href="../blog.html" class="nav-link active">Blog</a></li>
                    <li><a href="../index.html#research" class="nav-link">Publication</a></li>
                    <li><a href="../index.html#contact" class="nav-link">Contact</a></li>
                </ul>
            `;
            break;
        case 'posts-page':  // blog page
            navItems = `
                <ul>
                    <li><a href="index.html#about" class="nav-link">About</a></li>
                    <li><a href="blog.html" class="nav-link active">Blog</a></li>
                    <li><a href="index.html#research" class="nav-link">Publication</a></li>
                    <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                </ul>
            `;
            break;
        default: // home page
            navItems = `
                <ul>
                    <li><a href="#about" class="nav-link">About</a></li>
                    <li><a href="blog.html" class="nav-link">Blog</a></li>
                    <li><a href="#research" class="nav-link">Publication</a></li>
                    <li><a href="#contact" class="nav-link">Contact</a></li>
                </ul>
            `;
    }

    navContainer.innerHTML = navItems;
}

// 页面加载完成后渲染导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 通过data属性来确定当前页面类型
    const currentPageType = document.body.getAttribute('data-page-type') || 'home';
    renderNavigation(currentPageType);
});