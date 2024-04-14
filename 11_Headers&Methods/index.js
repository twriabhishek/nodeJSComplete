const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8023;


// Middlewares

app.use(express.json());

app.use((req, res, next)=>{
    console.log("I am inside middleware");
    fs.appendFile('./log.txt', `\nHTTP method: ${req.method}, Request Path: ${req.path}, Request Time: ${new Date().toLocaleString()}`, (err, data)=>{
        next();
    });
})




app.get('/api/v1/user', (req, res)=>{
    res.status(200).send(`I am inside the get all user request`);
});

app.get('/api/v1/user/:id', (req, res)=>{
    res.status(200).send(`I am inside the get user request and you send ${req.params.id} as a Id`);
});

app.post('/api/v1/user', (req, res)=>{
    console.log(req.body);
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.job_title){
        return res.status(400).send({msg:"All field are required"});
    }
    return res.status(201).send("I am inside the Post user request");
});

app.put('/api/v1/user/:id', (req, res)=>{
    res.status(204).send(`I am inside the put user request and you send ${req.params.id} as a Id`);
});

app.delete('/api/v1/user/:id', (req, res)=>{
    res.status(204).send(`I am inside the delete user request and you send ${req.params.id} as a Id`);
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})