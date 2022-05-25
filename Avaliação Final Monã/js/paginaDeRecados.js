const usernameStorageSession = sessionStorage.getItem('usuarioLogado');
const usernameObjetoSession = JSON.parse(usernameStorageSession);
const tabela = document.getElementById('tabelaMensagens');

document.addEventListener('DOMContentLoaded', () => {
  if (!usernameObjetoSession) {
    alert('Usuário não Logado!');
    window.location.href = 'login.html';
    return;
  }
  carregarHTMLTabela();
});
function getItemLocalStorage() {
  const userInfo = JSON.parse(
    localStorage.getItem(usernameObjetoSession.username)
  );

  return userInfo;
}

function setItemLocalStorage(e) {
  localStorage.setItem(usernameObjetoSession.username, JSON.stringify(e));
}

const formularioRecados = document.getElementById('formulario-recados');

const inputDescricao = document.getElementById('input-descricao');
const inputDetalhamento = document.getElementById('input-detalhamento');

const inputSalvar = document.getElementById('input-salvar');

formularioRecados.addEventListener('submit', salvarRecados);

function salvarRecados(event) {
  event.preventDefault();
  let mensagens = getItemLocalStorage().messages;
  if (!inputDescricao.value || !inputDetalhamento.value) {
    alert('Todos os campos são de preenchimento obrigatório!');
    return;
  }

  const mensagem = {
    id: definirID(),
    descricao: inputDescricao.value,
    detalhamento: inputDetalhamento.value,
  };
  mensagens.push(mensagem);

  const userInfo = getItemLocalStorage();

  userInfo.messages = mensagens;

  setItemLocalStorage(userInfo);
  carregarHTMLTabela();
}
function carregarHTMLTabela() {
  tabela.innerHTML = `
        <tr id='linha-titulo'>
            <th>ID</th>
            <th>DESCRIÇÃO</th>
            <th>DETALHAMENTO</th>
            <th>AÇÃO</th>
        </tr>`;

  let mensagens = getItemLocalStorage().messages;
  let index = 0;
  for (const mensagem of mensagens) {
    index++;
    tabela.innerHTML += `
            <tr id='linha-tabela'>
                <td class='mensagem'>${index}</td>
                <td class='mensagem'>${mensagem.descricao}</td>
                <td class='mensagem'>${mensagem.detalhamento}</td>
                <td class='mensagem'><button type="button" id='btn-editar' onclick="editarMensagem(${mensagem.id})">EDITAR</button>
                <button id="btn-apagar" type="button" onclick="apagarMensagem(${mensagem.id})">APAGAR</button>
                </td>
            </tr>`;
  }
}
function definirID() {
  let max = 0;

  const mensagens = getItemLocalStorage().messages;
  mensagens.forEach((mensagem) => {
    if (mensagem.id > max) {
      max = mensagem.id;
    }
  });
  return max + 1;
}
function apagarMensagem(id) {
  const user = getItemLocalStorage();
  const mensagens = getItemLocalStorage().messages;

  const mensagemIndex = mensagens.findIndex((mensagem) => {
    return mensagem.id == id;
  });

  mensagens.splice(mensagemIndex, 1);

  user.messages = mensagens;

  if (confirm('Tem certeza que deseja deletar? ')) {
    setItemLocalStorage(user);
    carregarHTMLTabela();
  }
}
function editarMensagem(id) {
  const descricao = prompt('Digite a descrição');
  const detalhamento = prompt('Digite o detalhamento');

  if (!descricao || !detalhamento) {
    alert('Você precisa digitar os valores correspondentes!');
    return;
  }
  if (descricao.length > 40 || detalhamento.length > 60) {
    alert('O máximo de caracteres que podes digitar é 40 e 60!');
    return;
  }

  const userInfo = getItemLocalStorage();
  messages = userInfo.messages;
  const indexMensagem = messages.findIndex((mensagem) => mensagem.id == id);

  messages[indexMensagem].descricao = descricao;
  messages[indexMensagem].detalhamento = detalhamento;

  setItemLocalStorage(userInfo);
  carregarHTMLTabela();
}
