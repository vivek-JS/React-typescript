import React, { useEffect, useState } from "react";
import { useRef } from "react";
import tick from "../icons/tick-icon.png";
import deleteIcon from "../icons/delete_icon.png";

import fileEdit from "../icons/file_edit.png";

import { Todo } from "../types/types";
import { Draggable } from "react-beautiful-dnd";
type singleTodoProps = {
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}
const SingleTodo = ({ index, todo, todos, setTodos }:singleTodoProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              {
                //    <AiFillEdit />
              }{" "}
              <img src={fileEdit} className='logo'></img>
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              {
              <img src={deleteIcon} className='logo'></img>
            }{" "}
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              {
              <img src={tick} className='logo'></img>
            }{" "}
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
