const express = require('express');
const app = express();

const Joi = require('joi');

app.use(express.json());


const courses = [
    {id: 1, name:'coures1'},
    {id: 2, name:'coures2'},
    {id: 3, name:'coures3'},
]

app.get('/', (req, res) =>{
    res.send('Hello world!');
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course doesnt exsist');
    res.send(course)
});

app.post('/api/courses', (req, res) => {

    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course doesnt exsist');

    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;

    res.send(course);
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });
    return schema.validate(course);
}

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course doesnt exsist');

    const index = courses.indexOf(course)
    courses.splice(index, 1);

    res.send(courses);
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))