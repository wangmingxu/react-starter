import 'reflect-metadata';
import express from 'express';
import path from 'path';
import proxyMiddleware from 'proxy-middleware';
import morgan from 'morgan';
import { build } from '../config/build.config';
import * as proxyTable from '../proxy/prod/proxyTable';
import clientRoute from './middlewares/clientRoute';

const app = express();

app.use(morgan('tiny'));

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

app.use(express.static(path.resolve(__dirname, '../../dist')));
// console.log(common.distPath);

app.set('views', path.resolve(__dirname, '../../views/prod'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(clientRoute);

app.listen(build.port, () => {
  console.log(`App listening on port ${build.port}!\n`);
});
