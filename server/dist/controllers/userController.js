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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
// Kullanıcı kaydı
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Kullanıcı adı veya email kontrolü
        const existingUser = yield User_1.default.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Bu kullanıcı adı veya email zaten kullanılıyor'
            });
        }
        // Yeni kullanıcı oluştur
        const user = new User_1.default({
            username,
            email,
            password
        });
        yield user.save();
        // Token oluştur
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.status(201).json({
            message: 'Kayıt başarılı',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Kayıt sırasında bir hata oluştu',
            error: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});
exports.register = register;
// Kullanıcı girişi
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Kullanıcıyı bul
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Geçersiz email veya şifre'
            });
        }
        // Şifreyi kontrol et
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Geçersiz email veya şifre'
            });
        }
        // Token oluştur
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.json({
            message: 'Giriş başarılı',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Giriş sırasında bir hata oluştu',
            error: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});
exports.login = login;
