CREATE DATABASE asistencia;

USE asistencia;

CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20)
);

CREATE TABLE materias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

CREATE TABLE alumnos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apellido VARCHAR(50),
    nombre VARCHAR(50),
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE asistencia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    alumno_id INT,
    fecha DATE,
    estado VARCHAR(10),
    hora_ingreso TIME,
    hora_egreso TIME,
    materia_id INT,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (materia_id) REFERENCES materias(id)
);

