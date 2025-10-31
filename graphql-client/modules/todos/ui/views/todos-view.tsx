import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TodoForm from "../sections/form";
import TodosList from "../sections/todos-list";
import { useQuery } from "@apollo/client/react";
import { GET_TODOS } from "@/graphql/queries";

const TodosViewSuspense = () => {
  return (
    <div className="flex flex-col items-start gap-10 w-full p-5">
      <TodoForm />
      <TodosList />
    </div>
  );
};

const TodosView = () => {
  return (
    <Suspense fallback={<>Loading..</>}>
      <ErrorBoundary fallback={<>Error</>}>
        <TodosViewSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

export default TodosView;
