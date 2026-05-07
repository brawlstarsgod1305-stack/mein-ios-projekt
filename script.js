document.addEventListener("DOMContentLoaded", () => {
    
    // Live-Zeit für Sperrbildschirm & Statusbar
    const updateTime = () => {
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ":" + 
                     now.getMinutes().toString().padStart(2, '0');
        if(document.getElementById('time')) document.getElementById('time').innerText = time;
        if(document.getElementById('lock-time')) document.getElementById('lock-time').innerText = time;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Sperrbildschirm wegwischen/klicken
    window.unlockPhone = () => {
        const lock = document.getElementById('lockscreen');
        lock.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        lock.style.transform = "translateY(-100%)";
        setTimeout(() => lock.style.display = "none", 600);
    };

    // Apps laden
window.openApp = async (app) => {
    const viewport = document.getElementById('app-viewport');
    const homeBar = document.getElementById('home-bar');
    
    let path = "";
    // Pfade basierend auf deiner Ordnerstruktur
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
        homeBar.style.display = "block";
        
        const response = await fetch(path);
        const html = await response.text();
        viewport.innerHTML = html;

        // WICHTIG: Scripte in der geladenen HTML manuell ausführen
        const scripts = viewport.querySelectorAll("script");
        scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            newScript.text = oldScript.text;
            document.body.appendChild(newScript).parentNode.removeChild(newScript);
        });
    }
};
    window.closeApp = () => {
        document.getElementById('app-viewport').style.display = "none";
        document.getElementById('home-bar').style.display = "none";
    };
    window.unlockPhone = () => {
    const lock = document.getElementById('lockscreen');
    lock.style.transform = "translateY(-100%)";
    // Nach der Animation komplett entfernen, damit man die Apps klicken kann
    setTimeout(() => {
        lock.style.display = "none";
    }, 500);
};

// Falls du das Handy wieder sperren willst (z.B. durch Standby-Button)
window.lockPhone = () => {
    const lock = document.getElementById('lockscreen');
    lock.style.display = "flex";
    setTimeout(() => {
        lock.style.transform = "translateY(0)";
    }, 10);
};
});