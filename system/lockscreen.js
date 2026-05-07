function updateTime() {
  const d = new Date();
  const t = d.getHours().toString().padStart(2,'0') + ":" +
            d.getMinutes().toString().padStart(2,'0');

  const el = document.getElementById("time");
  if (el) el.innerText = t;
}

setInterval(updateTime, 1000);