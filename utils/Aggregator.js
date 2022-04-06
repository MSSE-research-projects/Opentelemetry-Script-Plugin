const Span = require("../db/mongo/models/Span");
const Session = require("../db/mongo/models/Session");
const SessionRecord = require("../db/sqlite/models/SessionRecord");

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

        const sessionAttributes = { appId: this.appId, sessionId: _id };
        // TODO
        const tasksAttributes = [];

        for (const span of spans) {
            switch (span.name) {

            }
        }

        await Session.findByIdAndUpdate(_id, { isProcessed: true });

        return tasksAttributes;
    }

    async saveSession(attributes) {
        await SessionRecord.bulkCreate(attributes);
    }

    async run() {
        for (const session of this.sessions) {
            const result = await this.aggregateSession(session);
            await this.saveSession(result);
        }
    }

}

module.exports = Aggregator;
