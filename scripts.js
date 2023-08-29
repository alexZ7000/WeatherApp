const input = document.getElementById("input-busca")
const apiKey = 'da057741bc696ee411fb52bc9eb151f6';
const clientID = `bfbd8092df4049a59f14580111c0b5e1`
const clientSecret = `813dbd1b7dc04ce4943dee3d873c5b3d`
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
         await obterTopAlbunsPorPais(resultado.sys.country)
         mostrarClimaNaTela(resultado);
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

async function obterAcessoToken(){
   const credentials = `${clientID}:${clientSecret}`;
   const encodedCredentials = btoa(credentials);

   const response = await fetch('https://accounts.spotify.com/api/token',{
      method: "POST",
      headers: {
         'Authorization': `Basic ${encodedCredentials}`,
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
   }) //o fetch pode demorar um pouco por isso ele tem que aguardar o fetch ser executado
   const data = await response.json()
   return data.access_token;
}

async function obterTopAlbunsPorPais(country){
   try {
   const accessToken = await obterAcessoToken();
   const dataAtual = obterDataAtual();
   const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${dataAtual}T09%3A00%3A00&limit=3`
   const resultado = await fetch(`${url}`, {
      headers: {
         'Authorization': `Bearer ${accessToken}`
      }
   })
   if( resultado.status === 200){
   const data = await resultado.json()
   const result = data.playlists.items.map(item => ({
      name: item.name,
      image: item.images[0].url
   }))// o método map percorre por todos os meus objetos
   console.log(result)
      mostrarMusicaNaTela(result);
   }
   else{
      throw new Error
   }
   }
   catch {
      alert("A pesquisa por MÚSICA deu errado!")
   }
}

function obterDataAtual(){
   const currentDate = new Date();
   const ano = currentDate.getFullYear();
   const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0'); //vc soma 1 pq o método getMonth ele sempre pega o mes -1
   // o método padStart obriga a minha pesquisa a ter 2 números, mesmo que o meu mes seja o mes 1, ele irá colocar o 01
   const dia = currentDate.getDate().toString().padStart(2, '0')
   return `${ano}-${mes}-${dia}`
}

const ulElement = document.querySelector('.playlist-caixa')
const liElement = ulElement.querySelectorAll('li')//pega todos os elementos dentro da tag, e colocamos ela sem nenhum ponto por conta de ser uma tag e não uma classe

function mostrarMusicaNaTela(dados){
   liElement.forEach((liElement, index) =>{
      const imgElement = liElement.querySelector('img');
      const pElement = liElement.querySelector('p');
      imgElement.src = dados[index].image;
      pElement.textContent = dados[index].name;
   })
}
