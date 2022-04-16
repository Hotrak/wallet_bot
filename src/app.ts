import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "typegram";

import { Payments } from "./services/Payments";
import { Category } from "./services/Categories";

enum Action {
	NEW_PAY = "NEW_PAY",
	PAY_LIST = "PAY_LIST"
}

enum State {
	UN_SET = "UN_SET",
	WAIT_SUM = "WAIT_SUM",
}

let state: State = State.UN_SET;

const paymentService = new Payments();
const categoryService = new Category();

// paymentService.store({
// 	categoryId: 51,
// 	sum: 3.0,
// });

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string,
);

bot.start((ctx) => {
	ctx.reply(
		"Hello " + ctx.from.first_name + "!",
		Markup.keyboard([
			[
				Markup.button.callback("PAY", Action.NEW_PAY),
				Markup.button.callback("LIST", Action.PAY_LIST),
			]
		])
		.resize()
	);
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
	return ctx.reply("Category", Markup.inlineKeyboard(categoryService.get().map(i => Markup.button.callback(i.name, `category ${i.id}` as string))))
})

bot.on('text', (ctx) => {
	if(state == State.WAIT_SUM){
		console.log("I GET",ctx.message);
		state = State.UN_SET;

	}
});

// bot.action(/\^category/\s, (ctx, next) => {
// 	return ctx.reply(Action.NEW_PAY +' 👍').then(() => next());
// })
bot.action(/^category\s\w+/, (ctx, next) => {
	const categoryId = ctx.match.input.split(" ")[1];
	state = State.WAIT_SUM;
	
	return ctx.reply(Action.NEW_PAY +' 👍').then(() => next());
})

bot.launch();
