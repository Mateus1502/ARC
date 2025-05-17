const quizz = {
  nome: "Quiz sobre Hardware",
  perguntas: [
    {
      pergunta: "1-O que é a ALU (unidade lógica aritmética) e qual a sua principal função?",
      name: 'q1',
      respostas: [
        { value: "r1", resposta: "Memória utilizada para armazenar dados temporários e dispositivos de entrada e saída.", certo: false },
        { value: "r2", resposta: "Memória secundária usada para armazenar resultados de cálculos", certo: false },
        { value: "r3", resposta: "Parte da CPU que realiza operações lógicas e aritméticas", certo: true },
        { value: "r4", resposta: "Unidade da CPU responsável por controlar os dispositivos de entrada e saída.", certo: false },
      ]
    },
    {
      pergunta: "2-Qual o tipo de memória tem a menor capacidade e maior velocidade?",
      name: 'q2',
      respostas: [
        { value: "r1", resposta: "Relâmpago Marquinhos.", certo: false },
        { value: "r2", resposta: "Registradores.", certo: true },
        { value: "r3", resposta: "Memória RAM.", certo: false },
        { value: "r4", resposta: "Sonic.", certo: false },
      ]
    },
    {
      pergunta: "3-Quais são as etapas do ciclo de instrução na ordem correta?",
      name: 'q3',
      respostas: [
        { value: "r1", resposta: "Armazenar, buscar, executar, decodificar.", certo: false },
        { value: "r2", resposta: "Buscar, decodificar, executar, armazenar.", certo: true },
        { value: "r3", resposta: "Pescar, operar, virgoliniiiii, rapidez.", certo: false },
        { value: "r4", resposta: "Decodificar, executar, buscar, armazenar.", certo: false },
      ]
    },
    {
      pergunta: "4-Qual a principal função dos barramentos em um computador?",
      name: 'q4',
      respostas: [
        { value: "r1", resposta: "Executar cálculos matemáticos.", certo: false },
        { value: "r2", resposta: "Armazenar arquivos do sistema.", certo: false },
        { value: "r3", resposta: "Barrar vírus.", certo: false },
        { value: "r4", resposta: "Transportar dados entre os componentes.", certo: true },
      ]
    },
    {
      pergunta: "5-O que diferencia memória cache da memória RAM?",
      name: 'q5',
      respostas: [
        { value: "r1", resposta: "A cache é mais rápida e armazena dados mais acessados.", certo: true },
        { value: "r2", resposta: "A cache é mais lenta e mais barata.", certo: false },
        { value: "r3", resposta: "A RAM armazena instruções já executadas.", certo: false },
        { value: "r4", resposta: "A RAM substitui o HD na execução de programas.", certo: false },
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  criarFormulario();

  document.getElementById('form_quizz').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const totalAcertos = validaRespostasComFeedback(formData);

    setTimeout(() => {
      window.location.href = `resultado.html?quantidade_acertada=${totalAcertos}&quantidade_perguntas=${quizz.perguntas.length}`;
    }, 700);
  });
});
//Criação do form
function criarFormulario() {
  const container = document.getElementById('form_quizz');
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.height = "100vh";
  container.style.backgroundImage = "url('./ARC-quizz2.jpg')";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";
  container.style.padding = "20px";

  const titulo = document.createElement('h1');
  titulo.innerText = quizz.nome;
  container.appendChild(titulo);

  quizz.perguntas.forEach((pergunta, idx) => {
    const divPergunta = document.createElement('div');
    divPergunta.style.marginBottom = '20px';

    const pPergunta = document.createElement('p');
    pPergunta.innerText = pergunta.pergunta;

    const ulRespostas = document.createElement('ul');
    ulRespostas.style.listStyle = 'none';
    ulRespostas.style.padding = '0';

    pergunta.respostas.forEach(resposta => {
      const li = document.createElement('li');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = pergunta.name;
      input.value = resposta.value;
      input.id = pergunta.name + '_' + resposta.value;

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.innerText = resposta.resposta;

      li.appendChild(input);
      li.appendChild(label);
      ulRespostas.appendChild(li);
    });

    // Botão Verificar para cada pergunta
    const btnVerificar = document.createElement('button');
    btnVerificar.type = 'button'; // para não submeter o form
    btnVerificar.innerText = 'Verificar';
    btnVerificar.style.marginTop = '10px';

    // Área para mostrar feedback individual da pergunta
    const feedback = document.createElement('p');
    feedback.classList.add('feedback');
    feedback.style.fontWeight = 'bold';

    btnVerificar.addEventListener('click', () => {
      verificarResposta(pergunta, divPergunta, feedback);
    });

    divPergunta.appendChild(pPergunta);
    divPergunta.appendChild(ulRespostas);
    divPergunta.appendChild(btnVerificar);
    divPergunta.appendChild(feedback);
    container.appendChild(divPergunta);
  });

  const btnEnviar = document.createElement('button');
  btnEnviar.type = 'submit';
  btnEnviar.innerText = 'Enviar respostas';
  container.appendChild(btnEnviar);
}

function verificarResposta(pergunta, divPergunta, feedback) {
  // Busca a resposta selecionada pelo usuário nessa pergunta
  const respostaEscolhidaInput = divPergunta.querySelector(`input[name="${pergunta.name}"]:checked`);
  const respostaCorreta = pergunta.respostas.find(r => r.certo);

  if (!respostaEscolhidaInput) {
    feedback.innerText = 'Selecione uma resposta antes de verificar.';
    feedback.style.color = 'orange';
    return;
  }

  const respostaUsuario = pergunta.respostas.find(r => r.value === respostaEscolhidaInput.value);

  if (respostaUsuario.certo) {
    feedback.innerText = 'Resposta correta! ✅';
    feedback.style.color = 'green';
  } else {
    feedback.innerText = `Resposta errada ❌`;
    feedback.style.color = 'red';
  }
}


function validaRespostasComFeedback(formData) {
  const respostas = {};
  for (let [key, value] of formData.entries()) {
    respostas[key] = value;
  }

  const container = document.getElementById('form_quizz');
  let totalAcertos = 0;

  quizz.perguntas.forEach((pergunta, idx) => {
    const respostaEscolhida = respostas[pergunta.name];
    const respostaCorreta = pergunta.respostas.find(r => r.certo);
    const respostaUsuario = pergunta.respostas.find(r => r.value === respostaEscolhida);

    const divPergunta = container.children[idx + 1]; 

    const feedbackAntigo = divPergunta.querySelector('.feedback');
    if (feedbackAntigo) feedbackAntigo.remove();

    const feedback = document.createElement('p');
    feedback.classList.add('feedback');
    feedback.style.fontWeight = 'bold';

    if (respostaUsuario && respostaUsuario.certo) {
      feedback.innerText = 'Resposta correta! ✅';
      feedback.style.color = 'green';
      totalAcertos++;
    } else {
      feedback.innerText = `Resposta errada ❌.`;
      feedback.style.color = 'red';
    }

    divPergunta.appendChild(feedback);
  });

  return totalAcertos;
}
