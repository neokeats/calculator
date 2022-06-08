import cors from 'cors';
import express from 'express';
import { config } from '~/config';
import { ExceptionsHandler } from '~/middlewares/exceptions.handler';
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler';
import { compute } from '~/calc';
/**
 * On créé une nouvelle "application" express
 */
const app = express();

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json());

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors());

/**
 * Homepage simple text for now
 */
app.get('/', (req, res) => res.send('home'));

app.post('/compute', (req, res) => res.send(String(compute(req))));

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler);

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler);

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(config.API_PORT, () => console.log('server on port 8000(default see config.ts to change) .'));