import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const SERVICE_URL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: SERVICE_URL }),
  cache: new InMemoryCache(),
});

export default client;
