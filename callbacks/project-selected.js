const callback = async ({ ack, body, action, client, logger, ...rest }) => {
  console.log("arrived");
  await ack({
    options: [
      {
        text: {
          type: "plain_text",
          text: "This is from external",
        },
      },
    ],
  });
};

module.exports = callback;
