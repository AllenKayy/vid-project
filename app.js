const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const { genreRouter } = require('./src/routes/genreRoutes');

const port = Number(process.env.PORT) || 4000;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());

// genre route
app.use("/genre", genreRouter);

app.get("/", (req, res) => {
    res.json("Video Service Applcation")
});

// catch 404 error
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    return next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: app.get("env") === "development" ? err : {}
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));