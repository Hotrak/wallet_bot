"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class Payments {
    get() {
        return JSON.parse(fs_1.default.readFileSync("data.json").toString());
    }
    store(data) {
        const storedData = this.get();
        const payment = {
            id: (0, uuid_1.v1)(),
            categoryId: 1,
            sum: data.sum,
            date: new Date(),
        };
        storedData.push(payment);
        fs_1.default.writeFile('data.json', JSON.stringify(storedData), () => { });
    }
}
exports.Payments = Payments;
//# sourceMappingURL=Payments.js.map