const input = document.getElementById("input-busca")
const apiKey = '';

function movimentoInput(inputValue){
   const visibility = document.getElementById('input-busca').style.visibility
   inputValue && procurarCidade(inputValue);
   visibility === 'hidden' ? abrirInput() : fecharInput(); /*if/else de uma linha só*/
}

function botaoDeBusca(){
   const inputValue = input.value;
   movimentoInput(inputValue)
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

input.addEventListener('keyup', function (event){
   if (event.keyCode === 13){
      const valorInput = input.value;
      movimentoInput(valorInput)
   }
})

document.addEventListener("DOMContentLoaded", () => {/*Arrow function, pesquisar sobre isso*/
   fecharInput()
})

async function procurarCidade(inputValue){
   try{
      const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric&lang=pt_br`)
      if (dados.status === 200){
         const resultado = await dados.json();
         mostrarClimaNaTela(resultado);
         console.log(resultado, '<<');
      }
      else{
         throw new Error
      }
   }catch{
      alert("A pesquisa deu errado")
   }
}

function mostrarClimaNaTela(resultado){
   document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
   document.querySelector('.temperatura').innerHTML = `${resultado.main.temp.toFixed(0)}°C`; /*a função tofixed é para determinar quantos numeros apos a virgulaqueremos, como a gnt nao quer nenhum numero apos a virgula a gente deixa o tofixed como 0*/
   document.querySelector('.maxTemperatura').innerHTML = `Máx: ${resultado.main.temp_max.toFixed(0)}°C`;
   document.querySelector('.minTemperatura').innerHTML = `Min: ${resultado.main.temp_min.toFixed(0)}°C`;
   document.querySelector('.icone-tempo').src = `./images/${resultado.weather[0].icon}.png`
}


