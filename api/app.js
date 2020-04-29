require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const formidableMiddleware  = require("express-formidable");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users/users");
const registerRouter = require("./routes/auth/register/register");
const loginRouter = require("./routes/auth/login/login");
const bucketsRouter = require("./routes/buckets/buckets");
const locationsRouter = require("./routes/locations/locations");
const dbHelper = require("./private/DBHelper");

const jsonErrorHandler = async (err, req, res, next) => {
    res.status(500).send({ error: err });
}

setTimeout(()=> {
    dbHelper.getModel()
}, 200)

const app = express();
app.use(express.static(__dirname + "../app/dist/app"));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, uploadDir: __dirname + '/uploads' }));
app.use(bodyParser.json({ limit: '50mb', uploadDir: __dirname + '/uploads', keepExtensions: true }));
app.use(cors());
app.use(jsonErrorHandler);

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);
app.use("/buckets", formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: __dirname + '/uploads',
    multiples: true, // req.files to be arrays of files
}), bucketsRouter);
app.use("/locations", locationsRouter);

module.exports = app;
