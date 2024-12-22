"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Kayıt route'u
router.post('/register', userController_1.register);
// Giriş route'u
router.post('/login', userController_1.login);
// Test route'u (kimlik doğrulama gerekli)
router.get('/me', auth_1.auth, (req, res) => {
    res.json({ message: 'Korumalı route\'a erişim başarılı' });
});
exports.default = router;
