const express = require('express');
const router = express.Router();

const Member = require('../server/model/Member');

/* GET members list. */
router.get('/', (req, res) => {
    Member.find({}, function (err, members) {
        const list = [];
        for (let member of members) list.push(member.getJSON())
        res.json(list)
    })
});

/* GET member by Username. */
router.get('/:username', (req, res) => {
    Member.findOneByUsername(req.params.username, (err, member) => {
        res.json(member.getJSON())
    })
});

router.post('/', (req, res) => {
    res.json(req.body)
});

module.exports = router;
