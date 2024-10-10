document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);

    const span = document.createElement('span');
    span.className = 'close';
    span.innerHTML = '&times;';
    modal.appendChild(span);

    const nav = document.createElement('div');
    nav.className = 'modal-nav';
    nav.innerHTML = '<span class="prev">&laquo;</span><span class="next">&raquo;</span>';
    modal.appendChild(nav);

    const images = document.querySelectorAll('.portfolio-img');
    let currentIndex = 0;
    let scale = 1;
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = img.src;
            currentIndex = index;
            scale = 1;
            modalImg.style.transform = `scale(${scale})`;
            modalImg.style.left = '0px';
            modalImg.style.top = '0px';
        });
    });

    span.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    const showImage = (index) => {
        if (index >= 0 && index < images.length) {
            modalImg.src = images[index].src;
            currentIndex = index;
            scale = 1;
            modalImg.style.transform = `scale(${scale})`;
            modalImg.style.left = '0px';
            modalImg.style.top = '0px';
        }
    };

    document.querySelector('.prev').addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    // 添加鼠标滚轮放大缩小功能
    modalImg.addEventListener('wheel', (event) => {
        event.preventDefault();
        scale += event.deltaY * -0.01;
        scale = Math.min(Math.max(0.5, scale), 3); // 限制缩放比例
        modalImg.style.transform = `scale(${scale})`;
    });

    // 添加拖动功能
    modalImg.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        initialLeft = parseInt(modalImg.style.left || 0, 10);
        initialTop = parseInt(modalImg.style.top || 0, 10);
        modalImg.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            modalImg.style.left = `${initialLeft + dx}px`;
            modalImg.style.top = `${initialTop + dy}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        modalImg.style.cursor = 'grab';
    });

    // 允许按下Esc键关闭模态框
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.classList.remove('show');
        }
    });

    // 分类交互功能
    const categoryLinks = document.querySelectorAll('.category-link');
    const categories = document.querySelectorAll('.portfolio-grid');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            categories.forEach(category => {
                if (category.id === targetId) {
                    category.style.display = 'grid';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
});