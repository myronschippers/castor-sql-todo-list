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
router.post('/', (req, res) => {});

// DELETE - remove a single todo from DB
router.delete('/', (req, res) => {});

// PUT - update complete status on a specific TODO
router.put('/', (req, res) => {});

module.exports = router;
