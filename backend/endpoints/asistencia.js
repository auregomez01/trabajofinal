const express = require("express");
const router = express.Router();
const db = require("../db/conexion");

router.post("/", (req, res) => {
    const { alumno_id, fecha, estado, materia_id } = req.body;

    db.query(
        "INSERT INTO asistencia (alumno_id, fecha, estado, materia_id) VALUES (?, ?, ?, ?)",
        [alumno_id, fecha, estado, materia_id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Registro guardado" });
        }
    );
});

router.get("/:fecha", (req, res) => {
    const fecha = req.params.fecha;

    db.query(
        `SELECT a.*, alu.apellido, alu.nombre 
         FROM asistencia a 
         JOIN alumnos alu ON alu.id = a.alumno_id 
         WHERE fecha = ?`,
        [fecha],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err });
            res.json(rows);
        }
    );
});

module.exports = router;
