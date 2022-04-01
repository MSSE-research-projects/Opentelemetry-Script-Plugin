var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const AppRouter = require("./routes/App");
const SessionRouter = require("./routes/Session");
const SpanRouter = require("./routes/Span");
const SurveyRouter = require("./routes/Survey");
const RecordRouter = require("./routes/Record");
const SurveyQuestionRouter = require("./routes/SurveyQuestion");
const SurveyTaskRouter = require("./routes/SurveyTask");
const PreSurveyAnswerRouter = require("./routes/PreSurveyAnswer");
const PostSurveyAnswerRouter = require("./routes/PostSurveyAnswer");
const FeedbackRouter = require("./routes/Feedback");

const mongoDbInit = require("./db/mongo/db");
const sqliteDbInit = require("./db/sqlite/db").dbInit;

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
app.use(`${apiRoot}/survey-questions`, SurveyQuestionRouter);
app.use(`${apiRoot}/survey-tasks`, SurveyTaskRouter);
app.use(`${apiRoot}/presurvey-answers`, PreSurveyAnswerRouter);
app.use(`${apiRoot}/postsurvey-answers`, PostSurveyAnswerRouter);
app.use(`${apiRoot}/feedback`, FeedbackRouter);
app.use(`${apiRoot}/record`, RecordRouter);

(async () => {
    await mongoDbInit();
    await sqliteDbInit();
})();

module.exports = app;
