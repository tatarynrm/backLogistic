import bot from "../index.js";

export const botStart = (program) => {
  program.command("start", async (ctx) => {
    if (adminRights(ctx)) {
      ctx.replyWithHTML("Оберіть тип заявки", {
        reply_markup: {
          keyboard: [
            [{ text: `Заявки в процесі` }, { text: `Заявки оплачені` }],
            [{ text: `Заявки не оплачені` }, { text: `Дохід` }],
          ],
          resize_keyboard: true,
        },
      });
    } else {
      ctx.reply("У вас немає доступу");
    }
  });
};
