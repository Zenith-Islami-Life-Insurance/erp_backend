const app = require("./app");
const connection = require("./utils/ConnectOracle");


// Oracle database connection
connection.finally((err) => {
  if (err) {
    console.error("Error connecting to Oracle:", err);
    return;
  }
  console.log("Connected to Oracle server");
});

// server port Connection
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`);
});
