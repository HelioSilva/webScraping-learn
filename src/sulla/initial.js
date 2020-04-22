var schedule = require("node-schedule");
var controlIFood = require("../ifood/controllerIfood");

const start = async function start(client) {
  //* assignment loop
  await schedule.scheduleJob(" */3 * * * * ", async function () {
    console.log("Inicio da execução do gatilho!");
    await client.sendText("558296130940@c.us", "Gatilho iniciado...");
    await controlIFood.main();

    // for (let i = 0; i < 1; i++) {
    //   const element = anyProds[i];
    //   await client.sendText(
    //     "558296130940@c.us",
    //     `${element.nome} \n ${element.produtos[0].nomeProduto} \n Preço: ${element.produtos[0].valorDesconto}`
    //   );
    // }

    console.log("Fim da execução do gatilho!");
  });
};

module.exports = {
  start: start,
};
