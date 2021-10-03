const express = require('express');
const app = express();


app.use(express.json());

const coursesRoute = require("./routes/courses");
app.use("/api/courses", coursesRoute);

const projectsRoute = require("./routes/projects");
app.use("/api/projects", projectsRoute);




const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))