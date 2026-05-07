navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById("cam").srcObject = stream;
  })
  .catch(() => alert("Camera blocked"));