import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import { title } from 'process';

// Variables que me permiten mostrar el path donde estoy en el proyecto
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
 
export const postDeporteHandler = (req, res) => {  
    const { nombre, precio } = req.body;

    try {
       
        dataBase.push({ nombre, precio });        
        fs.writeFileSync(path, JSON.stringify(dataBase, null, 2), 'utf8');

        console.log('Deporte agregado correctamente:', { nombre, precio });
        res.status(200).json({ message: `El Deporte ${nombre} fue agregado correctamente`, data: dataBase });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const getDeporteHandler = (req, res) => {
   // console.log('Entrando a getDeporteHandler');
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
       // console.log('Datos leídos del archivo:', data);

        try {
            const dataBase = JSON.parse(data);
            //console.log('Base de datos de deportes:', dataBase);
           
           
            res.render('home', {
                layout: 'main',
                title:'Deportes',
                titleTabla: 'Lista de Deportes',
                dataBase
            });

        } catch (error) {
            console.error('Error al parsear los datos JSON:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    });
};



export const putPrecioDeporteHandler = (req,res) => {
    const deporteId = req.params.id;
    const nuevoPrecio = req.body.precio;
    const deporte = dataBase[deporteId];   
    
    if (!deporte) {
        return res.status(404).json({ message: 'Deporte no encontrado' });
    }
    deporte.precio = nuevoPrecio;
    try{
        fs.writeFileSync(path, JSON.stringify(dataBase, null, 2), 'utf8');
        console.log('Precio del deporte actualizado correctamente:', deporte);
        res.status(200).json({ message: 'Precio del deporte actualizado correctamente', deporte });
    } catch (error) {
        console.error('Error al actualizar el precio del deporte:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
       
    }
} 
export const deleteDeporteHandler = (req, res) => {
    const index = req.params.id; // En este caso, el ID es el índice del elemento en el array
    try {
        const data = fs.readFileSync(path, 'utf8');

        if (data) {
            let dataBase = JSON.parse(data);
            if (index >= 0 && index < dataBase.length) {
                dataBase.splice(index, 1); // Elimina el elemento del array usando el índice
                fs.writeFileSync(path, JSON.stringify(dataBase, null, 2), 'utf8');
                res.status(200).json({ message: `Deporte en el índice ${index} eliminado correctamente` });
            } else {
                res.status(404).json({ message: `No se encontró el deporte en el índice ${index}` });
            }
        } else {
            res.status(404).json({ message: "No se encontraron deportes" });
        }
    } catch (error) {
        console.error('Error al leer o escribir el archivo JSON:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}



