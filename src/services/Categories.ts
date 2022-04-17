import fs from "fs";
export interface Category {
	id: number | string,
	name: string,
}
export class Category {
	private fileName: string = "category.json"

	get() {
		return JSON.parse(fs.readFileSync(this.fileName).toString()) as Category[];
	}
	seed() {
		const categories = ["Еда Обед", "Eда магазин", "Еда доставка", "Транспорт", "Одежда", "Прочее"];

		const result: Category[] = categories.map((categoryName, index) => {
			return {
				id: index + 1,
				name: categoryName,
			}
		}) as Category[];

		fs.writeFile(this.fileName, JSON.stringify(result), () => {});
	}
}