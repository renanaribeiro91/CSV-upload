import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./api/modules/files/routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);


const PORT = 8290;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
