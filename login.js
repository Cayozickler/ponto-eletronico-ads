const cpfAdmin = "ADM"; 
let captchaValue = ""; 

function carregarUsuarios() {
    const dadosSalvos = localStorage.getItem('usuariosValidos');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
        { cpf: "111.222.333-44", nome: "João Silva", numeroCadastro: gerarNumeroCadastro() },
        { cpf: "555.666.777-88", nome: "Maria Souza", numeroCadastro: gerarNumeroCadastro() },
        { cpf: "999.888.777-66", nome: "Carlos Pereira", numeroCadastro: gerarNumeroCadastro() }
    ];
}

let usuariosValidos = carregarUsuarios();

function gerarNumeroCadastro() {
    return Math.floor(1000 + Math.random() * 9000);
}

function gerarCaptcha() {
    captchaValue = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('captchaValue').innerText = captchaValue;
}

function login() {
    const cpfInput = document.getElementById('cpf').value;
    const captchaInput = document.getElementById('captchaInput').value;
    if (captchaInput !== captchaValue) {
        document.getElementById('loginMessage').innerText = 'CAPTCHA inválido! Tente novamente.';
        gerarCaptcha();
        return;
    }
    if (cpfInput === cpfAdmin) {
        localStorage.setItem('userCPF', cpfInput);
        window.location.href = 'admin.html'; 
    } else if (validarCPF(cpfInput)) {
        const usuario = usuariosValidos.find(u => u.cpf === cpfInput);
        if (usuario) {
            localStorage.setItem('userCPF', usuario.cpf);
            localStorage.setItem('userNome', usuario.nome);
            localStorage.setItem('userNumeroCadastro', usuario.numeroCadastro);
            window.location.href = 'index.html'; 
        } else {
            document.getElementById('loginMessage').innerText = 'Acesso negado. CPF não autorizado.';
        }
    } else {
        document.getElementById('loginMessage').innerText = 'CPF inválido! Por favor, insira um CPF válido.';
    }
}

function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

function formatarCPF(cpfInput) {
    if (cpfInput.value === cpfAdmin) return; 
    let cpf = cpfInput.value.replace(/\D/g, ''); 
    if (cpf.length > 11) cpf = cpf.slice(0, 11);
    if (cpf.length > 6) cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    else if (cpf.length > 3) cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    if (cpf.length > 9) cpf = cpf.replace(/(\d{3})\.(\d{3})(\d+)/, '$1.$2-$3');
    cpfInput.value = cpf; 
}

gerarCaptcha();
