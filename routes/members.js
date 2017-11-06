const express = require('express');
const router = express.Router();

// Models
const Member = require('../server/model/Member');

/* GET members list. */
router.get('/', (req, res) => {
    Member.find({}, function (err, members) {
        const list = [];
        for (let member of members) list.push(member.getJSON())
        res.json(list)
    })
});

/* ADD new member */
router.post('/', (req, res) => {

    // Checking all required fields
    for (let requiredField of required) if (!req.body[requiredField]) return res.status(400).json({
        message: `${requiredField} needed to create a new user`
    });

    // checking username existing
    Member.findOneByUsername(req.body.username, (err, member) => {
        // if user existed before
        if (member) return res.status(400).json({ message: `${req.body.username} username exists` });

        // create new user
        const newMember = new Member(req.body);
        newMember.save((err) => {

            // if it couldn't save
            if (err) return res.status(400).json({ message: err });

            // if it successfully saved!
            res.status(200).json({ message: `${req.body.username} added successfully` })
        })
    })
});

/* GET member by Username. */
router.get('/:username', (req, res) => {
    Member.findOneByUsername(req.params.username, (err, member) => res.json(member.getJSON()))
});

module.exports = router;
