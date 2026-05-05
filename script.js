// ===================
// RECOMPENSAS GANHAS
// ===================

const recompensas = {
    diarios: [
        { diamantes:175, ticketsMemoria: 0, ticketsSupremo: 0 }
    ],
    semanais: [
        { diamantes: 1350, ticketsMemoria: 7, ticketsSupremo: 0 }
    ],
    mensais: [
        { diamantes: 730, ticketsMemoria: 25, ticketsSupremo: 10 }
    ],
    biSemanais: [
        { diamantes: 480, ticketsMemoria: 0, ticketsSupremo: 0 },
        { diamantes: 640, ticketsMemoria: 0, ticketsSupremo: 0 }
    ]
};

const recompensasPorBanner = {
    banner: { diamantes: 325, ticketsMemoria: 5, ticketsSupremo: 20 }
};

// ===============================
// FUNÇÃO PARA CALCULAR MESES COMPLETOS
// ===============================

function calcularMesesCompletos(dataInicial, dataFinal) {
  let meses =
    (dataFinal.getFullYear() - dataInicial.getFullYear()) * 12 +
    (dataFinal.getMonth() - dataInicial.getMonth());

  if (dataFinal.getDate() < dataInicial.getDate()) {
    meses--;
  }

  return meses;
};


// ===============================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ===============================

function calcularGanhosTotais(dataInicial, dataChegada, quantidadeBanners) {
  const inicio = new Date(dataInicial + "T00:00:00");
  const chegada = new Date(dataChegada + "T00:00:00");

  const diferencaEmMs = chegada - inicio;

  const dias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));
  const semanas = Math.floor(dias / 7);
  const meses = calcularMesesCompletos(inicio, chegada);

  let total = {
    diamantes: 0,
    ticketsMemoria: 0,
    ticketsSupremo: 0
  };

  // Recompensas diárias
  for (let i = 0; i < dias; i++) {
    total.diamantes += recompensas.diarios[0].diamantes;
    total.ticketsMemoria += recompensas.diarios[0].ticketsMemoria;
    total.ticketsSupremo += recompensas.diarios[0].ticketsSupremo;
  }

  // Recompensas semanais
  for (let i = 0; i < semanas; i++) {
    total.diamantes += recompensas.semanais[0].diamantes;
    total.ticketsMemoria += recompensas.semanais[0].ticketsMemoria;
    total.ticketsSupremo += recompensas.semanais[0].ticketsSupremo;
  }

  // Recompensas mensais
  for (let i = 0; i < meses; i++) {
    total.diamantes += recompensas.mensais[0].diamantes;
    total.ticketsMemoria += recompensas.mensais[0].ticketsMemoria;
    total.ticketsSupremo += recompensas.mensais[0].ticketsSupremo;
  }

  // Recompensas biSemanais alternadas
  for (let i = 0; i < semanas; i++) {
    const recompensaDaSemana =
      recompensas.biSemanais[i % recompensas.biSemanais.length];

    total.diamantes += recompensaDaSemana.diamantes;
    total.ticketsMemoria += recompensaDaSemana.ticketsMemoria;
    total.ticketsSupremo += recompensaDaSemana.ticketsSupremo;
  }

  // Recompensas por banner
  for (let i = 0; i < quantidadeBanners; i++) {
    total.diamantes += recompensasPorBanner.banner.diamantes;
    total.ticketsMemoria += recompensasPorBanner.banner.ticketsMemoria;
    total.ticketsSupremo += recompensasPorBanner.banner.ticketsSupremo;
  }

  return {
    dias,
    semanas,
    meses,
    total
  };
}



// ===============================
// PEGAR ELEMENTOS DO HTML
// ===============================

const campos = {
  diamantesAtuais: document.getElementById("diamantes-atuais"),
  ticketsSupremoAtuais: document.getElementById("tickets-supremo-atuais"),
  ticketsMemoriaAtuais: document.getElementById("tickets-memoria-atuais"),
  dataInicial: document.getElementById("data-inicial"),
  dataChegadaPersonagem: document.getElementById("data-chegada-personagem"),
  girosSupremo: document.getElementById("giros-supremo"),
  quantidadeBanners: document.getElementById("quantidade-banners"),
  botaoCalcular: document.getElementById("botao-calcular"),

  resultadoDiamantes: document.getElementById("resultado-diamantes"),
  resultadoTicketsMemoria: document.getElementById("resultado-tickets-memoria"),
  resultadoTicketsSupremo: document.getElementById("resultado-tickets-supremo"),

  totalDiamantes: document.getElementById("total-diamantes"),
  totalTicketsMemoria: document.getElementById("total-tickets-memoria"),
  totalTicketsSupremo: document.getElementById("total-tickets-supremo"),

  ticketsSupremoGastos: document.getElementById("tickets-supremo-gastos"),
  ticketsMemoriaGastos: document.getElementById("tickets-memoria-gastos"),

  ticketsSupremoRestantes: document.getElementById("tickets-supremo-restantes"),
  ticketsMemoriaRestantes: document.getElementById("tickets-memoria-restantes"),

  secaoCompraTickets: document.getElementById("secao-compra-tickets"),
  secaoSemRecursos: document.getElementById("secao-sem-recursos"),

  ticketsSupremoFaltantes: document.getElementById("tickets-supremo-faltantes"),
  diamantesNecessariosTickets: document.getElementById("diamantes-necessarios-tickets"),
  diamantesRestantesAposCompra: document.getElementById("diamantes-restantes-apos-compra"),

  diamantesFaltantes: document.getElementById("diamantes-faltantes"),
  maximoGirosPossiveis: document.getElementById("maximo-giros-possiveis"),

  secaoTotalObtido: document.getElementById("secao-total-obtido"),
  secaoSaldoTotal: document.getElementById("secao-saldo-total"),
  secaoTicketsGastos: document.getElementById("secao-tickets-gastos"),
  secaoTicketsRestantes: document.getElementById("secao-tickets-restantes"),

  ticketsMemoriaFaltantes: document.getElementById("tickets-memoria-faltantes"),

  diamantesNecessariosSupremo: document.getElementById("diamantes-necessarios-supremo"),

  diamantesNecessariosMemoria: document.getElementById("diamantes-necessarios-memoria"),

  maximoGirosMemoriaPossiveis: document.getElementById("maximo-giros-memoria-possiveis")
};


