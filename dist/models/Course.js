"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
exports.CourseDB = mongoose_1.default.model('Course', new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
}));
function validateCourse(params) {
    var schema = {
        name: joi_1.default
            .string()
            .min(3)
            .max(50)
            .required(),
    };
    return joi_1.default.validate(params, schema);
}
exports.validateCourse = validateCourse;
//# sourceMappingURL=Course.js.map