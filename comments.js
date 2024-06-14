// Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { check, validationResult } = require('express-validator');

// Create a comment
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('comment', 'Comment is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const comment = new Comment(req.body);
            await comment.save();
            res.send(comment);
        } catch (error) {
            console.log(error);
            res.status(500).send('There was an error');
        }
    });

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
});

module.exports = router;