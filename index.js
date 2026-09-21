const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const Users = require('./models/user');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());





async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/mernDB');
    
}
main();

app.post('/users' , async (req , res) =>{

    const {name , email , contact , password , address} = req.body
    const newData = new Users({name , email , contact , password , address });
    await newData.save();

    res.status(201).json({message : "User created successfully"});
})



app.get('/users' , async (req , res) =>{

    const users = await Users.find();
    res.status(200).json(users);
})


  

app.delete('/users/:id' , async (req , res) =>{

 
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "User has been deleted successfully"});

})





app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, contact, password, address } = req.body;
    const updateData = {name, email, contact, password, address}
    await Users.findByIdAndUpdate(id, updateData);

    res.status(200).json({ message: "User updated successfully" });
});

app.listen(4000 , ()=>{
    console.log("Server started successfully!!");
    
})
