import express, { Application } from "express"
import { ApolloServer } from "apollo-server-express"
import { typesDefs } from "./schema"
import { resolvers } from './resolver';
import cors from 'cors';

const PORT = 4000;

const app: Application = express();
app.use(cors())

const server = new ApolloServer({ typeDefs: typesDefs, resolvers });

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app: app as any });
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    }).on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`);
            process.exit(1);
        } else {
            throw err;
        }
    });
}

startServer();