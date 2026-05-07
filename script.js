document.addEventListener("DOMContentLoaded", () => {
    
    // 1. UHRZEIT
    const updateTime = () => {
        const now = new Date();
        const t = now.getHours().toString().padStart(2, '0') + ":" + 
                  now.getMinutes().toString().padStart(2, '0');
        ['time', 'lock-time-big'].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).innerText = t;
        });
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 2. ENTSPERREN (Fix für Handy & PC)
    const lockscreen = document.getElementById('lockscreen');
    const unlock = () => {
        lockscreen.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        lockscreen.style.transform = "translateY(-110%)";
        setTimeout(() => { lockscreen.style.display = "none"; }, 600);
    };

    if(lockscreen) {
        lockscreen.addEventListener('click', unlock);
        lockscreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            unlock();
        }, {passive: false});
    }

    // 3. APP ENGINE
    window.openApp = async (app) => {
        const vp = document.getElementById('app-viewport');
        const hb = document.getElementById('home-bar');
        
        let path = "";
        switch(app) {
            case 'whatsapp': path = 'apps/chat/chat.html'; break;
            case 'snake':    path = 'apps/games/snake.html'; break;
            case 'tictactoe':path = 'apps/games/tictactoe.html'; break;
            case 'games':    path = 'apps/games/gamecenter.html'; break;
            case 'camera':   path = 'apps/camera/camera.html'; break;
            case 'browser':  path = 'apps/browser/browser.html'; break;
        }

        if(path) {
            vp.style.display = "block";
            hb.style.display = "block";
            const res = await fetch(path);
            const html = await res.text();
            vp.innerHTML = html;

            // Scripte in Apps aktivieren
            const scripts = vp.querySelectorAll("script");
            scripts.forEach(old => {
                const n = document.createElement("script");
                if(old.src) n.src = old.src; else n.text = old.text;
                document.body.appendChild(n).parentNode.removeChild(n);
            });
        }
    };

    window.closeApp = () => {
        document.getElementById('app-viewport').style.display = "none";
        document.getElementById('home-bar').style.display = "none";
    };
});
