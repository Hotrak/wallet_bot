import fs from "fs";
import { v1 as uuidv1 } from 'uuid';
import { Payment } from "./Payments";

export interface Category {
	id: number | string,
	name: string,
}

export  class Category {
	get() {
		return JSON.parse(fs.readFileSync("category.json").toString()) as Category[];
	}
	seed() {

		const categories = ["Еда", "Прочее", "Транспорт", "Одежда"];

		const result: Category[] = categories.map(categoryName => {
			return {
				id: uuidv1(),
				name: categoryName,
			}
		}) as Category[];

		fs.writeFile('category.json', JSON.stringify(result), () => {});
	}
}