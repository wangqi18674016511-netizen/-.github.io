document.addEventListener('DOMContentLoaded', () => {
    // 1. 平滑滚动 (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. 动态问候语 (Dynamic Greeting)
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const greetingElement = document.querySelector('.greeting');
        let text = '👋 你好，我是王琪';
        
        if (hour >= 5 && hour < 12) text = '🌅 早上好，我是王琪';
        else if (hour >= 12 && hour < 18) text = '☀️ 下午好，我是王琪';
        else if (hour >= 18 && hour < 22) text = '🌇 晚上好，我是王琪';
        else text = '🌙哪怕是深夜，AI也不休息... 你好，我是王琪';
        
        if(greetingElement) greetingElement.innerText = text;
    };
    
    updateGreeting();

    // 3. 控制台彩蛋 (Console Easter Egg)
    console.log(
        "%c Hello World! %c Welcome to Wang Qi's Digital Garden ",
        "background:#6366f1; color:white; padding:4px; border-radius:4px;",
        "color:#a1a1aa;"
    );
});
