// sujestão
//     // Abrir modal
//     var modal = document.getElementById("configModal");
//         var btn = document.getElementById("openModal");
//         var span = document.getElementsByClassName("close")[0];

//         btn.onclick = function() {
//             modal.style.display = "block";
//         }

//         // Fechar modal
//         span.onclick = function() {
//             modal.style.display = "none";
//         }

//         window.onclick = function(event) {
//             if (event.target == modal) {
//                 modal.style.display = "none";
//             }
//         }

//     // Lógica das abas
//     const tabs = document.querySelectorAll('.tab');
//         const contents = document.querySelectorAll('.content');

//         tabs.forEach(tab => {
//             tab.addEventListener('click', () => {
//                 tabs.forEach(item => item.classList.remove('active'));
//                 tab.classList.add('active');

//                 const tabContent = document.getElementById(tab.getAttribute('data-tab'));
//                 contents.forEach(content => content.classList.remove('active'));
//                 tabContent.classList.add('active');
//             });
//         }); 

// Abrir e fechar o modal
const modal = document.getElementById("configModal");
const configButton = document.getElementById("configButton");
const closeButton = document.getElementsByClassName("close")[0];

// Quando clicar no botão, abre o modal
configButton.onclick = function() {
  modal.style.display = "flex";
}

// Quando clicar no X, fecha o modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// Quando clicar fora do modal, fecha
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// // Salvando configurações
// document.getElementById("saveConfig").onclick = function() {
//     const pomodoro = document.getElementById("pomodoro").value;
//     const shortBreak = document.getElementById("shortBreak").value;
//     const longBreak = document.getElementById("longBreak").value;

//     // Salvando no LocalStorage
//     localStorage.setItem("pomodoro", pomodoro);
//     localStorage.setItem("shortBreak", shortBreak);
//     localStorage.setItem("longBreak", longBreak);

//     modal.style.display = "none"; // Fecha o modal após salvar
//     alert("Configurações salvas!");
// }

