import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = `${__dirname}/../db/db.json`;
let dataBase = [];

try {
    const data = fs.readFileSync(path, 'utf8');
    if (data) {
        dataBase = JSON.parse(data);
    }
} catch (error) {
    console.error('Error al leer el archivo JSON:', error);
}


export const vistaHome = (req,res) => {
    res.render("home",{
        layout:"main",
        title: "Deportes",
        titleTabla:"Lista de Deportes",
        dataBase
       
    })
}