"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = express_1.Router();
const todos = [];
api.get('/todos', (req, res) => {
    res.send(todos).end();
});
api.post('/todos', (req, res) => {
});
exports.default = api;
//# sourceMappingURL=api.js.map