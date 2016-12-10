'use strict';

var _Express = require('Express');

var _Express2 = _interopRequireDefault(_Express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _Item = require('./models/Item');

var _Item2 = _interopRequireDefault(_Item);

var _ShoppingList = require('./models/ShoppingList');

var _ShoppingList2 = _interopRequireDefault(_ShoppingList);

var _socketHelpers = require('./utils/socketHelpers');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DEVELOPMENT SPECIFIC STUFF
if (process.env.NODE_ENV !== 'production') {
    require('babel-register')({
        sourceMaps: true
    });
}

// SET PWD TO REPLACE __dirname FOR HEROKU ================
process.env.PWD = process.cwd();

// CONFIG ENVIREONMENT CONSTANTS ===================
var port = process.env.PORT || 3000;

// DATABASE CONFIG =================================
_mongoose2.default.Promise = _bluebird.Promise; // Mongoose's promise is deprecated
_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/testiredux').then(function () {
    return console.log('Database connection successful!');
}).catch(function (err) {
    return console.error(err);
});

var app = (0, _Express2.default)();
var server = _http2.default.Server(app);
var io = new _socket2.default(server);

// DEVELOPMENT ENVIRONMENT STUFF (WEBPACK HMR) =========
if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config');
    var compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, // if true, then only warnings and errors are displayed
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

// EXPRESS MIDDLEWARE =================================
app.use((0, _morgan2.default)('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(_Express2.default.static(_path2.default.join(process.env.PWD, 'static'))); // Use static folder as the root for static files
app.use((0, _serveFavicon2.default)(_path2.default.join(process.env.PWD, 'static', 'favicon.ico')));

// ROUTES =============================================
app.use('/', _index2.default);

// SOCKET.IO CONFIGURATION ============================
io.on('connection', function (socket) {

    // extract listID from client URL
    var listID = socket.handshake.headers.referer.split('/').pop();

    if (listID) {
        // New client connects
        console.log('[INFO]: New connection established to list ' + listID);
        (0, _socketHelpers.socketOnConnection)(socket, listID); // set list for new connection

        // Client sends an action
        socket.on('action', function (action) {
            (0, _socketHelpers.socketActions)(socket, listID, action, io); // handle various actions
        });

        socket.on('disconnect', function () {
            console.log('[INFO]: Connection dropped from list ' + listID);
        });
    }
});

// START THE SERVER ===================================
server.listen(port, function () {
    console.log('[INFO] Listening on *:' + port);
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(port, 'port', 'server/server.js');

    __REACT_HOT_LOADER__.register(app, 'app', 'server/server.js');

    __REACT_HOT_LOADER__.register(server, 'server', 'server/server.js');

    __REACT_HOT_LOADER__.register(io, 'io', 'server/server.js');

    __REACT_HOT_LOADER__.register(compiler, 'compiler', 'server/server.js');
}();

;
//# sourceMappingURL=server.js.map