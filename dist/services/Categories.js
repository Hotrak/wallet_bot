"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class Category {
    get() {
        return JSON.parse(fs_1.default.readFileSync("category.json").toString());
    }
    seed() {
        const categories = ["Еда", "Прочее", "Транспорт", "Одежда"];
        const result = categories.map(categoryName => {
            return {
                id: (0, uuid_1.v1)(),
                name: categoryName,
            };
        });
        fs_1.default.writeFile('category.json', JSON.stringify(result), () => { });
    }
}
exports.Category = Category;
//# sourceMappingURL=Categories.js.map