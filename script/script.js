//Funções para as fotos da página produtos
const index = [...document.getElementsByClassName("index")];
const fundo = document.getElementById("fundo");
let indexAtivo = 0;

index.map((e, index) => {
  e.addEventListener("click", () => {
    let foto = e.firstElementChild;
    fundo.src = foto.src;
    indexAtivo = index;

    atualizarMarc(indexAtivo);
    indexAtivo = null;
  });
});

const atualizarMarc = (indexAtivo) => {
  index.map((e, index) => {
    if (indexAtivo == index) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }
  });
};
atualizarMarc(indexAtivo);

//Função para realizar o pedido

const extra = [...document.getElementsByClassName("cbEscolha")];
const bebidas = [...document.getElementsByClassName("cbBebidas")];
const btnPedir = document.getElementById("btnPedir");
let msgPedido = new String("*Pedido: ");
let msgExtra = new String("Com:. ");
let msgBebida = new String("E:. ");
let produto = document.getElementById("name").innerText;
let extraSelecionados = [];
let bebidasSelecionados = [];

extra.map((esc) => {
  esc.addEventListener("click", () => {
    let selecionado = extra.filter((e) => {
      if (e.checked) {
        return e;
      }
    });
    extraSelecionados = selecionado.map((e) => {
      return e.value;
    });
  });
});

bebidas.map((esc) => {
  esc.addEventListener("click", () => {
    let selecionado = bebidas.filter((e) => {
      if (e.checked) {
        return e;
      }
    });
    bebidasSelecionados = selecionado.map((e) => {
      return e.value;
    });
  });
});

//Montar a msg

const montarMsg = () => {
  let pedidoFinal = msgPedido.concat(produto, "*");
  pedidoFinal = pedidoFinal.concat(".");
  if (extraSelecionados.length > 0) {
    extraSelecionados.map((e) => {
      msgExtra += `>${e}.`;
    });
    pedidoFinal = pedidoFinal.concat(msgExtra);
    for (let i = 0; i <= pedidoFinal.length; i++) {
      pedidoFinal = pedidoFinal.replace(",", ".");
      pedidoFinal = pedidoFinal.replace(".", "%0A");
      pedidoFinal = pedidoFinal.replace(" ", "%20");
      pedidoFinal = pedidoFinal.replace(">", "%3E");
    }
  }
  if (bebidasSelecionados.length > 0) {
    bebidasSelecionados.map((e) => {
      msgBebida += `>${e}.`;
    });
    pedidoFinal = pedidoFinal.concat(msgBebida);
    for (let i = 0; i <= pedidoFinal.length; i++) {
      pedidoFinal = pedidoFinal.replace(",", ".");
      pedidoFinal = pedidoFinal.replace(".", "%0A");
      pedidoFinal = pedidoFinal.replace(" ", "%20");
      pedidoFinal = pedidoFinal.replace(">", "%3E");
    }
  }

//   Realizando o pedido ao clicar no botão
    let url = new String(
      "https://web.whatsapp.com/send?phone=5511949335503&text="
    );
    url = url.concat(pedidoFinal);
    window.location = url;
  console.log(pedidoFinal);
};

btnPedir.addEventListener("click", () => {
  montarMsg();
});
