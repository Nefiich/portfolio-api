const express = require('express');
const router = express.Router();

var cors = require('cors')
const Joi = require('joi');
var mysql = require('mysql');

const fs = require("fs");
const getPass = () => {
    return new Promise(resolve => {
        fs.readFile(__dirname + "/passwords.txt", (error, data) => {
            if(error) {
                throw error;
            }
            resolve(data.toString());
        });
    });
}

let con;
const connect = async() =>{
    const dbPass = await getPass();
    con = mysql.createPool({
        host: "remotemysql.com",
        user: "t5l518VBF6",
        password: dbPass,
        database: 't5l518VBF6'
    });
}
connect();

const validateProject = (project) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(project);
}

router.options("/", cors(), (req, res) => {
    res.sendStatus(204);
});
router.post('/', (req,res)=>{

    const project = req.body;
    const result = validateProject(project);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    con.getConnection((err, connection) => {
        if(err) { 
            console.log(err); 
            return; 
        }

        var sql = `SELECT * FROM users WHERE username='${project.username}'`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            connection.release();
            if (result[0].password != project.password){
                res.status(403).send("Error. Wrong Password!")
                
            }else{
                res.send(result);  
            }
            
        });
    });
});




module.exports = router;