const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "notariabd",
});
// variable para guardar usuarios y contraseñas y ruta /login para el inicio de sesion

app.get("/login", async (req, res) => {
  const user = req.query.user;
  const password = req.query.password;
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE user = ? AND password = ?",
    [user, password]
  );
  if (rows.length > 0) {
    res.send("Usuario y contraseña correctos");
  } else {
    res.send("Usuario o contraseña incorrectos");
  }
});

// crear ruta para registro de usuarios con usuario y contraseña

app.get("/registro", async (req, res) => {
  const user = req.query.user;
  const password = req.query.password;
  const [result] = await pool.query(
    "INSERT INTO usuarios (user, password) VALUES (?, ?)",
    [user, password]
  );
  if (result.affectedRows > 0) {
    res.send("Usuario registrado correctamente");
  } else {
    res.send("Error al registrar usuario");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
