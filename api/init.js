const express = require("express");
const methodOverride = require("method-override");
const router = require("./router");
const mongoose = require("mongoose");
const {IAMRouter, IAMSwagger} = require("aloux-iam");
const swaggerUI = require("swagger-ui-express");

const app = express();

// Base de Datos
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(methodOverride());

app.use(IAMRouter);
app.use(router);


// CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.ACCESS_CONTROL_ALLOW_ORIGIN
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Swagger solo en modo DEBUG
if (process.env.DEBUG === "true") {

    // Documentación principal
    app.use(
        "/docs",
        swaggerUI.serve,
        swaggerUI.setup(swagger)
    );

    // Documentación IAM
    app.use(
        "/docs-iam",
        swaggerUI.serve,
        swaggerUI.setup(IAMSwagger)
    );
}



app.listen(3000,() => {
    console.log("http://localhost:3000");   
});