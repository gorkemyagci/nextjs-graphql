import { gql } from "apollo-server-express";

export const typesDefs = gql`
type Todo {
  userId: Int
  id: Int
  title: String
  completed: Boolean
 }
type Query {
  todos: [Todo]
  todoById(id: Int!): Todo
 }
type Mutation {
  createTodo(title: String!, completed: Boolean!): Todo
  updateTodo(id: Int!, title: String, completed: Boolean): Todo
  deleteTodo(id: Int!): Todo
 }
`;
