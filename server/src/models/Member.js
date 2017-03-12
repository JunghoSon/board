import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../../../config';

const Schema = mongoose.Schema;

const Member = new Schema({
    id: String,
    password: String,
    email: String,
    lastLogin: {type:Date, default:Date.now},
    profile: {
        gender: String,
        birth: Date,
        nationality: String,
        live: String,
        city: String,
        job: String,
        religion: String,
        purpose: String,
        introduction: String,
        lastUpdate: {type:Date, default:Date.now}
    }
});

Member.statics.create = (id, password, email) => {
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64');

    const Member = new this({
        id,
        password: encrypted,
        email
    });

    return Member.save();
};

Member.statics.findOneById = (id) => {
    return this.findOnd({
        id
    }).exec();
};

Member.methods.verify = (password) => {
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64');

    return this.password === encrypted;
};

export default mongoose.model('Member', Member);
