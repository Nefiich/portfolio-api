const express = require('express');
const app = express();


app.use(express.json());

function isFromServer(req, res, next){
    if(req.ip === '127.0.0.1') return next();
    else{
        var err = new Error('Not Found');
        err.status = 404;
        return next(err);
    }
}

const coursesRoute = require("./routes/courses");
app.use("/api/courses", coursesRoute);

const projectsRoute = require("./routes/projects");
app.use("/api/projects", projectsRoute);




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))