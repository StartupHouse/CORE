const db = require('./db')
const moment = require('moment')
const validator = require('validator')

const schema = db.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        farsi: {
            type: String,
            required: true
        },
        latin: {
            type: String,
            required: true
        }
    },
    lastname: {
        farsi: {
            type: String,
            required: true
        },
        latin: {
            type: String,
            required: true
        }
    },
    gender: {
        type: String,
        enum: [ 'M', 'F', 'O' ],
        required: true
    },
    birthday: {
        type: String,
        enum: [ 'M', 'F', 'O' ],
        required: true
    },
    phone: {
        type: String,
        enum: [ 'M', 'F', 'O' ],
        required: true,
        validate: {
            isAsync: true,
            validator: (phoneNumber, cb) => {
                const phoneRegex = /09\d{9}/;
                const msg = phoneNumber + ' is not a valid phone number!';
                cb(phoneRegex.test(phoneNumber), msg);
            }
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail
        }
    },
    membership: {
        start: { type: Date, default: Date.now },
        expire: { type: Date, default: Date.now }
    }
})

schema.methods.introduce = function () {
    console.log(`Hey! This is ${this.name}`)
}
schema.methods.payFor = function (howManyMonths) {
    const months = howManyMonths || 1;
    this.membership.expire = moment().add(months, 'months').valueOf();
}

schema.methods.getJSON = function () {
    return {
        username: this.username,
        name: this.name,
        lastname: this.lastname,
        age: this.age,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        membership: this.membership
    }
}

schema.statics.findOneByUsername = function (username, cb) {
    return this.findOne({ username: new RegExp(username, 'i') }, cb);
}

schema.virtual('daysToExpire').get(function () {
    return moment().diff(this.membership.expire, 'days');
})
schema.virtual('isActive').get(function () {
    return moment().diff(this.membership.expire) > 0
})
schema.virtual('age').get(function () {
    const birthday = moment(this.birthday, 'YYYY-MM-DD');
    return moment().diff(birthday, 'years');
})
schema.virtual('farsiFullName').get(function () {
    return this.name.farsi + ' ' + this.lastname.farsi;
})
schema.virtual('latinFullName').get(function () {
    return this.name.latin + ' ' + this.lastname.latin;
})

module.exports = db.model('Member', schema)