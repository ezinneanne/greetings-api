const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");

// Load routes
const v1Routes = require("./routes/v1");
const v2Routes = require("./routes/v2");
const v3Routes = require("./routes/v3");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Serve OpenAPI spec files (static)
app.use("/specs", express.static(path.join(__dirname, "specs")));

// Load YAML specs
const v1Spec = yaml.load(fs.readFileSync(path.join(__dirname, "specs/greetings-v1.yaml"), "utf-8"));
const v2Spec = yaml.load(fs.readFileSync(path.join(__dirname, "specs/greetings-v2.yaml"), "utf-8"));
const v3Spec = yaml.load(fs.readFileSync(path.join(__dirname, "specs/greetings-v3.yaml"), "utf-8"));

// Serve Swagger UI for each version
app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(v1Spec));
app.use("/docs/v2", swaggerUi.serve, swaggerUi.setup(v2Spec));
app.use("/docs/v3", swaggerUi.serve, swaggerUi.setup(v3Spec));

// Mount API routes
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);
app.use("/api/v3", v3Routes);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;


app.listen(PORT, () => {
  console.log(`✅ Greetings API running at ${BASE_URL}`);
  console.log("📖 Swagger docs available at:");
  console.log(`   ${BASE_URL}/docs/v1`);
  console.log(`   ${BASE_URL}/docs/v2`);
  console.log(`   ${BASE_URL}/docs/v3`);
  console.log("📂 Specs available at:");
  console.log(`   ${BASE_URL}/specs/greetings-v1.yaml`);
  console.log(`   ${BASE_URL}/specs/greetings-v2.yaml`);
  console.log(`   ${BASE_URL}/specs/greetings-v3.yaml`);
});
