document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LIVE-UHRZEIT
    const updateTime = () => {
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ":" + 
                     now.getMinutes().toString().padStart(2, '0');
        if(document.getElementById('time')) document.getElementById('time').innerText = time;
        if(document.getElementById('lock-time')) document.getElementById('lock-time').innerText = time;
        if(document.getElementById('lock-time-big')) document.getElementById('lock-time-big').innerText = time;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 2. ENTSPERREN (PC & HANDY)
    window.unlockPhone = () => {
        const lock = document.getElementById('lockscreen');
        if(lock) {
            lock.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            lock.style.transform = "translateY(-110%)";
            setTimeout(() => { lock.style.display = "none"; }, 600);
        }
    };

    // 3. APPS LADEN & LOGIK AUSFÜHREN
    window.openApp = async (app) => {
        const viewport = document.getElementById('app-viewport');
        const homeBar = document.getElementById('home-bar');
        
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
            viewport.style.display = "block";
            if(homeBar) homeBar.style.display = "block";
            
            try {
                const response = await fetch(path);
                const html = await response.text();
                viewport.innerHTML = html;

                // Scripte in geladenen Dateien aktivieren
                const scripts = viewport.querySelectorAll("script");
                scripts.forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.text = oldScript.text;
                    }
                    document.body.appendChild(newScript).parentNode.removeChild(newScript);
                });
            } catch (e) {
                console.error("App konnte nicht geladen werden", e);
            }
        }
    };

    // 4. APP SCHLIESSEN
    window.closeApp = () => {
        document.getElementById('app-viewport').style.display = "none";
        const homeBar = document.getElementById('home-bar');
        if(homeBar) homeBar.style.display = "none";
    };

    // 5. HANDY-SPERRE (Standby)
    window.lockPhone = () => {
        const lock = document.getElementById('lockscreen');
        if(lock) {
            lock.style.display = "flex";
            setTimeout(() => { lock.style.transform = "translateY(0)"; }, 10);
        }
    };
});
