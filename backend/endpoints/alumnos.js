const express = require("express");
const router = express.Router();
const db = require("../db/conexion");

router.get("/:cursoId", (req, res) => {
    const cursoId = req.params.cursoId;

    db.query("SELECT * FROM alumnos WHERE curso_id = ?", [cursoId], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        res.json(rows);
    });
});

module.exports = router;