// ===============================
// PEGAR VALORES DIGITADOS
// ===============================

function pegarValoresDoFormulario() {
  return {
    diamantesAtuais: campos.diamantesAtuais.value,
    ticketsSupremoAtuais: campos.ticketsSupremoAtuais.value,
    ticketsMemoriaAtuais: campos.ticketsMemoriaAtuais.value,

    dataInicial: campos.dataInicial.value,
    dataChegadaPersonagem: campos.dataChegadaPersonagem.value,

    girosSupremo: campos.girosSupremo.value,
    quantidadeBanners: campos.quantidadeBanners.value
  };
};

function calcularUsoDeTickets(totalFinal, girosSupremo) {
  const girosMemoria = 100;

  const ticketsSupremoGastos = Math.min(totalFinal.ticketsSupremo, girosSupremo);
  const ticketsMemoriaGastos = Math.min(totalFinal.ticketsMemoria, girosMemoria);

  const ticketsSupremoRestantes = totalFinal.ticketsSupremo - ticketsSupremoGastos;
  const ticketsMemoriaRestantes = totalFinal.ticketsMemoria - ticketsMemoriaGastos;

  return {
    gastos: {
      ticketsSupremo: ticketsSupremoGastos,
      ticketsMemoria: ticketsMemoriaGastos
    },

    restantes: {
      ticketsSupremo: ticketsSupremoRestantes,
      ticketsMemoria: ticketsMemoriaRestantes
    }
  };
};


function calcularCompraDeTickets(totalFinal, girosSupremo) {
  const valorTicketSupremo = 150;
  const valorTicketMemoria = 100;
  const girosMemoria = 100;

  const ticketsSupremoFaltantes = Math.max(
    girosSupremo - totalFinal.ticketsSupremo,
    0
  );

  const ticketsMemoriaFaltantes = Math.max(
    girosMemoria - totalFinal.ticketsMemoria,
    0
  );

  const diamantesNecessariosSupremo =
    ticketsSupremoFaltantes * valorTicketSupremo;

  const diamantesNecessariosMemoria =
    ticketsMemoriaFaltantes * valorTicketMemoria;

  const diamantesNecessarios =
    diamantesNecessariosSupremo + diamantesNecessariosMemoria;

  let diamantesRestantes = totalFinal.diamantes;

  let ticketsSupremoComprados = 0;
  let ticketsMemoriaComprados = 0;

  // Primeiro tenta completar os giros Supremo
  if (ticketsSupremoFaltantes > 0) {
    const maximoSupremoCompravel = Math.floor(
      diamantesRestantes / valorTicketSupremo
    );

    ticketsSupremoComprados = Math.min(
      ticketsSupremoFaltantes,
      maximoSupremoCompravel
    );

    diamantesRestantes -= ticketsSupremoComprados * valorTicketSupremo;
  }

  const conseguiuSupremo =
    totalFinal.ticketsSupremo + ticketsSupremoComprados >= girosSupremo;

  // Depois tenta completar os 100 giros da Memória
  if (conseguiuSupremo && ticketsMemoriaFaltantes > 0) {
    const maximoMemoriaCompravel = Math.floor(
      diamantesRestantes / valorTicketMemoria
    );

    ticketsMemoriaComprados = Math.min(
      ticketsMemoriaFaltantes,
      maximoMemoriaCompravel
    );

    diamantesRestantes -= ticketsMemoriaComprados * valorTicketMemoria;
  }

  const maximoGirosPossiveis = Math.min(
    totalFinal.ticketsSupremo + ticketsSupremoComprados,
    girosSupremo
  );

  const maximoGirosMemoriaPossiveis = Math.min(
    totalFinal.ticketsMemoria + ticketsMemoriaComprados,
    girosMemoria
  );

  const conseguiuMemoria = maximoGirosMemoriaPossiveis >= girosMemoria;

  const conseguiuTudo = conseguiuSupremo && conseguiuMemoria;

  const diamantesFaltantes = Math.max(
    diamantesNecessarios - totalFinal.diamantes,
    0
  );

  return {
    conseguiuTudo,

    ticketsSupremoFaltantes,
    ticketsMemoriaFaltantes,

    diamantesNecessariosSupremo,
    diamantesNecessariosMemoria,
    diamantesNecessarios,

    diamantesRestantes,
    diamantesFaltantes,

    maximoGirosPossiveis,
    maximoGirosMemoriaPossiveis
  };
};



