let selectedGun;
let selectedTarget;
/**@type {HTMLInputElement} */
let username = document.getElementById("username");
/**@type {HTMLSelectElement} */
let level = document.getElementById("level");
/**@type {HTMLButtonElement} */
const startButton = document.getElementById("play");
/**@type {HTMLButtonElement} */
const instructionButton = document.getElementById("instruction");
/**@type {HTMLButtonElement} */
const closeButton = document.getElementById("close-btn");

function UpdateDataSelection() {
  /**@type {HTMLInputElement} */
  const guns = document.getElementsByName("gun");

  for (const gun of guns) {
    if (gun.checked) {
      selectedGun = gun.value;
      break;
    }
  }
  /**@type {HTMLInputElement} */
  const targets = document.getElementsByName("target");
  for (target of targets) {
    if (target.checked) {
      selectedTarget = target.value;
      break;
    }
  }
}

function checkInput() {
  if (username.value.trim().length <= 0) {
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
  username.addEventListener("input", checkInput);
}
checkInput();

function saveData() {
  sessionStorage.setItem(
    "playerData",
    JSON.stringify({
      username: username.value,
      level: level.value,
      gun: selectedGun,
      gunWidth: selectedGun === "/src/asset/gun1.png" ? 542 : 689,
      gunHeight: selectedGun === "/src/asset/gun2.png" ? 422 : 508,
      target: selectedTarget,
    })
  );
}

startButton.addEventListener("click", function () {
  UpdateDataSelection();
  saveData();
  window.location.href = "/index.html";
});

const modal = document.getElementById("modal");
function AddModal() {
  modal.classList.remove("hide");
}
function HideModal() {
  modal.classList.add("hide");
}
