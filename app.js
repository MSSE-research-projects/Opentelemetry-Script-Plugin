var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const AppRouter = require("./routes/App");
const SessionRouter = require("./routes/Session");
const SpanRouter = require("./routes/Span");
const SurveyRouter = require("./routes/Survey");

const dbInit = require("./db/db");

var app = express();

const apiRoot = "/api"

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cors());

app.use(`${apiRoot}/apps`, AppRouter);
app.use(`${apiRoot}/sessions`, SessionRouter);
app.use(`${apiRoot}/spans`, SpanRouter);
app.use(`${apiRoot}/surveys`, SurveyRouter);

(async () => {
    await dbInit();
})();

module.exports = app;
