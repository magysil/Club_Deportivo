import express from 'express';
import {create} from 'express-handlebars'

import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

import vistaHomeRoutes from '../routes/vistaHome.routes.js'
import apiRootPostDeporteRoute from '../routes/apiRootPostDeporte.routes.js'
import apiRootGetDeporteRoute from '../routes/apiRootGetDeporte.routes.js'
import apiRootPutDeporteRoute from '../routes/apiRootPutDeporte.routes.js'
import apiRootDeleteDeporteRoute from '../routes/apiRootDeleteDeporte.routes.js'
import apiRootGetDeportes from '../routes/mostrarDeportes.routes.js'


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.frontEndPaths = {
            rootHome:'/'
        }

        this.backEndApi = {
            rootAgregarDeportes: '/agregar',
            rootMostrarDeportes:'/agregar',
            rootEditarPrecioDeporte: '/editar',
            rootEliminarDeportes:'/eliminar',
            mostrarDeportes:'/deportes'

        }

        this.middlewares();
        this.routes();
        
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use('/js', express.static( `${__dirname}/../public/assets/js`));
        this.app.use('/bootstrap', express.static( `${__dirname}/../node_modules/bootstrap/dist`));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`));
        this.app.use('/bootstrapIcons', express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));

    }

    routes(){
        this.app.use(this.frontEndPaths.rootHome, vistaHomeRoutes);

        this.app.use(this.backEndApi.rootAgregarDeportes, apiRootPostDeporteRoute)
        this.app.use(this.backEndApi.rootMostrarDeportes, apiRootGetDeporteRoute)
        this.app.use(this.backEndApi.rootEditarPrecioDeporte, apiRootPutDeporteRoute)
        this.app.use(this.backEndApi.rootEliminarDeportes, apiRootDeleteDeporteRoute)
        this.app.use(this.backEndApi.mostrarDeportes, apiRootGetDeportes)
    }

    initHandlebars(){

        this.hbs = create({
            partialsDir:[
                "views"
            ]
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
        
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }
}

export default Server;