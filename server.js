const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Load routes
const v1Routes = require("./routes/v1");
const v2Routes = require("./routes/v2");
const v3Routes = require("./routes/v3");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Serve OpenAPI spec files (static)
app.use("/specs", express.static(path.join(__dirname, "greetings-docs")));

// Load YAML specs
const v1Spec = YAML.load(path.join(__dirname, "greetings-docs/greetings-v1.yaml"));
const v2Spec = YAML.load(path.join(__dirname, "greetings-docs/greetings-v2.yaml"));
const v3Spec = YAML.load(path.join(__dirname, "greetings-docs/greetings-v3.yaml"));

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
  console.log(`   ${BASE_URL}/specs/openapi-v1.yaml`);
  console.log(`   ${BASE_URL}/specs/openapi-v2.yaml`);
  console.log(`   ${BASE_URL}/specs/openapi-v3.yaml`);
});
