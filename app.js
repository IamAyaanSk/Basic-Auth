const express = require("express");
const base64 = require("base-64");

const app = express();

app.get("/", (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.setHeader("WWW-Authenticate", 'Basic realm="user_pages"');
      res.status(401).send("Please Authenticate");
      return;
    }

    // Basic <encoded_res>
    const authHeaderEncoded = req.headers.authorization
      .trim()
      .replace(/Basic\s+/i, "");

    const decoded = base64.decode(authHeaderEncoded).split(":");

    const [username, password] = decoded;
    if (username === "admin" && password === "admin") {
      res.status(200).send("Hello you are authenticated");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.listen("3000", () => console.log("Server listening on port 3000"));
