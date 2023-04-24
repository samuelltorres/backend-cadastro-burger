const express = require("express");
const { req, res } = require("express");
const { v4: uuidv4 } = require("uuid");

const port = 3005;

const app = express();
app.use(express.json());

const orders = [];

app.get("/orders", (req, res) => {
  return res.json(orders);
});

app.post("/orders", (req, res) => {
  const { order, name } = req.body;
  const id = uuidv4();

  const demand = {
    id,
    order,
    name,
  };

  orders.push(demand);

  return res.status(201).json(demand);
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  const positionArray = orders.findIndex((user) => user.id === id);

  if (positionArray >= 0) {
    orders.splice(positionArray, 1);
    return res.status(204).json(orders);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
