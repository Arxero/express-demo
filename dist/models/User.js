"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});
// tslint:disable-next-line: only-arrow-functions
userSchema.methods.generateAuthToken = function (id) {
    return jwt.sign({ id: id }, config_1.default.get('jwtPrivateKey') || 'test');
};
exports.UserDB = mongoose_1.default.model('User', userSchema);
function validateUser(params) {
    var schema = {
        name: joi_1.default
            .string()
            .min(3)
            .max(50)
            .required(),
        email: joi_1.default
            .string()
            .min(3)
            .max(50)
            .required()
            .email(),
        password: joi_1.default
            .string()
            .min(3)
            .max(50)
            .required(),
    };
    return joi_1.default.validate(params, schema);
}
exports.validateUser = validateUser;
//# sourceMappingURL=User.js.map