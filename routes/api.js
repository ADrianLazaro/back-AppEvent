const router= require('express').Router();

//llega: api/<users>
router.use('/users',require('./api/users'));
router.use('/events',require('./api/event'));
router.use('/reservations',require('./api/reservation'));
router.use('/images',require('./api/image'));



module.exports = router;