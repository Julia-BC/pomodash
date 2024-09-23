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
const titulo = document.getElementById("titulo");
const timer = document.getElementById("timer");
const botaoTimer = document.getElementById("botaoTimer");
const voltas= document.getElementById("voltas");
const body = document.getElementById("body");

//Definindo os valores a ser mostrado no input de configuração do Pomodoro
document.getElementById("pomoInput").value   = pomodoroTimer;
document.getElementById("shortInput").value  = shortTimer;
document.getElementById("longInput").value   = longTimer;

//Substituindo o texto pela a quantidade de minutos
timer.innerHTML = formatarTempo(pomodoroTimer * 60)

// Função para formatar o tempo em minutos e segundos
function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let secs = segundos % 60;
    return (minutos < 10 ? "0" + minutos : minutos) + ":" + (secs < 10 ? "0" + secs : secs);

}

//Função para reconhecer que fase estamos, muda o titulo e o tempo na tela de acordo com a fase
function mudarTela(){
    if (telaAtual < 3){
        telaAtual++;
    } else {
        telaAtual = 1;
    }

    switch (telaAtual) {
        case 1:
            tempoSegundos = pomodoroTimer * 60
            titulo.innerHTML = "Pomodoro Timer";
            voltas.innerHTML = "#" + qtdPomodoro
            body.style.backgroundColor = "red";
        
            break;
        case 2:
            tempoSegundos = shortTimer * 60
            titulo.innerHTML = "Short Timer";
            voltas.innerHTML = "#" + qtdShort
            body.style.backgroundColor = "blue";
            break;
        case 3:
            tempoSegundos = longTimer * 60
            titulo.innerHTML = "Long Timer";
            body.style.backgroundColor = "green";
            break;
    }
    timer.innerHTML = formatarTempo(tempoSegundos)
}

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
            mudarTela();
        }
     }
}

function pular(){
    tempoSegundos = 0;
}

function salvar(){
    //Puxando os inputs
    const pomoInput = document.getElementById("pomoInput").value;
    const shortInput = document.getElementById("shortInput").value;
    const longInput = document.getElementById("longInput").value;
    
    localStorage.setItem('configPomo', JSON.stringify({ pomoTimer: pomoInput, shortTimer: shortInput, longTimer: longInput }));
}




