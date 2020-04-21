var schedule = require("node-schedule");

const start = async function start(client) {
  //* assignment loop
  schedule.scheduleJob({ second: 14 }, function () {
    client.sendText("558296130940@c.us", "Mensagem de verificação");
    console.log("Gatilho de execução foi aceionado!");
  });
};

module.exports = {
  start: start,
};
