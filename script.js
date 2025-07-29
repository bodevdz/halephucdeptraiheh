const apps = {
  thispc: "Đang bảo trì...",
  garena: "Đang bảo trì...",
  chatgpt: "Đang bảo trì...",
  bluestacks: "Không chơi được fifai đâu...",
  msi: "Không chơi được fi5 đâu...",
  minecraft: "Không  chơi được...",
  profile: `
    <div class="profile-folder">
      <button onclick="showProfileInfo('info')">Giới thiệu</button>
      <button onclick="showProfileInfo('social')">Mạng xã hội</button>
      <button onclick="showProfileInfo('contact')">Liên hệ</button>
      <div id="profile-info"></div>
    </div>
  `
};

const profileDetails = {
  info: "<p>Hà Lê Phúc - (Bo) - Siuuuuuu</p>",
  social: `
    <ul>
      <li><a href="https://www.facebook.com/halee.phuc" target="_blank">Facebook</a></li>
      <li><a href="https://github.com/bodevdz" target="_blank">GitHub</a></li>
      <li><a href="https://discord.com/users/halephuc_" target="_blank">Discord</a></li>
    </ul>
  `,
  contact: `
    <ul>
      <li>Email: halephuc839021@example.com</li>
      <li>Điện thoại: 0123 456 789</li>
    </ul>
  `
};

document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("dblclick", () => openApp(icon.dataset.app));
});

function openApp(appName) {
  if (document.querySelector(`#window-${appName}`)) return;

  const appWindow = document.createElement("div");
  appWindow.className = "app-window";
  appWindow.id = `window-${appName}`;
  appWindow.innerHTML = `
    <div class="title-bar">
      <span>${appName.toUpperCase()}</span>
      <div class="window-controls">
        <button onclick="minimizeApp('${appName}')">🗕</button>
        <button onclick="maximizeApp('${appName}')">🗖</button>
        <button onclick="closeApp('${appName}')">✖</button>
      </div>
    </div>
    <div class="app-content">${apps[appName]}</div>
  `;
  document.getElementById("app-container").appendChild(appWindow);

  const taskIcon = document.createElement("div");
  taskIcon.className = "taskbar-icon";
  taskIcon.id = `task-${appName}`;
  taskIcon.innerHTML = `<img src="icons/${appName}.png" width="28" />`;
  taskIcon.onclick = () => toggleApp(appName);
  document.getElementById("taskbar-apps").appendChild(taskIcon);
}

function closeApp(appName) {
  document.getElementById(`window-${appName}`)?.remove();
  document.getElementById(`task-${appName}`)?.remove();
}

function minimizeApp(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (win) win.style.display = "none";
}

function maximizeApp(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (win) win.classList.toggle("maximized");
}

function toggleApp(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (win.style.display === "none") win.style.display = "flex";
  else win.style.display = "none";
}

function showProfileInfo(type) {
  document.getElementById("profile-info").innerHTML = profileDetails[type];
}

// Music player
document.getElementById("musicFile").addEventListener("change", function () {
  const file = this.files[0];
  const audio = document.getElementById("audioPlayer");
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.play();
  }
});

// Drag functionality
document.addEventListener('mousedown', function (e) {
  const target = e.target.closest('.title-bar');
  if (!target) return;

  const windowElement = target.closest('.app-window');
  let offsetX = e.clientX - windowElement.offsetLeft;
  let offsetY = e.clientY - windowElement.offsetTop;

  function onMouseMove(e) {
    windowElement.style.left = `${e.clientX - offsetX}px`;
    windowElement.style.top = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
