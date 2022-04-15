const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const appSchema = new Schema({
    name: {
        type: String, required: true
    },
    version: {
        type: String, required: true
    },
    host: {
        type: String, required: true
    }
}, { timestamps: true });

appSchema.statics.findOrCreate = async function(app) {
    const model = await this.findOne(app).exec();
    return model ? model : await this.create(app);
}

const App = model('App', appSchema);

module.exports = App;
