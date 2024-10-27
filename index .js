//Codigo organizaedo e finalizado.


const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogHora = document.getElementById("dialog-hora");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
const divAlerta = document.getElementById("div-alerta");
const selectTiposPonto = document.getElementById("select-tipos-ponto");

const arrayDayWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
};

function atualizarDataHora() {
    diaSemana.textContent = daySemana();
    diaMesAno.textContent = dataCompleta();
    atualizaHora();
    atualizaHoraDialog();
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }),
            error => reject(error)
        );
    });
}

function recuperaPontosLocalStorage() {
    const todosOsPontos = localStorage.getItem("registro");
    return todosOsPontos ? JSON.parse(todosOsPontos) : [];
}

function salvarRegistroLocalStorage(ponto) {
    const pontos = recuperaPontosLocalStorage();
    pontos.push(ponto);
    localStorage.setItem("registro", JSON.stringify(pontos));
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

function atualizaHoraDialog() {
    dialogHora.textContent = "Hora: " + horaCompleta();
}

function daySemana() {
    return arrayDayWeek[new Date().getDay()];
}

function dataCompleta() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function horaCompleta() {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

btnRegistrarPonto.addEventListener("click", () => {
    const ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    selectTiposPonto.value = proxPonto[ultimoPonto] || "entrada";
    dialogPonto.showModal();
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

btnDialogRegistrarPonto.addEventListener("click", async () => {
    const data = dataCompleta();
    const hora = horaCompleta();
    const tipoPonto = selectTiposPonto.value;
    const location = await getUserLocation();

    const ponto = {
        data,
        hora,
        tipo: tipoPonto,
        location,
        id: Date.now()
    };

    salvarRegistroLocalStorage(ponto);
    localStorage.setItem("tipoUltimoPonto", tipoPonto);
    dialogPonto.close();

    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");

    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);
});

setInterval(atualizarDataHora, 1000);
atualizarDataHora();
