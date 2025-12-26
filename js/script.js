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

    // 3. 导航栏滚动高亮 (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // 4. 滚动显现动画 (Scroll Reveal)
    const revealElements = document.querySelectorAll('.card, .blog-item, .section-header, .status-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });

    // ==========================================
    // 新增交互功能
    // ==========================================

    // 数据源模拟
    const projectData = {
        "NeuralCanvas": {
            title: "NeuralCanvas: AI 辅助协作白板",
            meta: "React • Socket.io • Stable Diffusion API",
            content: `
                <p>NeuralCanvas 是一个探索人机协作边界的实验性项目。传统的白板工具是静态的，而 NeuralCanvas 引入了一个"幽灵画师"——一个后台运行的 AI Agent。</p>
                <h3>核心功能</h3>
                <ul>
                    <li><strong>实时补全</strong>：当用户画出一个草图（如圆圈），AI 会猜测意图并实时生成高质量的渲染图（如一个真实的苹果）。</li>
                    <li><strong>风格迁移</strong>：支持团队协作时，不同用户可以设定不同的"画笔风格"（赛博朋克、水墨、像素风）。</li>
                </ul>
                <h3>技术挑战</h3>
                <p>最大的挑战在于延迟。为了实现"实时"感，我们优化了 Websocket 传输，并使用了 Latent Consistency Models (LCM) 将生成时间压缩到了 200ms 以内。</p>
            `
        },
        "CodeWhisperer CLI": {
            title: "CodeWhisperer CLI",
            meta: "Rust • OpenAI API • Clap",
            content: `
                <p>厌倦了记不住复杂的 <code>tar</code> 或 <code>ffmpeg</code> 命令？CodeWhisperer CLI 旨在让终端更懂自然语言。</p>
                <h3>如何工作</h3>
                <p>用户输入：<code>cw "把当前目录下所有 png 图片转为 webp 并压缩 50%"</code></p>
                <p>CLI 输出并执行：<code>mogrify -format webp -quality 50 *.png</code></p>
                <h3>安全性</h3>
                <p>为了防止 AI 产生破坏性命令（如 rm -rf /），我们引入了一个基于 AST 解析的"安全沙箱"层，高危命令必须经过用户二次确认。</p>
            `
        },
        "SentimentSonic": {
            title: "SentimentSonic: 情绪音景",
            meta: "Python • NLTK • Tone.js",
            content: `
                <p>这是一个将数据可视化的概念延伸到"数据可听化"的艺术项目。</p>
                <p>系统每天晚上会自动分析我的 Notion 日记，提取情感关键词（焦虑、平静、兴奋）。然后，基于 Tone.js 的生成音乐算法会编排一段 3 分钟的氛围音乐（Ambient Music）。</p>
                <p>我现在已经积累了超过 300 天的"情绪原声带"，这是一份独特的听觉回忆录。</p>
            `
        }
    };

    const blogData = {
        "超越Prompt": {
            title: "超越 Prompt：为什么 Context 才是王道",
            meta: "2024年5月20日 • 5分钟阅读",
            content: `
                <p>在生成式 AI 的早期，我们痴迷于寻找"完美的咒语"。但随着模型能力的提升，我发现上下文（Context）的管理才是构建真正智能应用的关键。</p>
                <h3>RAG 的本质</h3>
                <p>RAG (Retrieval-Augmented Generation) 不仅仅是一个技术栈，它是一种让 AI 拥有"外脑"的哲学。通过向量数据库，我们可以让 LLM 访问私有知识，而不需要重新训练模型。</p>
                <h3>长期记忆的挑战</h3>
                <p>目前的上下文窗口虽然越来越大（如 Gemini 的 1M token），但"注意力"依然是稀缺资源。如何在海量信息中检索到最相关的那一根针，是目前工程界最大的挑战。</p>
            `
        },
        "我的24小时实验": {
            title: "我的24小时实验：完全不动手写代码",
            meta: "2024年5月12日 • 8分钟阅读",
            content: `
                <p>规则很简单：在接下来的 24 小时内，构建一个完整的 Web 应用，但我不能敲击键盘写一行代码。所有的代码必须通过语音指令，由 AI Agent（使用 Cursor 和 GitHub Copilot）生成。</p>
                <h3>结果令人惊讶</h3>
                <p>虽然一开始我很不习惯（嗓子也确实哑了），但我发现这种模式迫使我更多地思考"架构"和"逻辑"，而不是纠结于语法细节。</p>
                <p>最终，我完成了一个基于 Next.js 的待办事项应用。虽然代码结构不够完美，但它完全可以运行。这让我重新思考了程序员在 AI 时代的定义。</p>
            `
        },
        "用户体验的恐怖谷": {
            title: "用户体验的恐怖谷",
            meta: "2024年4月28日 • 6分钟阅读",
            content: `
                <p>当聊天机器人变得太像人时，我们会感到不适。这就是 UI 设计中的"恐怖谷"效应。</p>
                <p>最近在测试一个具有"情感模拟"功能的 AI 客服时，我发现当它试图表现出"同情"时，用户反而会产生不信任感。因为我们潜意识里知道，机器是没有感情的。</p>
                <h3>设计的边界</h3>
                <p>我认为，优秀的 AI 界面应该坦诚地展示其机器属性。透明度比拟人化更重要。我们应该设计"有用"的工具，而不是"虚假"的朋友。</p>
            `
        }
    };

    // 模态框逻辑
    const modal = document.getElementById('modal');
    if (modal) {
        const modalBody = document.getElementById('modal-body');
        const closeModal = document.querySelector('.close-modal');

        // 打开模态框函数
        function openModal(title, meta, content) {
            modalBody.innerHTML = `
                <h2 class="modal-title">${title}</h2>
                <div class="modal-meta">${meta}</div>
                <div class="modal-body">${content}</div>
            `;
            modal.style.display = "block";
            // 强制重绘以触发 transition
            setTimeout(() => modal.classList.add('show'), 10);
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        }

        // 关闭模态框函数
        function closeModalFunc() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }, 300);
        }

        if (closeModal) {
            closeModal.addEventListener('click', closeModalFunc);
        }
        
        window.addEventListener('click', (e) => {
            if (e.target == modal) closeModalFunc();
        });

        // 绑定项目点击事件
        document.querySelectorAll('.project-card .link-placeholder, .project-card h3').forEach(el => {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => {
                e.preventDefault();
                // 简单通过标题查找数据（实际项目中建议用 data-id）
                const card = e.target.closest('.project-card');
                const title = card.querySelector('h3').innerText;
                
                // 模糊匹配数据键值
                const key = Object.keys(projectData).find(k => title.includes(k));
                if (key) {
                    const data = projectData[key];
                    openModal(data.title, data.meta, data.content);
                }
            });
        });

        // 绑定博客点击事件
        document.querySelectorAll('.blog-title a').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const title = e.target.innerText;
                const key = Object.keys(blogData).find(k => title.includes(k.split('：')[0])); // 简单匹配
                
                if (key) {
                    const data = blogData[key];
                    openModal(data.title, data.meta, data.content);
                }
            });
        });
    }

    // 联系表单提交模拟
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = '发送中...';
            btn.disabled = true;
            
            // 模拟网络请求
            setTimeout(() => {
                btn.innerText = '发送成功！我们会尽快联系你';
                btn.style.background = 'var(--color-success-primary, #10b981)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    console.log(
        "%c Hello World! %c Welcome to Wang Qi's Digital Garden ",
        "background:#818cf8; color:white; padding:4px; border-radius:4px;",
        "color:#a1a1aa;"
    );

    // 5. 自定义光标逻辑 (Custom Cursor Logic)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // 只有在非触屏设备上启用自定义光标
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // 实心点：无延迟跟随
            if (cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }

            // 圆环：轻微延迟跟随（使用 animate 实现更平滑效果）
            if (cursorOutline) {
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        });

        // 交互效果：悬停在可点击元素上时放大
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, .cursor-hover');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
        
        // 确保动态添加的元素也能触发（如模态框关闭按钮）
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .close-modal, .link-placeholder, input, textarea')) {
                document.body.classList.add('hovering');
            } else {
                document.body.classList.remove('hovering');
            }
        });
    }
});
