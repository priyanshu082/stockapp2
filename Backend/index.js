const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/",mainRouter);

app.listen(8080,()=>
{
  console.log("app is listening on port 8080");
});