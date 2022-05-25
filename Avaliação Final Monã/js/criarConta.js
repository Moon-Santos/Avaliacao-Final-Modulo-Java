const username = document.getElementById('input-username');
const password = document.getElementById('input-password');
const repeatPassword = document.getElementById('input-repeat-password');

const botaoCriarConta = document.getElementById('botao-criar-conta');

function BotarNoLocalStorage() {
  const usuarioJaExiste = localStorage.getItem(username.value);
  console.log(usuarioJaExiste);

  if (!username.value || !password.value || !repeatPassword.value) {
    alert('Todos campos são de preenchimento obrigatório!');
    return;
  } else if (password.value != repeatPassword.value) {
    alert('Os campos de senha e de repetir senha não estão iguais!');
    return;
  } else if (!usuarioJaExiste) {
    const user = {
      username: username.value,
      password: password.value,
      messages: [],
    };

    localStorage.setItem(username.value, JSON.stringify(user));
    location.href = 'login.html';
    return;
  }
  alert('Usuário já cadastrado!');
  return;
}
botaoCriarConta.addEventListener('click', BotarNoLocalStorage);
