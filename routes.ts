import { Router, RouterContext } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
    addDistro,
    getDistros,
    getDistro,
    updateDistro,
    removeDistro
} from "./controller/distros.ts"

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.response.body = '¡Hola! Esta es la base de Distros Linux.';
    }) // Ver si funciona
    .get('/api/distros', getDistros) // Solicitar todas las distros
    .get('/api/distros/:id', getDistro) // Solicitar una sola distro
    .post('/api/distros', addDistro) // Agregar una distro
    .put('/api/distros/:id', updateDistro) // Actualizar una distro
    .delete('/api/distros/:id', removeDistro) // Eliminar una distro
    ;

// const distrosCollection = db.collection('distros');

// const getDistros = async (ctx: RouterContext<string>) => {
//   const distros = await distrosCollection.find();
//   ctx.response.body = 'Get Distros';
// }

export { router };