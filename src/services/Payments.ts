import fs from "fs";
import { v1 as uuidv1 } from 'uuid';

export interface Payment {
	id: string,
	categoryId: number,
	sum: number,
	date: Date,
}

export interface StorePayment {
	categoryId: number,
	sum: number,
}

export class Payments {
	get(): Payment[]{
		return JSON.parse(fs.readFileSync("data.json").toString()) as Payment[];
	}
	store(data: StorePayment):void {

		const storedData = this.get();

		const payment: Payment = {
			id: uuidv1(),
			categoryId: 1,
			sum: data.sum,
			date: new Date(),
		}

		storedData.push(payment)

		fs.writeFile('data.json', JSON.stringify(storedData), () => {});
	}
}