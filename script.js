//Tempos padrões do timer em minutos
let pomodoroTimer = 25;
let shortTimer  = 5;
let longTimer   = 15;

let localConfig = JSON.parse(localStorage.getItem("configPomo"))

if (localConfig){
    pomodoroTimer = localConfig.pomoTimer;
    shortTimer  = localConfig.shortTimer;
    longTimer   = localConfig.longTimer;

} else {
    let configPomo = {
        pomoTimer : pomodoroTimer,
        shortTimer : shortTimer,
        longTimer : longTimer
    }
    localStorage.setItem('configPomo',JSON.stringify(configPomo));
}

//Quantidades de vezes em cada fase
let qtdVoltas = 4;
let qtdPomodoro = 1;
let qtdShort = 1;
let qtdLong = 0

//Tempo inicial em segundos
let tempoSegundos = pomodoroTimer * 60

let intervalo;

//Serve para identificar em que fase estamos Ex: 1 - Pomodoro 2 - Intervalo Curto 3 - Intervalo Longo
let telaAtual = 1;  

//Puxando os elementos HTML
const timer = document.getElementById("timer");
const botaoTimer = document.getElementById("botaoTimer");
// const voltas= document.getElementById("voltas");
// const body = document.getElementById("body");

//Definindo os valores a ser mostrado no input de configuração do Pomodoro
// document.getElementById("pomoInput").value   = pomodoroTimer;
// document.getElementById("shortInput").value  = shortTimer;
// document.getElementById("longInput").value   = longTimer;

//Substituindo o texto pela a quantidade de minutos
timer.innerHTML = formatarTempo(pomodoroTimer * 60)

// Função para formatar o tempo em minutos e segundos
function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let secs = segundos % 60;
    return (minutos < 10 ? "0" + minutos : minutos) + ":" + (secs < 10 ? "0" + secs : secs);

}

//Função para reconhecer que fase estamos, muda o titulo e o tempo na tela de acordo com a fase
// function mudarTela(){
//     if (telaAtual < 3){
//         telaAtual++;
//     } else {
//         telaAtual = 1;
//     }

//     switch (telaAtual) {
//         case 1:
//             tempoSegundos = pomodoroTimer * 60
//             titulo.innerHTML = "Pomodoro Timer";
//             voltas.innerHTML = "#" + qtdPomodoro
//             body.style.backgroundColor = "red";
        
//             break;
//         case 2:
//             tempoSegundos = shortTimer * 60
//             titulo.innerHTML = "Short Timer";
//             voltas.innerHTML = "#" + qtdShort
//             body.style.backgroundColor = "blue";
//             break;
//         case 3:
//             tempoSegundos = longTimer * 60
//             titulo.innerHTML = "Long Timer";
//             body.style.backgroundColor = "green";
//             break;
//     }
//     timer.innerHTML = formatarTempo(tempoSegundos)
// }

function contador(){
     if (botaoTimer.innerHTML === "Iniciar"){
        botaoTimer.innerHTML = "Pausar";
        intervalo = setInterval(passarTempo, 1000);
     } else{
        botaoTimer.innerHTML = "Iniciar";
        clearInterval(intervalo);
     }
     
     function passarTempo(){
        timer.innerHTML = formatarTempo(tempoSegundos)

        if (tempoSegundos > 0){
            tempoSegundos--
        }
        else {
            switch (telaAtual) {
                case 1:
                    qtdPomodoro++
                    break;
                case 2:
                    qtdShort++
                default:
                    break;
            }

            botaoTimer.innerHTML = "Iniciar"
            clearInterval(intervalo);
            // mudarTela();
        }
     }
}

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

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // Carrega as tarefas do localStorage

// Função para renderizar as tarefas na lista
function renderizarTarefas() {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpa a lista existente

    tarefas.forEach((tarefa, index) => {
        const divTarefa = document.createElement('div');
        divTarefa.className = 'tarefa';

        const textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.nome;
        if (tarefa.concluida) {
            textoTarefa.style.textDecoration = 'line-through'; // Risca a tarefa concluída
        }

        const botaoConcluir = document.createElement('i');
        botaoConcluir.className = tarefa.concluida ? 'fas fa-undo' : 'fas fa-check'; // Ícone de check ou undo
        botaoConcluir.onclick = () => {
            tarefa.concluida = !tarefa.concluida; // Alterna o estado da tarefa
            salvarTarefas(); // Salva as tarefas atualizadas
            renderizarTarefas(); // Atualiza a lista
        };

        const botaoExcluir = document.createElement('i');
        botaoExcluir.className = 'fas fa-trash'; // Ícone de lixeira
        botaoExcluir.onclick = () => {
            tarefas.splice(index, 1); // Remove a tarefa do array
            salvarTarefas(); // Salva as tarefas atualizadas
            renderizarTarefas(); // Atualiza a lista
        };

        divTarefa.appendChild(textoTarefa);
        divTarefa.appendChild(botaoConcluir);
        divTarefa.appendChild(botaoExcluir);
        lista.appendChild(divTarefa);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const inputTarefa = document.getElementById('tarefa-input');
    const nomeTarefa = inputTarefa.value.trim();

    if (nomeTarefa) {
        tarefas.push({ nome: nomeTarefa, concluida: false }); // Adiciona a nova tarefa
        inputTarefa.value = ''; // Limpa o input
        salvarTarefas(); // Salva as tarefas atualizadas
        renderizarTarefas(); // Atualiza a lista
    }
}

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva as tarefas no localStorage
}

// Adiciona o evento de clique no botão de salvar
document.getElementById('tarefa-button').onclick = adicionarTarefa;

// Renderiza a lista ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarTarefas);