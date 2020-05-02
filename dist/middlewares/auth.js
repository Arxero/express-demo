"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
// tslint:disable-next-line: only-arrow-functions
module.exports = function auth(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Unauthorized');
    try {
        var decoded = jwt.verify(token, config_1.default.get('jwtPrivateKey') || 'test');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token.');
    }
};
//# sourceMappingURL=auth.js.map