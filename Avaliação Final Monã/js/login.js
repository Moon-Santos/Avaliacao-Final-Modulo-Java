const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#input-password');

togglePassword.addEventListener('click', function (e) {
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  this.classList.toggle('fa-eye-slash');
});
const botao = document.getElementById('botao-entrar');

function entrarPagina() {
  const username = document.getElementById('input-username');
  const usernameStorage = localStorage.getItem(username.value);
  const usernameObjeto = JSON.parse(usernameStorage);
  const password = document.querySelector('#input-password');

  if (!username.value || !password.value) {
    alert('Todos campos são de preenchimento obrigatório!');
    return;
  }
  if (!usernameStorage || usernameObjeto.password !== password.value) {
    alert('Usuário ou senha não existente!');
    return;
  }
  if (
    usernameObjeto.password === password.value &&
    usernameObjeto.username === username.value
  ) {
    sessionStorage.setItem('usuarioLogado', usernameStorage);
    window.location.href = 'paginaDeRecados.html';
  }
}
botao.addEventListener('click', entrarPagina);
