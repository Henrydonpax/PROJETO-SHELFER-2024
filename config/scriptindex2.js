async function realizarLogin() {
    const email = document.getElementById('login').value;
    const senha = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', {
            email: login,
            senha: senha
        });

        console.log(response.data.message);
        alert(response.data.message);
    } catch (error) {
        console.error('Erro ao realizar login:', error.response.data.message);
        alert('Credenciais inválidas.');
    }
}
