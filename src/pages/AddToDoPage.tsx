import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Input } from "antd";
import axios from "axios";
import Styles from "./addToDoPage.module.css";
const { TextArea } = Input;

interface ToDoType {
  date: string;
  description: string;
  is_completed: boolean;
}
function AddToDoPage() {
  const navigate = useNavigate();
  const [todo, setTodoData] = useState<ToDoType>({
    date: "",
    description: "",
    is_completed: false,
  });
  const handleChangeTodo = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTodoData({
        ...todo,
        [name]: checked,
      });
    } else {
      setTodoData({
        ...todo,
        [name]: value,
      });
    }
  };

  const handlCreateRecButtonClick = async () => {
    try {
      await axios.post(`${window.location.origin}/api/todos`, todo);
      navigate("/");
    } catch (e: any) {}
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <div className={Styles.page}>
      <h2>Новое дело</h2>
      <div className={Styles.grid_container}>
        <div>
          <p>Дата:</p>
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={todo.date}
            onChange={handleChangeTodo}
          />
          <p className={Styles.error_text}>
            {todo.date ? "" : "Обязательно для заполнения"}&nbsp;
          </p>
        </div>
        <div>
          <p>Описание:</p>
        </div>
        <div>
          <TextArea
            name="description"
            rows={4}
            value={todo.description}
            onChange={handleChangeTodo}
          />
          <p className={Styles.error_text}>
            {todo.description ? "" : "Обязательно для заполнения"}&nbsp;
          </p>
        </div>
        <div>
          <p>Выполнено:</p>
        </div>
        <div>
          <Checkbox
            type="checkbox"
            name="is_completed"
            checked={todo.is_completed}
            onChange={handleChangeTodo}
          />
        </div>
      </div>
      <div className={Styles.buttons_block}>
        <Button onClick={handleCancelClick} className={Styles.button}>
          Отмена
        </Button>
        <Button
          type="primary"
          className={Styles.button}
          onClick={handlCreateRecButtonClick}
          disabled={!todo.date || !todo.description}
        >
          Записать
        </Button>
      </div>
    </div>
  );
}

export default AddToDoPage;
