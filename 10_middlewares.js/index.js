const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8023;


// Middlewares

app.use((req, res, next)=>{
    console.log("I am inside 1st middleware");
    next();
})

app.use((req, res, next)=>{
    console.log("I am inside 2nd middleware");
    next();
})

app.use((req, res, next)=>{
    console.log("I am inside 3rd middleware");
    next();
})

app.use((req, res, next)=>{
    console.log("I am inside 4th middleware");
    next();
})

app.use((req, res, next)=>{
    console.log("I am inside 5th middleware");
    fs.appendFile('./log.txt', `\nHTTP method: ${req.method}, Request Path: ${req.path}, Request Time: ${new Date().toLocaleString()}`, (err, data)=>{
        next();
    });
})




app.get('/api/v1/user', (req, res)=>{
    res.send(`I am inside the get all user request`);
});

app.get('/api/v1/user/:id', (req, res)=>{
    res.send(`I am inside the get user request and you send ${req.params.id} as a Id`);
});

app.post('/api/v1/user', (req, res)=>{
    res.send("I am inside the get Post user request");
});

app.put('/api/v1/user/:id', (req, res)=>{
    res.send(`I am inside the put user request and you send ${req.params.id} as a Id`);
});

app.delete('/api/v1/user/:id', (req, res)=>{
    res.send(`I am inside the delete user request and you send ${req.params.id} as a Id`);
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})