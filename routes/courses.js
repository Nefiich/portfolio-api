const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name:'coures1'},
    {id: 2, name:'coures2'},
    {id: 3, name:'coures3'},
]


router.get('/', (req,res)=>{
    res.send(courses);
});

router.get('/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course doesnt exsist');
    res.send(course)
});

router.post('/:id', (req, res) => {

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

router.put('/:id', (req, res) =>{
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

router.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course doesnt exsist');

    const index = courses.indexOf(course)
    courses.splice(index, 1);

    res.send(courses);
})

module.exports = router;