function formularioEstaCompleto(dados) {
  return (
    dados.diamantesAtuais !== "" &&
    dados.ticketsSupremoAtuais !== "" &&
    dados.ticketsMemoriaAtuais !== "" &&
    dados.dataInicial !== "" &&
    dados.dataChegadaPersonagem !== "" &&
    dados.girosSupremo !== "" &&
    dados.quantidadeBanners !== ""
  );
};



// ===============================
// CLIQUE NO BOTÃO CALCULAR
// ===============================

campos.botaoCalcular.addEventListener("click", function () {
  const dados = pegarValoresDoFormulario();

  if (!formularioEstaCompleto(dados)) {
    alert("Preencha todos os campos antes de calcular.");
    return;
  }

  const dadosNumericos = {
    diamantesAtuais: Number(dados.diamantesAtuais),
    ticketsSupremoAtuais: Number(dados.ticketsSupremoAtuais),
    ticketsMemoriaAtuais: Number(dados.ticketsMemoriaAtuais),

    dataInicial: dados.dataInicial,
    dataChegadaPersonagem: dados.dataChegadaPersonagem,

    girosSupremo: Number(dados.girosSupremo),
    quantidadeBanners: Number(dados.quantidadeBanners)
  };

  const resultado = calcularGanhosTotais(
    dadosNumericos.dataInicial,
    dadosNumericos.dataChegadaPersonagem,
    dadosNumericos.quantidadeBanners
  );

  campos.resultadoDiamantes.textContent = resultado.total.diamantes;
  campos.resultadoTicketsMemoria.textContent = resultado.total.ticketsMemoria;
  campos.resultadoTicketsSupremo.textContent = resultado.total.ticketsSupremo;

  const totalFinal = {
    diamantes: dadosNumericos.diamantesAtuais + resultado.total.diamantes,
    ticketsMemoria:
      dadosNumericos.ticketsMemoriaAtuais + resultado.total.ticketsMemoria,
    ticketsSupremo:
      dadosNumericos.ticketsSupremoAtuais + resultado.total.ticketsSupremo
  };

  campos.totalDiamantes.textContent = totalFinal.diamantes;
  campos.totalTicketsMemoria.textContent = totalFinal.ticketsMemoria;
  campos.totalTicketsSupremo.textContent = totalFinal.ticketsSupremo;

  const usoTickets = calcularUsoDeTickets(
    totalFinal,
    dadosNumericos.girosSupremo
  );

  campos.ticketsSupremoGastos.textContent =
    usoTickets.gastos.ticketsSupremo;

  campos.ticketsMemoriaGastos.textContent =
    usoTickets.gastos.ticketsMemoria;

  campos.ticketsSupremoRestantes.textContent =
    usoTickets.restantes.ticketsSupremo;

  campos.ticketsMemoriaRestantes.textContent =
    usoTickets.restantes.ticketsMemoria;

  const compraTickets = calcularCompraDeTickets(
    totalFinal,
    dadosNumericos.girosSupremo
  );

  campos.secaoTotalObtido.style.display = "block";
  campos.secaoSaldoTotal.style.display = "block";
  campos.secaoTicketsGastos.style.display = "block";
  campos.secaoTicketsRestantes.style.display = "block";

  if (compraTickets.conseguiuTudo) {
    campos.secaoCompraTickets.style.display = "block";
    campos.secaoSemRecursos.style.display = "none";

    campos.ticketsSupremoFaltantes.textContent =
      compraTickets.ticketsSupremoFaltantes;

    campos.ticketsMemoriaFaltantes.textContent =
      compraTickets.ticketsMemoriaFaltantes;

    campos.diamantesNecessariosSupremo.textContent =
      compraTickets.diamantesNecessariosSupremo;

    campos.diamantesNecessariosMemoria.textContent =
      compraTickets.diamantesNecessariosMemoria;

    campos.diamantesNecessariosTickets.textContent =
      compraTickets.diamantesNecessarios;

    campos.diamantesRestantesAposCompra.textContent =
      compraTickets.diamantesRestantes;
  } else {
    campos.secaoCompraTickets.style.display = "none";
    campos.secaoSemRecursos.style.display = "block";

    campos.diamantesFaltantes.textContent =
      compraTickets.diamantesFaltantes;

    campos.maximoGirosPossiveis.textContent =
      compraTickets.maximoGirosPossiveis;

    campos.maximoGirosMemoriaPossiveis.textContent =
      compraTickets.maximoGirosMemoriaPossiveis;
  }
});