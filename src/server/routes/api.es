import express from 'express';

const router = express.Router();

router.get('/example_get', (req, res) => {
    res.json({
        message: 'hello, nigger!'
    });
});

router.post('/example_post', (req, res) => {
    res.status(200).json({
        message: req.body.message + ' nigger!'
    }).end();
});

export default router;
