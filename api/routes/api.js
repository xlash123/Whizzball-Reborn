import express from 'express';
import mapsRouter from './maps';
import addmapRouter from './addmap';
import playersRouter from './players';
import hiscoresRouter from './hiscores';
import setmapRouter from './setmap';
import authenticateRouter from './authenticate';


const apiRoute = express.Router();

apiRoute.use('/maps', mapsRouter);
apiRoute.use('/addmap', addmapRouter);
apiRoute.use('/players', playersRouter);
apiRoute.use('/hiscores', hiscoresRouter);
apiRoute.use('/setmap', setmapRouter);
apiRoute.use('/authenticate', authenticateRouter);

export default apiRoute;
