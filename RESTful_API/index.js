const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/app-1')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("mongo error",err));
//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitile:{
        type: String,
    },
    gender:{
        type: String,
    },
},{timestamps: true});   

const User = mongoose.model('user', userSchema);


app.use(express.urlencoded({extended:false}));
//urlencoded, it parses incoming requests with urlencoded payloads. 
// It is based on body-parser.






//routes
//get '/api/users'

app.get('/api/users', async(req, res) => {
    const alldbUsers = await User.find({});
    // console.log(req.headers);
    // res.setHeader('XmyName', 'Aditya Singh');//custom header
    //always add X before custom header name
    res.json(alldbUsers);
});


/**/
app.get('/users', async(req, res) => {
    const alldbUsers = await User.find({});
    const html =`
    <ul>
        ${alldbUsers.map(user => 
            `<li>
                ${user.firstName} -  ${user.email}
            </li>`
        ).join('')}
    </ul> `;
    res.send(html);

});

// by id 
app
.route('/api/users/:id')
    .get(async(req, res) => {

        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                status: 'failed',
                message: 'User not found'
            });
        }
        res.json(user);
    })

    .patch(async(req, res) => 
        {
        const user = await User.findByIdAndUpdate(req.params.id, {lastName: 'verma'});
        // const body = req.body;

        // const updatedUser = users.find(el => el.id === id);
        // Object.assign(updatedUser, body);
        // fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),(err)=>{
        //     if(err)
        //         return res.json({
        //             status: 'failed',
        //             message: 'User not updated'
        //         });
            
        //     console.log("User updated", updatedUser);     
                return res.json({status: 'success'});
            
    
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        const deleteUser = users.find(el => el.id === id);

        const index = users.indexOf(deleteUser);
        users.splice(index, 1);
        fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),(err)=>{
            if(err)
                return res.json({
                    status: 'failed',
                    message: 'User not deleted'
                });    
            return res.status(204).send();
            
        });
    });

//post
app.post('/api/users', async(req, res) => {
    const body = req.body;// body is not yet defined so we use middleware
    if(
        !body||
        !body.first_name||
        !body.last_name||
        !body.email||
        !body.gender||
        !body.job_title
    )
    {
        return res.status(400).json({
            status: 'failed',
            message: 'All fields are required'
        });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitile: body.job_title,
    });

    return res.status(201).json({
        status: 'success',
    });


/* ye use karne pe : console.log("Body", body);
   ye output mil raha hai:
   Server is running on port 8000
   Body [Object: null prototype] {
    first_name: 'Aditya',
    last_name: 'Singh',
    email: 'aditya@gmail.com',
    gender: 'Male',
    job_title: 'Wanderer'
}
*/
//before connectiong with mongodb
    // users.push({...body , id: users.length+1});
    // fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),(err,data)=>{
    //     return res.json({status: 'success', id: users.length});
    // });
});

    



/*----
//get by id
app.get(, (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id == id);
    res.json(user);
}
);

 ------

//put
app.put('/api/users/:id', (req, res) => {  
    return res.json({
        status: 'pending'
    });
});
//patch
app.patch('/api/users/:id', (req, res) => {
    return res.json({
        status: 'pending'
    });
});
//delete
app.delete('/api/users/:id', (req, res) => {
    return res.json({
        status: 'pending'
    });
});

*/



app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);