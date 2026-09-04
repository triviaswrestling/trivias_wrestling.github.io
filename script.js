console.log("Trivias Wrestling funcionando");
const luchadores = [
    {
        nombre: "Cody Rhodes",
        imagen: "Cody Rhodes trivias.jpg",
        division: "Men's Division",
        victorias: 0,
        derrotas: 0,
        logros: [
            "2x WWE Undisputed Champion",
            "2x TNA Champion",
            "Royal Rumble Winner 2024"
        ]
    }
];

function abrirModal(indice) {
    const luchador = luchadores[indice];

    alert(
        luchador.nombre + "\n\n" +
        "División: " + luchador.division + "\n" +
        "Victorias: " + luchador.victorias + "\n" +
        "Derrotas: " + luchador.derrotas + "\n\n" +
        "Logros:\n" +
        luchador.logros.join("\n")
    );
}
