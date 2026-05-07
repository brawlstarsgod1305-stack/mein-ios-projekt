function load() {
  const box = document.getElementById("box");
  box.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("chat") || "[]");

  if (data.length === 0) {
    data = ["Welcome 👋"];
  }

  data.forEach(m => {
    const d = document.createElement("div");
    d.textContent = m;
    d.className = "msg";
    box.appendChild(d);
  });
}

function send() {
  const input = document.getElementById("msg");

  let data = JSON.parse(localStorage.getItem("chat") || "[]");
  data.push(input.value);

  localStorage.setItem("chat", JSON.stringify(data));

  input.value = "";
  load();
}

load();