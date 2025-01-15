/**@type {HTMLSelectElement} */
const board = document.getElementById("board");
/**@type {HTMLInputElement} */
const names = document.getElementById("name");
const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    name: names.value,
    board: board.value,
  };
  sessionStorage.setItem("FormData", JSON.stringify(formData));
  window.location.href = "/index.html";
});
