const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const v1Routes = require("./routes/v1");
const v2Routes = require("./routes/v2");
const v3Routes = require("./routes/v3");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Mount routes
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);
app.use("/api/v3", v3Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Greetings API running at http://localhost:${PORT}`);
});
