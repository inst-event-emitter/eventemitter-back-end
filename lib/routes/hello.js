const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello world message'));
router.get('/exclamation', (req, res) => res.send('Hello world with exclamations!!!'));

module.exports = router;
