/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import bodyParser from '@nanoexpress/middleware-body-parser';
import graphql from '@nanoexpress/middleware-graphql';
// eslint-disable-next-line import/extensions
import { makeBehavior } from 'graphql-ws/lib/use/uWebSockets';
import nanoexpress from 'nanoexpress';
import graphqlSchema from './graphql-schema.js';

const app = nanoexpress();
app.use(bodyParser());

app.post('/graphql', graphql(graphqlSchema));
app.ws('/graphql', makeBehavior({ schema: graphqlSchema }));

app.listen(4000);
