"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const Payments_1 = require("./services/Payments");
const Categories_1 = require("./services/Categories");
var Action;
(function (Action) {
    Action["NEW_PAY"] = "NEW_PAY";
    Action["PAY_LIST"] = "PAY_LIST";
})(Action || (Action = {}));
var State;
(function (State) {
    State["UN_SET"] = "UN_SET";
    State["WAIT_SUM"] = "WAIT_SUM";
})(State || (State = {}));
let state = State.UN_SET;
const paymentService = new Payments_1.Payments();
const categoryService = new Categories_1.Category();
// paymentService.store({
// 	categoryId: 51,
// 	sum: 3.0,
// });
const bot = new telegraf_1.Telegraf("5376522392:AAE5pYH99NjGeuGRgOB9KHvmC-l540Ql1GE");
bot.start((ctx) => {
    ctx.reply("Hello " + ctx.from.first_name + "!", telegraf_1.Markup.keyboard([
        [
            telegraf_1.Markup.button.callback("PAY", Action.NEW_PAY),
            telegraf_1.Markup.button.callback("LIST", Action.PAY_LIST),
        ]
    ])
        .resize());
});
// bot.command("keyboardC", (ctx) => {
// 	ctx.reply(
// 		"Custom buttons keyboard",
// 		Markup.keyboard([
// 			["🔍 Search", "😎 Popular"], // Row1 with 2 buttons
// 			["☸ Setting", "📞 Feedback"], // Row2 with 2 buttons
// 			["📢 Ads", "⭐️ Rate us", "👥 Share"], // Row3 with 3 buttons
// 		])
// 		.resize()
// 	);
// });
// bot.command("/first", (ctx) => {
// 	console.log("RECCC");
// });
// bot.command("keyboard", (ctx) => {
// 	ctx.reply(
// 		"Keyboard",
// 		Markup.inlineKeyboard([
// 			Markup.button.callback("First option", "first"),
// 			Markup.button.callback("Second option", "second"),
// 		])
// 	);
// });
bot.hears("PAY", (ctx) => {
    return ctx.reply("Category", telegraf_1.Markup.inlineKeyboard(categoryService.get().map(i => telegraf_1.Markup.button.callback(i.name, `category ${i.id}`))));
});
bot.on('text', (ctx) => {
    if (state == State.WAIT_SUM) {
        console.log("I GET", ctx.message);
        state = State.UN_SET;
    }
});
// bot.action(/\^category/\s, (ctx, next) => {
// 	return ctx.reply(Action.NEW_PAY +' 👍').then(() => next());
// })
bot.action(/^category\s\w+/, (ctx, next) => {
    const categoryId = ctx.match.input.split(" ")[1];
    state = State.WAIT_SUM;
    return ctx.reply(Action.NEW_PAY + ' 👍').then(() => next());
});
bot.launch();
//# sourceMappingURL=app.js.map