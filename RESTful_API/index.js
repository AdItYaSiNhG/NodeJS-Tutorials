const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA (1).json');
const app = express();

const PORT = 8000;


app.use(express.urlencoded({extended:false}));






//routes
//get '/api/users'

app.get('/api/users', (req, res) => {
    res.json(users);
});


/**/
app.get('/users', (req, res) => {
    const html =`
    <ul>
        ${users.map(user => 
            `<li>
                ${user.first_name}
            </li>`
        ).join('')}
    </ul> `;
    res.send(html);

});

// by id 
app
.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id == id);
        res.json(user);
    })

    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const updatedUser = users.find(el => el.id === id);
        Object.assign(updatedUser, body);
        fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),(err)=>{
            if(err)
                return res.json({
                    status: 'failed',
                    message: 'User not updated'
                });
            
            console.log("User updated", updatedUser);     
            return res.json({status: 'success', id: id});
            
        });
    
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
app.post('/api/users', (req, res) => {
    const body = req.body;// body is not yet defined so we use middleware

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
    users.push({...body , id: users.length+1});
    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users),(err,data)=>{
        return res.json({status: 'success', id: users.length});
    });
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