const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET - retrieve all todos from DB
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "todos" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST - adding a new TODO
router.post('/', (req, res) => {
  // retrieve data from the client
  // {
  //   description: ''
  // }
  const newTodo = req.body;
  // create query to insert item
  const queryText = `INSERT INTO "todos" ("description", "complete")
  VALUES ($1, false);`;

  // query DB
  pool
    .query(queryText, [newTodo.description])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE - remove a single todo from DB
router.delete('/', (req, res) => {});

// PUT - update complete status on a specific TODO
router.put('/', (req, res) => {});

module.exports = router;
