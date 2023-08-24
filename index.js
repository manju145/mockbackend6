const express = require("express");

const cors = require("cors");
const { userRouter } = require("./routes/userRoute");
const { connection } = require("./conection/db");
const { BlogsRouter } = require("./routes/blogs");

require("dotenv").config()


const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to homepage of Blogs Data backend");
});

app.use(express.json());

app.use("/users",userRouter)

app.use("/blog",BlogsRouter)


const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
  console.log(`Server is running on port ${PORT}`);
});