function renderHome() {
  const screen = document.getElementById("screen");

  screen.innerHTML = `
    <div class="home">

      <div class="topbar">📶 🔋</div>

      <div class="grid">

        <div onclick="openApp('chat')">💬 Chat</div>
        <div onclick="openApp('camera')">📷 Camera</div>
        <div onclick="openApp('browser')">🌐 Browser</div
        <div onclick="openSwitcher()">🌀 Apps</div>
      </div>

      <div class="dock">
        <div>📞</div>
        <div>💬</div>
        <div>⚙️</div>
      </div>

    </div>
  `;
}