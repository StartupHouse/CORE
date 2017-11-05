const express = require('express');
const router = express.Router();

const Member = require('../server/model/Member');

/* GET members list. */
router.get('/', (req, res, next) => {
    Member.find({}, function (err, members) {
        const retArray = [];
        for (let member of members) retArray.push(member.getJSON())
        res.json(retArray)
    })
});

/* GET member by Username. */
router.get('/:username', (req, res, next) => {
    Member.findOneByUsername(req.params.username, (err, member) => {
        res.json(member.getJSON())
    })
});

module.exports = router;
