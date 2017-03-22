import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../../../config';

const Schema = mongoose.Schema;

const Member = new Schema({
    id: String,
    password: String,
    email: String,
    lastLogged: {type:Date, default:Date.now},
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
        lastUpdated: {type:Date, default:Date.now}
    }
});

Member.statics.create = function(id, password, email){
    console.log(email);
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64');

    const member = new this({
        id,
        password: encrypted,
        email
    });

    return member.save();
};

Member.statics.findOneById = function(id){
    return this.findOne({
        id
    }).exec();
};

Member.statics.findOneByEmail = function(email){
    return this.findOne({
        email
    }).exec();
};

Member.methods.verify = function(password){
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64');

    return this.password === encrypted;
};

export default mongoose.model('Member', Member);
