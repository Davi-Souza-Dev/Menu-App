// Página do produto

//Parte do topo

const img = document.querySelectorAll(".product-img");
const fundo = document.getElementById("fundo");

fundo.style.background = `url(${img[0].src})`;
img.forEach((foto)=>{
    foto.addEventListener("click",(el)=>{
        fundo.style.background = `url(${foto.src})`;  
    });
})

