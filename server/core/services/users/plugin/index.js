import UserService from "~/server/core/services/users";
import { makeExtendSchemaPlugin, gql, embed } from "graphile-utils";

const userPlugin = makeExtendSchemaPlugin(({ pgSql: sql }) => ({
  typeDefs: gql`
    input UserLoginInputPayload {
      email: String!
      password: String!
    }

    enum Gender {
      male
      female
    }

    input UserAccountInputPayload {
      firstName: String!
      lastName: String!
      email: String!
      gender: Gender!
      phoneNumber: String
      profileImageUrl: String
      password: String!
      title: String
    }

    type UserOutputPayload {
      status: String
      token: String
    }

    extend type Mutation {
      loginUser(input: UserLoginInputPayload!): UserOutputPayload
      createUserAccount(input: UserAccountInputPayload!): UserOutputPayload
    }
  `,
  resolvers: {
    Mutation: {
      loginUser: UserService.logUserIn,
      createUserAccount: UserService.createUser,
    },
  },
}));

export default userPlugin;
