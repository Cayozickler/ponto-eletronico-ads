const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

// todos conjuntos numericos (exeto ano )deve ter 2 digitos (adiconar 0 se for menor que 10)
// Retornar dia da semana por extenso(em pt-br)

function diaSemana(){
    // retornar dia da diaSemana
    const dia = new dia();
    return dia.getDia()
}

function dataCompleta(){
    const data = new date();
    return date.getDate() + "/" + (date.getMonthe() + 1)+ "/" + date.getFullYear();
}
function horaCompleta(){
    const data = new date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
diaMesAno.textContent = dataCompleta();
horaMinSeg.textContent = horaCompleta();