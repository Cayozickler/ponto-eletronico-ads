const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const arrayDataSemana = document.getElementById

const dialogPonto = document.getElementById("dialog-ponto");

const btnRegistrarPonto = document.getElementById("bnt-registrar-ponto");
bntRegistrarPonto.addEvetlistener("Click",() =>{
    dialogPonto.ShowModal();
});


dialogPonto.ShowModal();

// todos conjuntos numericos (exeto ano )deve ter 2 digitos (adiconar 0 se for menor que 10)
// Retornar dia da semana por extenso(em pt-br)

function diaSemana(){
    // retornar dia da diaSemana
    const dia = new dia();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta(){
    const data = new date();
    return date.getDate() + "/" + (date.getMonthe() + 1)+ "/" + date.getFullYear();
}
function horaCompleta(){
    const data = new date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function atualzarHora() {
    horaMinSeg.textContent = horaCompleta();
}

setInterval(atualzarHora, 1000); 

diaSemana.textContent = diaSemana();
diaMesAno.textContent = dataCompleta();


