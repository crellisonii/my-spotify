import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import { server_port } from './environment_variables';
import { buildSchema } from 'type-graphql';
import { AlbumResolver,
    ArtistResolver,
    BrowseResolver,
    SearchResolver,
    TrackResolver
} from "./modules";
import { loginRoute,
    callbackRoute,
    authorizeRoute,
    verifyUserRoute,
    verifyGuestRoute,
    graphqlRoute,
    playgroundRoute
} from './routes';
import { GraphQLContext } from './interfaces/graphql.interface';


let port = server_port || 4000;

async function bootstrap() {

    const schema = await buildSchema({
        resolvers: [
            AlbumResolver,
            ArtistResolver,
            BrowseResolver,
            SearchResolver,
            TrackResolver
        ]
    });

    const server = new ApolloServer({
        schema,
        context: ({ req }): GraphQLContext => {
            return {
                token: req.headers.authorization
            }
        },
        playground: true
    });

    const app = express();

    app.use(cookieParser());
    app.route("/login").get(loginRoute);
    app.route("/callback").all(callbackRoute);
    app.route("/authorize").get(authorizeRoute);
    app.route("/verify/user").all(verifyUserRoute);
    app.route("/verify/guest").all(verifyGuestRoute);
    app.route("/graphql").all(graphqlRoute);
    app.route("/playground").all(playgroundRoute);

    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(
            `Server is running, GraphQL Playground available at http://localhost:${port}/playground`
        );
    });
}

bootstrap();