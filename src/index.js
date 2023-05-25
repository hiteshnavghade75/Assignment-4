const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

function calculate(url,num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        return{
            status : "error",
            message : "Invalid data types"
        }
    }
    else if(num1 < -1000000 || num2 < -1000000){
        return {
            status : "error",
            message : "Underflow",
        }
    }
    else if(num1 > 1000000 || num2 > 1000000){
        return {
            status : "error",
            message : "Overflow",
        }
    }
    
    if(url === '/add'){
        return{
            status: "success",
            message: "the sum of given two numbers", 
            sum: num1+num2 
        }
    }

    if(url === '/sub'){
        return{ 
            status: "success", 
            message: "the difference of given two numbers", 
            difference: num1-num2 
        } 
    }

    if(url === '/multiply'){
        return{
            status: "success", 
            message: "The product of given numbers", 
            result: num1*num2 
        } 
    }

    if(url === '/divide'){
        if(num2 == 0){
            return{
                status : "error",
                message : "Cannot divide by zero"
            }
        }
        return{
            status: "success",
            message: "The division of given numbers", 
            result: num1/num2
        }
    }
}


app.get('/', (req,res) => {
    res.send("Hello world!");
});


app.post('/add', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2
    const result = calculate('/add', num1, num2);
    if(result.status === "error"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
});

app.post('/sub', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2
    const result = calculate('/sub', num1, num2);
    if(result.status === "error"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
});

app.post('/multiply', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2
    const result = calculate('/multiply', num1, num2);
    if(result.status === "error"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
});

app.post('/divide', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2
    const result = calculate('/divide', num1, num2)
    if(result.status === "error"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;