//Funções para as fotos da página produtos
const index = [...document.getElementsByClassName("index")];
const fundo = document.getElementById("fundo")
let indexAtivo = 0;

index.map((e,index)=>{
    e.addEventListener("click",()=>{
        let foto = e.firstElementChild;
        fundo.src = foto.src;
        indexAtivo = index;

        atualizarMarc(indexAtivo); 
        indexAtivo = null;
    });
});

const atualizarMarc = (indexAtivo)=>{
    index.map((e,index)=>{
        if(indexAtivo == index){
            e.classList.add("active");
        }else{
            e.classList.remove("active");
        }
    });
}
atualizarMarc(indexAtivo);


