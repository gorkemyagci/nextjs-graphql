import { gql } from "@apollo/client";


export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(title: $title, completed: $completed) {
      userId
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      userId
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      userId
      id
      title
      completed
    }
  }
`;
