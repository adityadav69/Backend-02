const express = require("express");
const app = express();

let port = 8080;

// app.get('*', (req, res) => {
//     res.send('Route not matched');
// });

// Wildcard route is not available in express 5 it will throw error when we use.

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('You are contacted on root path');
});


app.get('/:username/:id',(req,res)=>{
    console.log(req.params);
    let {username,id}=req.params;
    res.send(`you are on ${username} page`)
})

// app.get('/mango', (req, res) => {
//     res.send('You are contacted on mango path');
// });

// app.get('/apple', (req, res) => {
//     res.send('You are contacted on apple path');
// });

// app.get('/bannana', (req, res) => {
//     res.send('You are contacted on bannana path');
// });

