const input = document.getElementById("input-busca")

function botaoDeBusca(){
   const inputValue = input.value;
   movimentoInput()
}

function fecharInput(){
   input.style.width = '40px';
   input.style.visibility = 'hidden';
   input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
   input.style.transition = 'all 0.5s ease-in-out 0s';
   input.value = ""; /*limpar o texto escrito pelo usuario no Entry*/
}

function abrirInput(){
   input.style.visibility = 'visible';
   input.style.width = '300px';
   input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
   input.style.transition = 'all 0.5s ease-in-out 0s';
   input.value = ""; /*limpar o texto escrito pelo usuario no Entry*/
}

function movimentoInput(){
   const visibility = document.getElementById('input-busca').style.visibility
   visibility === 'hidden' ? abrirInput() : fecharInput(); /*if/else de uma linha só*/
}

input.addEventListener('keyup', function (event){
   if (event.keyCode === 13){
      const valorInput = input.value;
      movimentoInput(valorInput)
   }
})

document.addEventListener("DOMContentLoaded", () => {/*Arrow function, pesquisar sobre isso*/
   fecharInput()
})
