var schedule = require("node-schedule");

const start = async function start(client) {
  //* assignment loop
  schedule.scheduleJob({ hour: 14 }, function () {
    client.sendText("558296130940@c.us", "minutors");
    console.log("The answer to life, the universe, and everything!");
  });

  //const contacts = await client.getAllContacts();

  //process.stdout.write(JSON.stringify(contacts));

  //client.sendText("558296130940@c.us", "I am ready!!!");

  // client.onMessage(async (message) => {
  //   if (message.body === "File") {
  //     try {
  //       await client.sendImageAsSticker("558296130940@c.us", "./nodejs.jpg");

  //       // await client.sendFile(
  //       //   "558296130940@c.us",
  //       //   data,
  //       //   "cv.pdf",
  //       //   "Curriculum"
  //       // );
  //     } catch (error) {
  //       process.stdout.write(error);
  //     }

  //     process.stdout.write("3");
  //   }

  //   if (message.body === "Hi") {
  //     client.sendMessageWithThumb(
  //       "",
  //       "https://www.youtube.com/watch?v=rn_YodiJO6k",
  //       "Red Hot Chili Peppers - Otherside [Official Music Video]",
  //       "Description video",
  //       "558296130940@c.us"
  //     );
  //   }
  // });
};

module.exports = {
  start: start,
};
