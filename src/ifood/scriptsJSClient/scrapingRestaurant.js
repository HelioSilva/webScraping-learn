const restaurantes = document.querySelectorAll("a.restaurant-card");
//const nomesRestaurantes = document.querySelectorAll('span.restaurant-name')

const resultadoBusca = Array.from(restaurantes).map((restaurante) => {
  return {
    nome: restaurante.querySelector("span.restaurant-name").innerText,
    imagem: restaurante.querySelector("img.restaurant-card__img-logo").src,
    rating: restaurante.querySelector("span.restaurant-rating").innerText,
    tempoEstimado: restaurante.querySelector("div.restaurant-card__footer")
      .innerText,
    uri: restaurante.href,
  };
});
return resultadoBusca;
