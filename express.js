const express = require('express');

const app =  express();
const mysql = require('mysql');

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');//'POST, PUT, GET, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});


app.get('/data',(req,res) =>{

    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'NetlettiWorld@1',
        database : 'testdb',
        port: '3306'
    });

    connection.query('SELECT * FROM test;', (err,rows,fields) => {
        if (err) 
        {
            console.log('Query Failed with : ' + err)
            res.end();
        }
        else
        {
            res.json(rows) //If data does not show use this command in mysql terminal 'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';'
        }
        
    });

    /*const customer = [
        {id:25,Name:'Ricardo',Surname:'Salambi'}
    ];

    res.json(customer);*/
})


app.get('/data/:count',(req,res) =>{

    const connection = mysql.createConnection({
        host : 'us-cdbr-iron-east-04.cleardb.net',//'localhost',
        user : 'b4b14493f5eaa1',//'root',
        password : '7c6777a9',//'NetlettiWorld@1',
        database : 'heroku_20d6e7bc9dbb3b1',
        port: '3306'
    });

    connection.query('SELECT * FROM testing where count = '+req.params.count+';', (err,rows,fields) => {
        if (err) 
        {
            console.log('Query Failed with : ' + err)
            res.end();
        }
        else
        {
            res.json(rows) //If data does not show use this command in mysql terminal 'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';'
        }
        
    });

    /*const customer = [
        {id:25,Name:'Ricardo',Surname:'Salambi'}
    ];

    res.json(customer);*/
})

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`)); 