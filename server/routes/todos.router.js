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
router.delete('/:todoId', (req, res) => {
  const todoId = req.params.todoId;
  console.log('todoId:', todoId);
  const queryText = `DELETE FROM "todos" WHERE "id"=$1;`;

  pool
    .query(queryText, [todoId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PUT - update complete status on a specific TODO
router.put('/', (req, res) => {});

module.exports = router;
