import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import routes from "./routes/routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

//gzip compress all routes
app.use(compression());

//use json
app.use(express.json());

//use helmet for vulnerability protection
app.use(helmet());

//bind the /v2 request url to the application router
app.use("/v2", routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
