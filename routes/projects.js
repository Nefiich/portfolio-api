const express = require('express');
const router = express.Router();

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
        name: Joi.string().required(),
        github: Joi.string().uri().required(),
        demo: Joi.string().uri().required(),
        img: Joi.string().uri().required()
    })
    return schema.validate(project);
}


router.get('/', (req,res)=>{
    con.getConnection((err, connection) => {
        if(err) { 
            console.log(err); 
            return; 
        }

        var sql = `SELECT * FROM projects`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            connection.release();
            res.send(result);
        });
    });
});
router.get('/:id', (req,res)=>{

    con.getConnection((err, connection) => {
        if(err) { 
            console.log(err); 
            return; 
        }

        var sql = `SELECT id, name, github, demo, img FROM projects WHERE id='${req.params.id}'`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            connection.release();
            console.log("1 record inserted");
            res.send(project + " " + result);
        });
    });
    
});

router.post('/create', (req, res)=>{

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

        var sql = `INSERT INTO projects (name, github, demo, img) VALUES ('${project.name}', '${project.github}', '${project.demo}', '${project.img}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            connection.release();
            console.log(`${project.name} insetred.`);
            res.send(project + " " + result);
        });
    });

});

router.put('/edit/:id', (req, res)=>{

    if(!req.params.id){
        res.status(400).send('Please provide an ID');
        return;
    }

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

        var sql = `UPDATE projects SET name='${project.name}', github='${project.github}', demo='${project.demo}', img='${project.img}' WHERE id = '${req.params.id}'`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            connection.release();
            console.log(`${project.name} edited.`);
            res.send(project);
        });
    });

});

router.delete('/remove/:id', (req,res) =>{
    if(!req.params.id){
        res.status(400).send('Please provide an ID');
        return;
    }

    con.getConnection((err, connection) => {
        if(err) { 
            console.log(err); 
            return; 
        }

        var sql = `DELETE FROM projects WHERE id = '${req.params.id}'`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            connection.release();
            console.log(`ID : ${req.params.id} deleted.`);
            res.send(`ID : ${req.params.id} deleted.`);
        });
    });
})



module.exports = router;