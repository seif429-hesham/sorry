document.addEventListener('DOMContentLoaded', () => {

    // 1. توليد القلوب المتساقطة
    const heartsContainer = document.getElementById('hearts-container');
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    setInterval(createHeart, 300);

    // 2. التحكم في الضغط على ختم القلب لشاشة الدخول
    const heartSealBtn = document.getElementById('heart-seal-btn');
    const bgMusic = document.getElementById('bg-music');
    const envelopeSection = document.getElementById('envelope-section');
    const passwordSection = document.getElementById('password-section');

    heartSealBtn.addEventListener('click', () => {
        // تشغيل الموسيقى
        bgMusic.play().catch(err => {
            console.log("تنبيه: يتطلب متصفحك التفاعل لتشغيل الصوت تلقائياً", err);
        });

        // الانتقال لشاشة تسجيل الدخول
        envelopeSection.classList.add('hidden');
        passwordSection.classList.remove('hidden');
    });

    // 3. التحكم في شاشة تسجيل الدخول (اسم المستخدم: BO | الباسورد: 16/2/2026)
    const userInput = document.getElementById('user-input');
    const passInput = document.getElementById('pass-input');
    const passSubmitBtn = document.getElementById('pass-submit-btn');
    const errorMsg = document.getElementById('error-msg');
    const mainContentSection = document.getElementById('main-content-section');

    function checkCredentials() {
        const enteredUser = userInput.value.trim();
        const enteredPass = passInput.value.trim();
        
        // مطابقة اسم المستخدم وكلمة السر (مع دعم الأرقام بالعربية أو الإنجليزية)
        const isValidUser = (enteredUser.toUpperCase() === 'BO');
        const isValidPass = (enteredPass === '16/2/2026' || enteredPass === '16/02/2026' || enteredPass === '١٦/٢/٢٠٢٦' || enteredPass === '١٦/٠٢/٢٠٢٦');

        if (isValidUser && isValidPass) {
            passwordSection.classList.add('hidden');
            mainContentSection.classList.remove('hidden');
            startLiveCounter();
        } else {
            errorMsg.classList.remove('hidden');
        }
    }

    passSubmitBtn.addEventListener('click', checkCredentials);
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCredentials();
    });
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkCredentials();
    });

    // 4. العداد الزمني (من تاريخ 16 فبراير 2026 حتى الوقت الحالي)
    function startLiveCounter() {
        // ضبط تاريخ البداية: 16 فبراير 2026
        const startDate = new Date('2026-02-16T00:00:00'); 

        function updateCounter() {
            const now = new Date();
            const diffInMs = now - startDate;

            // إذا كان التاريخ الحالي قبل تاريخ البداية
            if (diffInMs < 0) {
                document.getElementById('months-val').textContent = 0;
                document.getElementById('days-val').textContent = 0;
                document.getElementById('hours-val').textContent = '00';
                document.getElementById('minutes-val').textContent = '00';
                document.getElementById('seconds-val').textContent = '00';
                return;
            }

            const secondsTotal = Math.floor(diffInMs / 1000);
            const minutesTotal = Math.floor(secondsTotal / 60);
            const hoursTotal = Math.floor(minutesTotal / 60);
            const daysTotal = Math.floor(hoursTotal / 24);

            const approxMonths = Math.floor(daysTotal / 30.4375);
            
            const hours = hoursTotal % 24;
            const minutes = minutesTotal % 60;
            const seconds = secondsTotal % 60;

            document.getElementById('months-val').textContent = approxMonths;
            document.getElementById('days-val').textContent = daysTotal;
            document.getElementById('hours-val').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes-val').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds-val').textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        updateCounter();
        setInterval(updateCounter, 1000);
    }

});