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
let msgExtra = new String(".Com:. ");
let msgBebida = new String(".E:. ");
let msgInfo = new String(".*Informações:* . ");
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
const montarMsg = (txtNome, txtEnd) => {
  let pedidoFinal = msgPedido.concat(produto, "*");
  pedidoFinal = pedidoFinal.concat(".");

  //Montar pedidos extra
  if (extraSelecionados.length > 0) {
    extraSelecionados.map((e) => {
      msgExtra += `> ${e}.`;
    });
    pedidoFinal = pedidoFinal.concat(msgExtra);
  }

  //Montar pedidos bebidas
  if (bebidasSelecionados.length > 0) {
    bebidasSelecionados.map((e) => {
      msgBebida += `> ${e}.`;
    });
    pedidoFinal = pedidoFinal.concat(msgBebida);
  }

  //Montar Lista completa
  for (let i = 0; i <= pedidoFinal.length; i++) {
    pedidoFinal = pedidoFinal.replace(",", ".");
    pedidoFinal = pedidoFinal.replace(".", "%0A");
    pedidoFinal = pedidoFinal.replace(" ", "%20");
    pedidoFinal = pedidoFinal.replace("> ", "- ");
  }

  //Montar endereço
  msgInfo = msgInfo.concat("*Nome:* ", txtNome, " . ");
  msgInfo = msgInfo.concat("*Endereço:* ", txtEnd, " . ");
  pedidoFinal += msgInfo;

  //Finalizar
  for (let i = 0; i <= pedidoFinal.length; i++) {
    pedidoFinal = pedidoFinal.replace(",", ".");
    pedidoFinal = pedidoFinal.replace(".", "%0A");
    pedidoFinal = pedidoFinal.replace(" ", "%20");
    pedidoFinal = pedidoFinal.replace("> ", "- ");
  }

  // Realizando o pedido ao clicar no botão
  let url = new String(
    "https://api.whatsapp.com/send?phone=5511941810121&text="
  );
  url = url.concat(pedidoFinal);
  window.location = url;
};

//Exibir o formulario de comfirmação
const finalizar = () => {
  const formConfirmar = document.createElement("div");
  formConfirmar.setAttribute("class", "fundoForm");
  formConfirmar.innerHTML = `    
  <div class="formCard" id="formCard">
      <div class="bg">
          <div class="form">
              <h1 id="formText">Informações Extras</h1>
              <div class="inputContainer">
                  <input required="required" id="txtNome" class="inputField" placeholder="Seu Nome" type="text">
                  <label class="usernameLabel" for="inputField">Seu Nome</label>
                  <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
              </div>
              <div class="inputContainer">
                  <input required="required" id="txtEnd" class="inputField" placeholder="Seu Endereço" type="text">
                  <label class="usernameLabel" for="inputField">Seu Endereço</label>
                  <svg viewBox="-3 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#d62008" class="userIcon"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pin_fill_sharp_circle [#634]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-223.000000, -5399.000000)" fill="#d62008"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M174,5248.219 C172.895,5248.219 172,5247.324 172,5246.219 C172,5245.114 172.895,5244.219 174,5244.219 C175.105,5244.219 176,5245.114 176,5246.219 C176,5247.324 175.105,5248.219 174,5248.219 M174,5239 C170.134,5239 167,5242.134 167,5246 C167,5249.866 174,5259 174,5259 C174,5259 181,5249.866 181,5246 C181,5242.134 177.866,5239 174,5239" id="pin_fill_sharp_circle-[#634]"> </path> </g> </g> </g> </g></svg>
              </div>
              <button class="cssbuttons-io-button" id="btnComfirmar">
                  Comfirmar
                  <div class="icon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>               
                <button id="btnCancel">
                  Cancelar
                </button>   
          </div>
      </div>
      <div class="blob"></div>
  </div>`;
  document.body.appendChild(formConfirmar);
  const btnCancel = document.getElementById("btnCancel");
  btnCancel.addEventListener("click", () => {
    formConfirmar.remove();
  });
  const btnComfirmar = document.getElementById("btnComfirmar");
  btnComfirmar.addEventListener("click", () => {
    const txtNome = document.getElementById("txtNome");
    const txtEnd = document.getElementById("txtEnd");
    if (txtNome.value == "" || txtEnd.value == "") {
      const formText = document.getElementById("formText");
      formText.innerHTML = "Valores vazios!!";
      formText.style.animation =
        "shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both";
    } else {
      montarMsg(txtNome.value, txtEnd.value);
    }
  });
};

btnPedir.addEventListener("click", () => {
  finalizar();
  // montarMsg();
});
