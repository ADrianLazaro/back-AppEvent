const router= require('express').Router();
//const User = require('../../models/user.model');
const userController = require('../../controllers/userController');

router.get('/',userController.getUsers);
//llega api/users/:<userId>
router.get('/:userId',userController.getUserById);
router.post('/',userController.createUser);
router.delete('/:userId',userController.deleteUser);
router.put('/:userId',userController.updateUser);
// router.get('./:userId/reservations',userController.getReservationsByUserId);
router.post('/login', userController.loginUser);



module.exports = router;