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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const axios_1 = __importDefault(require("axios"));
const __1 = __importDefault(require(".."));
const request = (0, supertest_1.default)(__1.default);
describe("Test endpoint responses", () => {
    it("gets the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.ok).toBe(true);
    }));
    it("Bad request /api/images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images");
        expect(response.ok).toBe(false);
    }));
});
describe("Testing Endpoint Responsse", () => {
    it("Testing Image Request", () => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .get("http://localhost:3000/api/images?filename=fjord&width=200&height=200")
            .then((response) => {
            expect(response.status).toBe(200);
        });
    }));
    it("Entring image name only", () => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default
            .get("http://localhost:3000/api/images?filename=fjord")
            .then((response) => {
            expect(response.status).toBe(200);
        });
    }));
});
