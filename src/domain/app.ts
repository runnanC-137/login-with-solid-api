import express, { type Express } from 'express'
import cors from 'cors'
import { routersOfApp } from './routers'
// import swaggerUi from 'swagger-ui-express'
// import path from 'path'

// const swaggerDocument = path.join(__dirname, 'configSwagger', 'swagger.json')
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routersOfApp(app)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routers of the project
// require("./routers")(app)

export { app }
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500);
    res.json({message: res.locals.message});
});
   */
