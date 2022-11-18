"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Welcome to Image Processing API");
});
app.use("/api", routes_1.default);
app.listen(PORT || process.env.PORT, () => console.log(`server is running on http://localhost:${PORT}`));
exports.default = app;
