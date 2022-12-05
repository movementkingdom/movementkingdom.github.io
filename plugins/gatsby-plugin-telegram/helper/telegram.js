const { input } = require("input");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

exports.getMessageHistory = async (channel) => {
  const apiId = Number(process.env.TELEGRAM_API_ID);
  const apiHash = process.env.TELEGRAM_API_HASH || "";
  const stringSession = new StringSession(process.env.TELEGRAM_SESSION);

  const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("Code ?"),
    onError: (err) => console.log(err),
  });

  console.log("You should now be connected.");
  console.log(client.session.save());

  const result = await client.invoke(
    new Api.messages.GetHistory({
      peer: channel,
      offsetId: 43,
      offsetDate: 43,
      addOffset: 0,
      limit: 100,
      maxId: 0,
      minId: 0,
      hash: BigInt("-1611815452"),
    })
  );

  return result.messages
    .filter((e) => e.className === "Message")
    .map((e) => {
      return {
        id: e.id,
        date: new Date(1000 * e.editDate),
        message: e.message,
      };
    });
};
