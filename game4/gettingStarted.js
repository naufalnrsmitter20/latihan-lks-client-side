let soundMP3;
soundMP3 = new Audio("/src/asset/audio/music.wav");
soundMP3.loop = true;
/** @type {HTMLInputElement} */
const getVolumeSetting = document.querySelector(".rangeInput");
window.addEventListener("input", function () {
  soundMP3.volume = getVolumeSetting.value;
});

const onPlay = () => {
  try {
    window.location.href = "/src/screen/map.html";
  } catch (error) {
    console.log(error);
  }
};
const onClickProfile = () => {
  try {
    const form = document.getElementById("form-input");
    form.classList.remove("hide");
  } catch (error) {
    console.log(error);
  }
};
const onClickQuit = () => {
  try {
    window.location.href = "/src/screen/quit.html";
  } catch (error) {
    console.log(error);
  }
};
const onClickSound = async () => {
  try {
    if (!soundMP3) {
      soundMP3.volume = getVolumeSetting.value;
    }
    if (soundMP3.paused) {
      soundMP3.play();
    } else {
      soundMP3.pause();
    }
  } catch (error) {
    console.log(error);
  }
};
const getModalVolume = document.getElementById("manage-volume");
const onClickSettings = () => {
  try {
    getModalVolume.classList.remove("hids");
  } catch (error) {
    console.log(error);
  }
};

const onCloseSetting = () => {
  try {
    getModalVolume.classList.add("hids");
  } catch (error) {
    console.log(error);
  }
};

const fillUserName = (e) => {
  e?.preventDefault();
  try {
    const data = new FormData(e.target);
    const username = data.get("username");
    sessionStorage.setItem("formData", JSON.stringify(username));
    window.location.reload();
    const form = document.getElementById("form-input");
    form.classList.add("hide");
  } catch (error) {
    console.log(error);
  }
};

const CurrentFormData = JSON.parse(sessionStorage.getItem("formData"));
const session = (document.getElementById("session").innerText = CurrentFormData);
const setUsernameValue = (document.getElementById("username").value = CurrentFormData);
