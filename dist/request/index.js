"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = (domain_1, path_1, data_1, ...args_1) => __awaiter(void 0, [domain_1, path_1, data_1, ...args_1], void 0, function* (domain, path, data, count = 5) {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (count === 0) {
            return reject();
        }
        const url = `https://${domain}${path}`;
        const res = yield fetch(url, data);
        if (res.ok) {
            return resolve(res);
        }
        return resolve(yield request(domain, path, data, count - 1));
    }));
});
exports.default = request;
