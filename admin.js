let usuariosValidos = [];

function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

function mostrarModalAviso() {
    document.getElementById('modalAviso').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalAviso').style.display = 'none';
}

function preencherTabela(usuarios = usuariosValidos) {
    const tabelaRegistros = document.getElementById('tabelaRegistros').getElementsByTagName('tbody')[0];
    tabelaRegistros.innerHTML = '';

    usuarios.forEach((usuario) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.cpf}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.numeroCadastro}</td>
            <td>
                <button onclick="prepararAtualizacao('${usuario.numeroCadastro}')">Atualizar</button>
                <button onclick="removerUsuario('${usuario.numeroCadastro}')">Remover</button>
            </td>
        `;
        tabelaRegistros.appendChild(row);
    });
}

function gerarNumeroCadastro() {
    return Math.floor(Math.random() * 1000000);
}

function adicionarUsuario() {
    const cpf = document.getElementById('novoCPF').value;
    const nome = document.getElementById('novoNome').value;

    if (!cpf || !nome) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validarCPF(cpf)) {
        mostrarModalAviso();
        return;
    }

    const numeroCadastro = gerarNumeroCadastro();
    usuariosValidos.push({ cpf, nome, numeroCadastro });
    salvarUsuarios();
    preencherTabela();

    document.getElementById('novoCPF').value = '';
    document.getElementById('novoNome').value = '';
}

function prepararAtualizacao(numeroCadastro) {
    const usuarioEncontrado = usuariosValidos.find(usuario => usuario.numeroCadastro.toString() === numeroCadastro);
    if (usuarioEncontrado) {
        document.getElementById('formAtualizacao').style.display = 'block';
        document.getElementById('atualizarCPF').value = usuarioEncontrado.cpf;
        document.getElementById('atualizarNome').value = usuarioEncontrado.nome;
        document.getElementById('atualizarNumeroCadastro').value = usuarioEncontrado.numeroCadastro;
    } else {
        alert('Usuário não encontrado.');
    }
}

function atualizarDados() {
    const cpf = document.getElementById('atualizarCPF').value;
    const nome = document.getElementById('atualizarNome').value;
    const numeroCadastro = document.getElementById('atualizarNumeroCadastro').value;

    const usuarioEncontrado = usuariosValidos.find(usuario => usuario.numeroCadastro.toString() === numeroCadastro);
    
    if (usuarioEncontrado) {
        if (!validarCPF(cpf)) {
            mostrarModalAviso();
            return;
        }

        usuarioEncontrado.cpf = cpf;
        usuarioEncontrado.nome = nome;

        salvarUsuarios();
        preencherTabela();
        mostrarModalSucesso();

        document.getElementById('formAtualizacao').style.display = 'none';
        document.getElementById('atualizarCPF').value = '';
        document.getElementById('atualizarNome').value = '';
    } else {
        alert('Usuário não encontrado para atualizar.');
    }
}

function removerUsuario(numeroCadastro) {
    const usuarioIndex = usuariosValidos.findIndex(usuario => usuario.numeroCadastro.toString() === numeroCadastro);
    
    if (usuarioIndex !== -1) {
        usuariosValidos.splice(usuarioIndex, 1);
        salvarUsuarios();
        preencherTabela();
        mostrarModalSucesso(); // Mostra o modal de sucesso
    } else {
        alert('Usuário não encontrado para remover.');
    }
}

function salvarUsuarios() {
    localStorage.setItem('usuariosValidos', JSON.stringify(usuariosValidos));
}

function carregarUsuarios() {
    const dados = localStorage.getItem('usuariosValidos');
    if (dados) {
        usuariosValidos = JSON.parse(dados);
    }
}

function buscarUsuario() {
    const numeroCadastro = document.getElementById('buscaNumeroCadastro').value;
    const usuarioEncontrado = usuariosValidos.filter(usuario => usuario.numeroCadastro.toString() === numeroCadastro);

    if (usuarioEncontrado.length > 0) {
        preencherTabela(usuarioEncontrado);
    } else {
        alert('Usuário não encontrado.');
        preencherTabela();
    }
}

window.onload = function() {
    carregarUsuarios();
    preencherTabela();
};

function mostrarModalSucesso() {
    document.getElementById('modalSucesso').style.display = 'block';
    setTimeout(fecharModalSucesso, 3000);
}

function fecharModalSucesso() {
    document.getElementById('modalSucesso').style.display = 'none';
}
