import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

const users: string[] = [];

const typeDefs = gql`
  type Query {
    users: [String!]!
  }
  type Mutation {
    createUser(name: String!): String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => users,
    },
    Mutation: {
      createUser: (_, args) => {
        users.push(args.name);
        return "User created";
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
