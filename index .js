// Função para atualizar a data e hora atuais a cada segundo//
function updateDateTime() {

    const currentDateTime = new Date();
    document.getElementById("currentDateTime").innerText = currentDateTime.toLocaleString();

}

setInterval(updateDateTime, 1000);


// Função para exibir o popup//
function mostrarAviso(mensagem) {

    const popupAviso = document.getElementById("popupAviso");
    document.getElementById("avisoMensagem").innerText = mensagem;
    popupAviso.classList.remove("hidden");
    popupAviso.classList.add("show");

    setTimeout(() => {

        popupAviso.classList.remove("show");
        setTimeout(() => {
            popupAviso.classList.add("hidden");
        }, 500);
    }, 3000);

}


// Função para fechar o popup//
function fecharAviso() {
    const popupAviso = document.getElementById("popupAviso");

    popupAviso.classList.remove("show");
    setTimeout(() => {
        popupAviso.classList.add("hidden");
    }, 500);
}


// Função para exibir todos os registros salvos//
function mostrarRelatorio() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const relatorio = document.getElementById('relatorio');
    const relatorioContent = document.getElementById('relatorioContent');

    // Remove a classe "hidden" para mostrar o relatório
    relatorio.classList.remove("hidden");
    relatorioContent.innerHTML = ""; // Limpa o conteúdo antes de adicionar novos registros

    registros.forEach((registro, index) => {
        const div = document.createElement("div");
        div.innerHTML = 
            `${capitalize(registro.tipo)}: ${registro.data}
            <button onclick="editarRegistro(${index})">Editar</button>`;
        relatorioContent.insertBefore(div, relatorioContent.firstChild);
    });
}


// Função para editar registro//
function editarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    const registroOriginal = registros[index];

    const novoTipo = prompt('Edite o tipo de registro (entrada, saida, intervaloEntrada, intervaloSaida):', registroOriginal.tipo);
    const tiposValidos  = ['Entrada', 'Saida', 'IntervaloEntrada', 'IntervaloSaida'];

    if (!tiposValidos.includes(novoTipo)) {
        mostrarAviso("Tipo de registro inválido.");
        return;

    }

    const novaData = prompt("Edite a data e hora do registro (DD/MM/YYYY HH:MM:SS):", registroOriginal.data);
    
    if (!validarDataHora(novaData)) {
        mostrarAviso("Data e hora inválidas.");
        return;
    }

    registros[index] = { tipo: novoTipo, data: novaData };
    localStorage.setItem("registros", JSON.stringify(registros));
    mostrarRelatorio();
    mostrarAviso(`Registro atualizado para ${capitalize(novoTipo)} com sucesso!`);

}

// Formato DD/MM/YYYY HH:MM:SS//
function validarDataHora(dataHora) {
    const regex =/^(0[1-9]|[12][0-9]|30)\/(0[1-9]|1[0-2])\/(\d{4}),\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/; 
    return regex.test(dataHora);
}


// Função auxiliar//
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para registrar um ponto com a data e hora atuais//
function registrarPonto(tipo) {
    const data = new Date().toLocaleString();
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push({ tipo: tipo, data: data });
    localStorage.setItem("registros", JSON.stringify(registros));

    let mensagem;
    switch (tipo) {
        case "Entrada":
            mensagem = "!Registro de entrada concluído com sucesso!";
            break;

        case "Saida":
            mensagem = "!Registro de saída concluído com sucesso!";
            break;

        case "IntervaloEntrada":
            mensagem = "!Registro de entrada de intervalo concluído com sucesso!";
            break;

        case "IntervaloSaida":
            mensagem = "!Registro de saída de intervalo concluído com sucesso!";
            break;

    }
    mostrarAviso(mensagem);
}


function fecharRelatorio() {
    const relatorio = document.getElementById("relatorio");
    relatorio.classList.add("hidden");
}
function exibirNomeUsuario() {
    const userName = localStorage.getItem('userNome'); // Recupera o nome do usuário
    if (userName) {
        document.getElementById('userName').innerText = userName; // Exibe o nome
    }
}

// Chama a função ao carregar a página
window.onload = function() {
    exibirNomeUsuario();
   
};
