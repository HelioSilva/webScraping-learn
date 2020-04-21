const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const webScrapingIFood = async function (browser) {
  const page = await browser.newPage();
  page.setViewport({ width: 1024, height: 768 });
  await page.goto("https://www.ifood.com.br/delivery/maceio-al/cozinha/acai");
  //await page.screenshot({path:'exemple.png'})
  //await page.pdf({path:'exemple.pdf',format:'A4'});

  var filepath = path.join(
    __dirname,
    "./scriptsJSClient/scrapingRestaurant.js"
  );
  await page.addScriptTag({ path: require.resolve(filepath) });

  const request1 = await page.evaluate(() => {
    return resultadoBusca;
  });

  fs.writeFileSync(
    "./src/responses/restaurants.json",
    JSON.stringify(request1, null, 2)
  );

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

        if (vlorDesconto != "") {
          return {
            nomeProduto: descricao,
            valorDesconto: vlorDesconto,
            valorOriginal: vlorOriginal,
          };
        }
      });
    });

    if (requestItem.valorDesconto == "") {
      registro.pop(item);
    } else {
      item["produtos"] = requestItem;

      registro.push(item);
    }

    await page.close();
  }

  fs.writeFileSync(
    "./src/responses/prices.json",
    JSON.stringify(registro, null, 2)
  );
  return registro;
};

const main = async function () {
  const browser = await puppeteer.launch({ headless: true });

  const estabelecimentos = await webScrapingIFood(browser);
  const res = await leituraItem(browser, estabelecimentos);

  await browser.close();

  return res;
};

module.exports = {
  main,
};
