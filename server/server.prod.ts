import 'reflect-metadata';

import express from 'express';
import hbs from 'hbs';
// import * as heapdump from 'heapdump';
import morgan from 'morgan';
// import * as memwatch from 'node-memwatch';
import path from 'path';
import proxyMiddleware from 'proxy-middleware';
import { build } from '../config/build.config';
import * as proxyTable from '../proxy/prod/proxyTable';
import clientRoute from './middlewares/clientRoute';

const app = express();

app.use(morgan('tiny'));

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(context, proxyMiddleware(options));
});

app.use(express.static(path.resolve(__dirname, '../../dist')));
// console.log(common.distPath);

app.set('views', path.resolve(__dirname, '../../views/prod'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(clientRoute);

app.listen(build.port, () => {
  console.log(`App listening on port ${build.port}!\n`);
});

// memory profile watch
// const hd = new memwatch.HeapDiff();
// memwatch.on('leak', (info) => {
//   console.log('--leak--');
//   console.log(info);
//   console.log('--leak--');
//   const diff = hd.end();
//   console.log('--Heap Diff--');
//   console.dir(diff, { depth: 10 });
//   console.log('--Heap Diff--');
//   const filename = `${__dirname}/heapdump-${process.pid}-${Date.now()}.heapsnapshot`;
//   heapdump.writeSnapshot(filename, () => {
//     console.log(`${filename} dump completed.`);
//   });
// });
