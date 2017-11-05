const db = require('./db');
const moment = require('moment');

const schema = db.Schema({
    username: String,
    password: String,
    name: String,
    gender: String,
    birthday: String,
    avatar: String,
    phone: String,
    email: String,
    membership: {
        start: { type: Date, default: Date.now },
        expire: Date
    }
});

schema.methods.introduce = function () {
    console.log(`Hey! This is ${this.name}`)
};
schema.methods.payFor = function (howManyMonths) {
    const months = howManyMonths || 1;
    this.membership.expire = moment().add(months, 'months').valueOf();
};

schema.virtual('daysToExpire').get(function () {
    return moment().diff(this.membership.expire, 'days');
});
schema.virtual('isActive').get(function () {
    return moment().diff(this.membership.expire) > 0
});
schema.virtual('age').get(function () {
    const birthday = moment(this.birthday, 'YYYY-MM-DD');
    return moment().diff(birthday, 'years');
});

module.exports = db.model('Member', schema);