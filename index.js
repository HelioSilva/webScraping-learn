const puppeteer = require("puppeteer");
const fs = require("fs");

const run = async function (browser) {
  const page = await browser.newPage();
  page.setViewport({ width: 1024, height: 768 });
  await page.goto("https://www.ifood.com.br/delivery/maceio-al/cozinha/acai");
  //await page.screenshot({path:'exemple.png'})
  //await page.pdf({path:'exemple.pdf',format:'A4'});

  const request1 = await page.evaluate(() => {
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
  });

  fs.writeFileSync("./dados.json", JSON.stringify(request1, null, 2));

  return request1;
};

const leituraItem = async function lerItens(browser, dados) {
  let registro = [];

  //dados.length

  for (let index = 0; index < dados.length; index++) {
    const item = dados[index];

    const page = await browser.newPage();
    page.setViewport({ width: 1024, height: 768 });
    await page.goto(item.uri);

    const requestItem = await page.evaluate(() => {
      const prods = document.querySelectorAll("a.dish-card");
      return Array.from(prods).map((prod) => {
        let descricao =
          prod.querySelector("span.dish-card__description") != null
            ? prod.querySelector("span.dish-card__description").innerText
            : "";

        let vlorDesconto =
          prod.querySelector("span.dish-card__price--discount") != null
            ? prod.querySelector("span.dish-card__price--discount").firstChild
                .textContent
            : "";

        let vlorOriginal =
          prod.querySelector("span.dish-card__price--original") != null
            ? prod.querySelector("span.dish-card__price--original").innerText
            : "";

        return {
          nomeProduto: descricao,
          valorDesconto: vlorDesconto,
          valorOriginal: vlorOriginal,
        };
      });
    });

    item["produtos"] = requestItem;

    registro.push(item);

    await page.close();
  }

  fs.writeFileSync("./precos.json", JSON.stringify(registro, null, 2));
  return registro;
};

const main = async function () {
  const browser = await puppeteer.launch({ headless: true });

  const estabelecimentos = await run(browser);
  await leituraItem(browser, estabelecimentos);

  await browser.close();
};

main();
