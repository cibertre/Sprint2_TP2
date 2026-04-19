const mongoose = require ('mongoose');
const dns = require('node:dns');

dns.setServers(["1.1.1.1", "8.8.8.8"]);
mongoose.connect('mongodb+srv://grupo-27:grupo-27@cluster0.blryo.mongodb.net/NodeMod3Cohorte5')
.then(()=> console.log(`Conexion exitosa a MongoDB`))
.catch(error=> console.error(`Error al conectar a MongoDB:`, error));



const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: {type: String, required: true},
    edad: { type: Number, min:0 },
    planetaOrigen: {type: String, default:'Desconocido' },
    debilidad: String, 
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now},
    creador: String,
}, {collection: 'Grupo-27'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);
insertSuperHero('Spiderman');
async function insertSuperHero(nombre) {
    const hero = new SuperHero({
        nombreSuperHeroe: nombre,
        nombreReal: "Peter Parker",
        edad: 25,
        planetaOrigen: "Tierra",
        debilidad: "Sentido de responsabilidad",
        poderes: ["Trepar paredes", "Sentido arácnido", "Fuerza sobrehumana"],
        aliados: ["Iron Man", "Avengers"],
        enemigos: ["Duende Verde", "Doctor Octopus"],
        creador: "Stan Lee"
    });

    const result = await hero.save();
    console.log("Superheroe insertado:", result);
}

async function updateSuperHero(nombreSuperHeroe) {
    const result =await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualizacion:', result);
}
updateSuperHero('Spiderman');
    
async function deleteSuperHero (nombreSuperHeroe) {
    const result = await SuperHero.deleteOne ({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superheroe eliminado:', result);
}
deleteSuperHero('Spiderman');

async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra'});
        console.log('Superheroes encontrados:', heroes);
    }
    findSuperHeroes();