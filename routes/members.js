const express = require('express')
const router = express.Router()

// Models
const Member = require('../server/model/Member')

/* GET members list. */
router.get('/', (req, res) => {
    Member.find(req.query, function (err, members) {
        const list = []
        for (let member of members) list.push(member.getJSON())
        res.json(list)
    })
})

/* ADD new member. */
router.post('/', (req, res) => {
    const newMember = new Member(req.body)
    newMember.save((err) => {
        // if it couldn't save
        if (err) return res.status(400).json(err.errors)

        // if it successfully saved!
        res.status(200).json({ message: `${req.body.username} added successfully` })
    })
})

/* DELETE all members. */
router.delete('/', (req, res) => {
    Member.remove(req.query, () => res.status(200).json({ message: 'OK' }))
})

/* GET member by Username. */
router.get('/:username', (req, res) => {
    Member.findOneByUsername(req.params.username, (err, member) => {
        if (!member) return res.status(400).json({ message: 'user not found' });
        res.json(member.getJSON())
    })
})

/* Update member by Username. */
router.put('/:username', (req, res) => {
    Member.findOneByUsername(req.params.username, (err, member) => {
        if (!member) return res.status(400).json({ message: 'user not found' })
        member.set(req.body);
        member.save((err) => {
            if (err) return res.status(400).json({ message: 'could not update the member' })
            res.json(member.getJSON())
        })
    })
})

/* Update member by Username. */
router.delete('/:username', (req, res) => {
    Member.delete({ username: req.params.username }, (err) => {
        if (err) return res.status(400).json({ message: 'Could not delete member' })
        res.json({ message: 'OK' })
    })
})

module.exports = router
