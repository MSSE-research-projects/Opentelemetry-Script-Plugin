const Span = require("../db/mongo/models/Span");
const Session = require("../db/mongo/models/Session");
const { SessionRecord } = require("../db/sqlite/db").sequelize.models;

class Aggregator {

    template = {
        taskId: "",
        taskStart: 0,
        taskEnd: 0,
        steps: 0,
        clicks: 0,
        back: 0,
        navigations: 0,
        pauses: 0,
        crashes: 0,
        extraInformation: ""
    }

    constructor(appId, sessions) {
        this.appId = appId;
        this.sessions = sessions;
    }

    async aggregateSession(session) {
        const { _id } = session;
        const spans = await Span.find({ session: _id })
            .sort('createdAt')
            .lean()
            .exec();

        const sessionAttributes = { AppId: this.appId, sessionId: _id.toString() };
        const tasksAttributes = [];
        let current = {};

        for (const span of spans) {
            // can add more logic to handle different types of span
            switch (span.name) {
                case "task-start":
                    current = {
                        ...sessionAttributes,
                        taskStart: this.hrtimeToMilliseconds(span.startTime),
                        taskEnd: null,
                        taskId: span.attributes[0].taskId,
                        alerts: 0,
                        clicks: 0,
                        back: 0,
                        navigations: 0,
                        pauses: 0,
                        crashes: 0,
                    };
                    break;
                case "task-end":
                    current.taskEnd = this.hrtimeToMilliseconds(span.endTime)
                    tasksAttributes.push(current);
                    break;
                case "alert":
                    current.alerts++;
                    break;
                case "js-error":
                    current.crashes++;
                    break;
                case "error":
                    current.crashes++;
                    break;
                case "click":
                    current.clicks++;
                    break;
                default:
                    if (span.name.startsWith("Navigation")) {
                        current.navigations++;
                    }
                    break;
            }
        }

        return tasksAttributes;
    }

    async saveSession(attributes) {
        await SessionRecord.bulkCreate(attributes);
    }

    async run() {
        for (const session of this.sessions) {
            const { _id } = session;
            await Session.findByIdAndUpdate(_id, { processingStatus: 'PROCESSING' });
            const result = await this.aggregateSession(session);
            await this.saveSession(result);
            await Session.findByIdAndUpdate(_id, { processingStatus: 'PROCESSED' });
        }
    }

    hrtimeToMilliseconds(hrtime) {
        return Math.floor(hrtime[0] * 1000000 + hrtime[1] / 1000)
    }

}

module.exports = Aggregator;
