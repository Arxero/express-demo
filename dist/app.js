"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
process.env['NODE_CONFIG_DIR'] = __dirname + '/config';
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var logger = require('./middlewares/logger');
var debug = require('debug')('app:startup');
var courses = require('./routes/courses');
var home = require('./routes/home');
var users_1 = require("./routes/users");
var auth_1 = require("./routes/auth");
// const users = require('./routes/users');
var app = express_1.default();
var port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/public'));
app.use(helmet_1.default());
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/users', users_1.router);
app.use('/api/auth', auth_1.router);
app.use(logger);
// Configuration
// console.log('App name: ' + config.get('name'));
// console.log('Mail Password: ' + config.get('mail.password'));
if (app.get('env') === 'development') {
    app.use(morgan_1.default('tiny'));
    debug('Morgan enabled...');
}
process.env['jwtPrivateKey'] = 'asd';
// if (!config.get('jwtPrivateKey')) {
//   // set app_jwtPrivateKey=asdads
//   // console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   // process.exit(1);
// }
mongoose_1.default
    .connect('mongodb://localhost/courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(function () {
    console.log('Connected to MongoDB...');
})
    .catch(function (err) { return console.error('Count not connect to MongoDB..', err); });
app.listen(port, function () { return console.log("Listening on port " + port + "..."); });
//# sourceMappingURL=app.js.map