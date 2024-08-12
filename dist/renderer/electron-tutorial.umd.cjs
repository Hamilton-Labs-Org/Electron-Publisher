(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  const information = document.getElementById("info");
  const chro = document.getElementById("chrome");
  const nodejs = document.getElementById("node");
  const elect = document.getElementById("electron");
  information.innerText = `This app is using `;
  chro.innerText = `Chrome (v${versions.chrome()})`;
  nodejs.innerText = `Node.js (v${versions.node()})`;
  elect.innerText = `Electron (v${versions.electron()})`;
  const func = async () => {
    const response = await window.versions.ping();
    console.log(response);
  };
  func();
  document.getElementById("toggle-dark-mode").addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode ? "Dark" : "Light";
  });
  document.getElementById("reset-to-system").addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });
});
