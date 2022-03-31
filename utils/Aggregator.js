const Span = require("../db/mongo/models/Span");
const Session = require("../db/mongo/models/Session");
const SessionRecord = require("../db/sqlite/models/SessionRecord");

class Aggregator {

    constructor(appId, sessions) {
        this.appId = appId;
        this.sessions = sessions;
    }

    async aggregateSession(session) {
        const { _id } = session;
        const spans = await Span.find({ session: _id })
            .sort('createdAt')
            .exec();

        const attributes = { appId: this.appId, sessionId: _id };
        // TODO

        await Session.findByIdAndUpdate(_id, { isProcessed: true });

        return attributes;
    }

    async saveSession(attributes) {
        await SessionRecord.create(attributes);
    }

    async run() {
        for (const session of this.sessions) {
            const result = await this.aggregateSession(session);
            await this.saveSession(result);
        }
    }

}

module.exports = Aggregator;
