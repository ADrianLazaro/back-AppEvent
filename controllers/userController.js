const User = require('../models/user.model');
const Reservation = require('../models/reservation.model');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.getUsers = async (req,res)=>{
    try{
        const users = await User.find();
        return res.json(users);
    }catch(e){
        return res.status(500).send('Error');
    }
}

exports.getUserById = async (req,res)=>{
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        return res.json(user);
    } catch (error) {
       return res.status(500).send('Error'); 
    }
}

exports.createUser = async (req, res) => {
    try {
        let user;
        const { name, last_name, email, password, contact_info } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user = new User({
            name,
            last_name,
            email,
            password: hashedPassword, // Guardar la contraseña encriptada
            contact_info,
        });
        await user.save();
        return res.send(user);
    } catch (e) {
        return res.status(500).send('Error');
    }
}

exports.deleteUser = async (req,res)=>{
    try{
        console.log(req.params.userId)
        let user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({msg: 'User does not exist'});
        }
        await User.findByIdAndDelete(req.params.userId);
        return res.json({msg:'User successfully removed'});
    }catch(e){
        return res.status(500).json('Error');   
    }
}

exports.updateUser = async (req,res)=>{
    try{
        const {userId} = req.params;
        const {name,last_name,email,password,contact_info} =req.body;
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        user.name=name;
        user.last_name=last_name;
        user.email=email;
        user.contact_info=contact_info;
        if(password){
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            user.password=hashedPassword;
        }
        await user.save();
        return res.json(user);
    }catch(e){
        return res.status(500).send('Error updating user');
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Aquí puedes generar un token JWT o manejar la sesión como prefieras
        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// exports.getReservationsByUserId = async(req,res)=>{
//     console.log('hola')
//     try {
//         const user = await User.aggregate([
//             {
//                 'match':{ "user_id":req.params.userId}
//             },{
//                 $lookup:{
//                     from: "reservations",
//                     localField: "_id",
//                     foreignField: "user_id",
//                     as: "reservations"
//                 }
//             }
//         ]);
//         return res.json(user);
//     } catch (error) {
//         return res.status(500).send('Error');
//     }
// }