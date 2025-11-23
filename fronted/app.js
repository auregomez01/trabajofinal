const tablaAlumnos = document.querySelector("#tablaAlumnos tbody");
const tablaRegistro = document.querySelector("#tablaRegistro tbody");

const curso = document.getElementById("curso");
const materia = document.getElementById("materia");
const fecha = document.getElementById("fecha");

fecha.valueAsDate = new Date();

async function cargarAlumnos() {
    const res = await fetch(`http://localhost:3000/alumnos/${curso.value}`);
    const datos = await res.json();

    tablaAlumnos.innerHTML = "";
    datos.forEach(a => {
        tablaAlumnos.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.apellido}</td>
                <td>${a.nombre}</td>
                <td>
                    <button onclick="marcar(${a.id}, 'P')">P</button>
                    <button onclick="marcar(${a.id}, 'A')">A</button>
                    <button onclick="marcar(${a.id}, 'T')">T</button>
                </td>
            </tr>
        `;
    });
}

async function marcar(id, estado) {
    await fetch("http://localhost:3000/asistencia", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            alumno_id: id,
            fecha: fecha.value,
            estado: estado,
            materia_id: materia.value
        })
    });

    cargarRegistro();
}

async function cargarRegistro() {
    const res = await fetch(`http://localhost:3000/asistencia/${fecha.value}`);
    const datos = await res.json();

    tablaRegistro.innerHTML = "";
    datos.forEach((a, i) => {
        tablaRegistro.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${a.apellido}</td>
                <td>${a.nombre}</td>
                <td>${a.estado}</td>
                <td>${a.hora_ingreso || ""}</td>
                <td>${a.hora_egreso || ""}</td>
            </tr>
        `;
    });
}

curso.addEventListener("change", cargarAlumnos);
fecha.addEventListener("change", cargarRegistro);

cargarAlumnos();
