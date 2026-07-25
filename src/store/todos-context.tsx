import React, { useState } from "react";
import Todo from "../models/todo";

type TodosCtxObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

const TodosContext = React.createContext<TodosCtxObj>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
});

const TodosContentProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const ctxValue: TodosCtxObj = {
    items: todos,
    addTodo: onAddTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={ctxValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

// export { TodosContentProvider };
export default TodosContentProvider;
