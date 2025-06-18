document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('timeDisplay');
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    setInterval(updateTime, 1000);
    updateTime();

    document.querySelectorAll('.copy-text').forEach(copyElement => {
        copyElement.addEventListener('click', () => {
            const textToCopy = copyElement.firstChild.textContent.trim();
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Đã sao chép vào clipboard: ' + textToCopy);
                })
                .catch(err => {
                    console.error('Không thể sao chép văn bản: ', err);
                    alert('Không thể sao chép. Vui lòng thử lại.');
                });
        });
    });

    const particlesBackground = document.querySelector('.particles-background');
    const numParticles = 100; 
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesBackground.appendChild(particle);
    }

    const container = document.querySelector('.container');
    if (container) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            container.style.transform = `
                rotateX(${mouseY * 5}deg)
                rotateY(${mouseX * 10}deg)
            `;
            container.style.transition = 'transform 0.1s ease-out';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = `rotateX(0deg) rotateY(0deg)`;
            container.style.transition = 'transform 0.5s ease-out';
        });
    }

    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    document.documentElement.style.setProperty('--primary-color-rgb', hexToRgb(primaryColor));

    const androidButton = document.getElementById('androidButton');
    if (androidButton) {
        androidButton.addEventListener('click', function(e) {
            showAndroidPopup();
        });
    }

    function showAndroidPopup() {
        if (document.getElementById('androidPopup')) return;

        document.body.style.overflow = 'hidden';

        const popup = document.createElement('div');
        popup.id = 'androidPopup';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100vw';
        popup.style.height = '100vh';
        popup.style.background = 'rgba(0,0,0,0.5)';
        popup.style.display = 'flex';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.zIndex = '9999';

        popup.innerHTML = `
            <div style="
                background: #222;
                color: #fff;
                padding: 32px 24px;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.3);
                max-width: 90vw;
                text-align: center;
                position: relative;
            ">
                <h1 style="margin-top:0;">Thông báo</h1>
                <h3>Hướng dẫn Locket Gold Android</h3>
                <p style="color: #FF00FF;">Khi nhấn vào Nút Locket Android thì sẽ tự động mở một trang để bạn tải xuống file locket apk.</p>
                <p>Sau khi tải file afk xong thì <strong style="color:rgb(250, 16, 16);">"Xóa ứng dụng locket đã tải bằng CHplay (nếu có)"</strong> rồi tiến hành cài đặt ứng dụng locket từ file apk và sau khi đăng nhập xong thì sẽ có Gold</p>
                <p>Chúc bạn có một trải nghiệm thật tốt!</p>
                <button id="closeAndroidPopup" style="
                    margin-top: 18px;
                    padding: 8px 24px;
                    border-radius: 8px;
                    border: none;
                    background: var(--primary-color, #bb86fc);
                    color: #fff;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1em;
                ">Đóng</button>
            </div>
        `;

        document.body.appendChild(popup);

        document.getElementById('closeAndroidPopup').onclick = function() {
            popup.remove();
            document.body.style.overflow = '';
        };
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.remove();
                document.body.style.overflow = '';
            }
        });
    }
    
    document.querySelectorAll('.moi img').forEach((img, idx, imgArr) => {
        img.addEventListener('click', () => {
            showmoiGallery(idx, imgArr);
        });
    });

    function showmoiGallery(startIdx, imgArr) {
        let current = startIdx;

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 10000;

        const imgBox = document.createElement('div');
        imgBox.style.position = 'relative';
        imgBox.style.display = 'flex';
        imgBox.style.alignItems = 'center';
        imgBox.style.justifyContent = 'center';
        imgBox.style.maxWidth = '90vw';
        imgBox.style.maxHeight = '90vh';

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&#8592;';
        prevBtn.style.position = 'absolute';
        prevBtn.style.left = '-15px';
        prevBtn.style.top = '50%';
        prevBtn.style.transform = 'translateY(-50%)';
        prevBtn.style.fontSize = '2em';
        prevBtn.style.background = 'rgba(0,0,0,0.5)';
        prevBtn.style.color = '#FF00FF';
        prevBtn.style.border = 'none';
        prevBtn.style.borderRadius = '50%';
        prevBtn.style.width = '40px';
        prevBtn.style.height = '40px';
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.zIndex = 2;
        imgBox.appendChild(prevBtn);

        const bigImg = document.createElement('img');
        bigImg.src = imgArr[current].src;
        bigImg.alt = imgArr[current].alt;
        bigImg.style.maxWidth = '70vw';
        bigImg.style.maxHeight = '70vh';
        bigImg.style.borderRadius = '12px';
        bigImg.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
        bigImg.style.transition = 'transform 0.3s';
        imgBox.appendChild(bigImg);

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&#8594;';
        nextBtn.style.position = 'absolute';
        nextBtn.style.right = '-15px';
        nextBtn.style.top = '50%';
        nextBtn.style.transform = 'translateY(-50%)';
        nextBtn.style.fontSize = '2em';
        nextBtn.style.background = 'rgba(0,0,0,0.5)';
        nextBtn.style.color = '#FF00FF';
        nextBtn.style.border = 'none';
        nextBtn.style.borderRadius = '50%';
        nextBtn.style.width = '40px';
        nextBtn.style.height = '40px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.zIndex = 2;
        imgBox.appendChild(nextBtn);

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '1px';
        closeBtn.style.fontSize = '5em';
        closeBtn.style.background = 'transparent';
        closeBtn.style.color = '#FF0000';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = 3;
        imgBox.appendChild(closeBtn);

        overlay.appendChild(imgBox);
        document.body.appendChild(overlay);

        closeBtn.onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

        let startX = null;
        overlay.addEventListener('touchstart', e => {
            if (e.touches.length === 1) startX = e.touches[0].clientX;
        });
        overlay.addEventListener('touchend', e => {
            if (startX === null) return;
            let endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) showPrev();
            else if (startX - endX > 50) showNext();
            startX = null;
        });

        window.addEventListener('keydown', keyHandler);
        function keyHandler(e) {
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'Escape') overlay.remove();
        }

        function showImg(idx) {
            current = (idx + imgArr.length) % imgArr.length;
            bigImg.src = imgArr[current].src;
            bigImg.alt = imgArr[current].alt;
        }
        function showPrev() { showImg(current - 1); }
        function showNext() { showImg(current + 1); }

        prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
        nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };

        imgBox.onclick = (e) => {
            const rect = bigImg.getBoundingClientRect();
            if (e.clientX < rect.left + rect.width / 2) showPrev();
            else showNext();
        };

        closeBtn.onclick = (e) => { e.stopPropagation(); overlay.remove(); };
        bigImg.onclick = (e) => {
        e.stopPropagation();
        showNext();
    };

        overlay.onremove = () => window.removeEventListener('keydown', keyHandler);
    }
});

