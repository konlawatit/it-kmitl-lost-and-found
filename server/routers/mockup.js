const express = require('express');
const router = express.Router();

//const db = require('../mysql');

router.get('/test', (req, res) => {
    try {
        res.status(200).send('Mocup Testing')
    } catch (err) {
        res.status(404).send(err)
    }
})

module.exports = router;