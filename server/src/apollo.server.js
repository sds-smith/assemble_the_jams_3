import path from 'path';
import { fileURLToPath } from 'url';

import { ApolloServer } from '@apollo/server';
import { readFile } from 'node:fs/promises';
import { spotifyResolvers } from './resolvers/spotify.resolvers.js';
import { expressMiddleware } from '@apollo/server/express4';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, 'schema.graphql')
const typeDefs = await readFile(schemaPath, 'utf8');

async function getContext({ req }) {
    const { client_token: {token} } = req.session;
    const { user } = req;
    return {
        token,
        user
    };
};

const apolloServer = new ApolloServer({typeDefs, resolvers: spotifyResolvers});
await apolloServer.start();
const apolloMiddleware = expressMiddleware(apolloServer, { context: getContext })

export { apolloMiddleware, __dirname};