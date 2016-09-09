import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

export default router;
