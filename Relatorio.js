function criarRelatorio() {
    const containerRegistros = document.getElementById("container-registros");
    containerRegistros.innerHTML = "";

    let registros = JSON.parse(localStorage.getItem("registro")) || [];
    if (registros.length === 0) {
        containerRegistros.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    let registrosPorData = {};

    registros.forEach(registro => {
        let data = registro.data;
        if (!registrosPorData[data]) {
            registrosPorData[data] = [];
        }
        registrosPorData[data].push(registro);
    });

    for (const [data, registros] of Object.entries(registrosPorData)) {
        const divData = document.createElement("div");
        divData.classList.add("data-section");
        divData.innerHTML = `<h3>${data}</h3>`;
        containerRegistros.appendChild(divData);

        registros.forEach(registro => {
            const divRegistro = document.createElement("div");
            divRegistro.classList.add("registro");

            let hora = registro.hora;
            let tipo = registro.tipo;
            let obs = registro.obs || "Nenhuma observação";
            let anexo = registro.anexo ? "Sim" : "Não";

            divRegistro.innerHTML = `<p>${tipo} | ${hora} | <span class="obs">${obs}</span> | <span class="anexo">${anexo}</span></p>`;
            
            const buttonEditar = document.createElement("button");
            buttonEditar.textContent = "Editar";
            buttonEditar.onclick = () => editarRegistro(registro);
            divRegistro.appendChild(buttonEditar);

            const buttonExcluir = document.createElement("button");
            buttonExcluir.textContent = "Excluir";
            buttonExcluir.onclick = () => excluirRegistro(registro.id);
            divRegistro.appendChild(buttonExcluir);

            divData.appendChild(divRegistro);
        });
    }
}

function editarRegistro(registro) {
    let novaObs = prompt("Editar observação:", registro.obs || "");
    if (novaObs !== null) {
        let registros = JSON.parse(localStorage.getItem("registro")) || [];
        let registroAtualizado = registros.map(r => r.id === registro.id ? { ...r, obs: novaObs } : r);
        localStorage.setItem("registro", JSON.stringify(registroAtualizado));
        criarRelatorio();
    }
}

function excluirRegistro(id) {
    let registros = JSON.parse(localStorage.getItem("registro")) || [];
    registros = registros.filter(registro => registro.id !== id);
    localStorage.setItem("registro", JSON.stringify(registros));
    criarRelatorio();
}

criarRelatorio();
