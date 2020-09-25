import express from 'express';
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';
import { postgraphile as PostGraphQL } from 'postgraphile';
import dotenv from 'dotenv';
import interceptor from '~/server/interceptor';
import bodyParser from 'body-parser';
import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many';
import PostGraphileNestedMutations from 'postgraphile-plugin-nested-mutations';
import UserSchemaPlugin from '~/server/core/services/users/plugin';

dotenv.config({
    silent: true,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    res.send('Testing API response for Market Place');
});

app.use("/graphql", interceptor);

app.use(
    PostGraphQL(
      `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
      "public",
      {
        appendPlugins: [
          ConnectionFilterPlugin,
          PgManyToManyPlugin,
          PostGraphileNestedMutations,
          UserSchemaPlugin,
        //   ExtendPlugin,
        //   DashboardDataPlugin,
        ],
        subscriptions: true, // Enable PostGraphile websocket capabilities
        simpleSubscriptions: true, // Add the `listen` subscription field
        graphiql: true,
        graphqlRoute: "/graphql",
        graphiqlRoute: "/graphiql",
        enhanceGraphiql: true,
        graphileBuildOptions: {
          nestedMutationsSimpleFieldNames: true,
          connectionFilterRelations: true,
          connectionFilterAllowEmptyObjectInput: true,
        },
      }
    )
  );

export default app;