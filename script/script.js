
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

//Aba de bebidas responsiva
const abaBebidas = document.createElement("article");
abaBebidas.setAttribute("class", "container-card");
abaBebidas.innerHTML = ` <h2>Bebidas</h2>
<div class="container-product">
  <div class="product-card">
    <div class="content">
      <label class="checkBox">
        <input class="cbBebidas" type="checkbox" value="coca-cola 2L" />
        <div class="transition"></div>
      </label>
    </div>
    <img
      src="../imagens/extra - bebidas/bebida1.png"
      alt="product-icon"
    />
    <h1>Coca cola 2l</h1>
    <p>R$99,99</p>
  </div>
  <div class="product-card">
  <div class="content">
    <label class="checkBox">
      <input class="cbBebidas" type="checkbox" value="Fanta Laranja 2L" />
      <div class="transition"></div>
    </label>
  </div>
  <img
    src="../imagens/extra - bebidas/bebida2.png"
    alt="product-icon"
  />
  <h1>Fanta Laranja 2L</h1>
  <p>R$99,99</p>
</div>
</div>`;
const ref = document.getElementById("ref");
ref.appendChild(abaBebidas);

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
    "https://api.whatsapp.com/send?phone=5511949335503&text="
  );
  url = url.concat(pedidoFinal);
  window.location = url;
  console.log(pedidoFinal);
};

btnPedir.addEventListener("click", () => {
  montarMsg();
});
