import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../../../config';

const Schema = mongoose.Schema;

const Member = new Schema({
    id: String,
    password: String,
    email: String,
    lastLogged: {type: Date, default: Date.now},
    profile: {
        gender: {type:String, default: ''},
        age_y: {type:String, default: ''},
        age_m: {type:String, default: ''},
        age_d: {type:String, default: ''},
        nationality: {type:String, default: ''},
        live_nationality: {type:String, default: ''},
        live_city: {type:String, default: ''},
        lang1: {type:String, default: ''},
        lang2: {type:String, default: ''},
        lang3: {type:String, default: ''},
        job: {type:String, default: ''},
        purpose: {type:String, default: ''},
        intro: {type:String, default: ''},
        lastUpdated: {type:Date, default:Date.now}
    }
});

Member.statics.create = function(id, password, email){
    const encrypted = crypto.createHmac('sha1', config.password_secret)
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
    const encrypted = crypto.createHmac('sha1', config.password_secret)
                            .update(password)
                            .digest('base64');
                            
    return this.password === encrypted;
};

Member.methods.modify = function(password, email){
    const encrypted = crypto.createHmac('sha1', config.password_secret)
                            .update(password)
                            .digest('base64');
    
    this.password = encrypted;
    this.email = email;
    return this.save();
};

Member.methods.profileModify = function(gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro){
    this.profile.gender = gender;
    this.profile.age_y = age_y;
    this.profile.age_m = age_m;
    this.profile.age_d = age_d;
    this.profile.nationality = nationality;
    this.profile.live_nationality = live_nationality;
    this.profile.live_city = live_city;
    this.profile.lang1 = lang1;
    this.profile.lang2 = lang2;
    this.profile.lang3 = lang3; 
    this.profile.job = job;
    this.profile.purpose = purpose;
    this.profile.intro = intro;
    
    return this.save();
};

export default mongoose.model('Member', Member);
