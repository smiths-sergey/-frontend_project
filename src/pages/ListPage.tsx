import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Spin } from "antd";
import type { TableProps } from "antd";
import { logout } from "../stores/userSlice";
import Styles from "./listPage.module.css";

const { Column } = Table;

interface ToDoType {
  id: number;
  date: string;
  description: string;
  is_completed: boolean;
}

function ListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((store: any) => store.user.login);
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [isSpin, setIsSpin] = useState(false);

  const getRows = () => {
    setIsSpin(true);
    axios
      .get(`${window.location.origin}/api/todos`)
      .then((response) => {
        setIsSpin(false);
        setTodos(response.data);
      })
      .catch((error) => {
        setIsSpin(false);
        console.error("Ошибка при выполнении запроса:", error);
      });
  };

  useEffect(() => {
    getRows();
  }, []);

  const handleLogoutClick = () => {
    dispatch(logout(null));
  };

  const handleAddRowClick = () => {
    navigate("/addTodo");
  };

  const handleCheckboxChange = async (checked: boolean, id: number) => {
    setIsSpin(true);
    try {
      await axios.patch(`${window.location.origin}/api/todos`, {
        id: id,
        is_completed: checked,
      });
    } catch (e) {
      console.error("Ошибка при выполнении запроса:", e);
      setIsSpin(false);
      return;
    }

    setIsSpin(false);

    const updatedTodos = todos.map((item: ToDoType) =>
      item.id === id ? { ...item, is_completed: checked } : item
    );
    setTodos(updatedTodos);
  };

  const handleDeleteRowClick = async (id: number) => {
    setIsSpin(true);
    try {
      const response = await axios.delete(
        `${window.location.origin}/api/todos/${id}`
      );
      setTodos(response.data);
    } catch (e) {
      console.error("Ошибка при выполнении запроса:", e);
      setIsSpin(false);
      return;
    }
    setIsSpin(false);
  };

  const columns: TableProps<ToDoType>["columns"] = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text, record) => new Date(text).toLocaleDateString("ru-RU"),
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      align: "center",
    },

    {
      title: "Выполнено",

      key: "is_completed",
      align: "center",
      render: (text, record) => (
        <>
          <input
            type="checkbox"
            className={Styles.checkbox}
            checked={record.is_completed}
            onChange={(e) => {
              handleCheckboxChange(e.target.checked, record.id);
            }}
          />
        </>
      ),
    },
    {
      title: "",
      align: "center",
      key: "t_delete",
      render: (text, record) => (
        <>
          <Button
            className={Styles.button}
            onClick={() => {
              handleDeleteRowClick(record.id);
            }}
          >
            Удалить
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={Styles.page}>
      <div className={Styles.header}>
        <p>Пользователь:&nbsp;{userLogin}</p>
        <Button
          name="logout"
          onClick={handleLogoutClick}
          type="primary"
          className={Styles.button}
        >
          Выйти
        </Button>
      </div>
      <div className={Styles.title}>
        <h2>Список дел</h2>
      </div>

      <Button
        name="add-row"
        type="primary"
        onClick={handleAddRowClick}
        className={Styles.button}
        style={{ marginBottom: "20px" }}
      >
        Новая запись
      </Button>
      <Spin spinning={isSpin}>
        <Table columns={columns} dataSource={todos}>
          <Column title="Action" key="action" />
        </Table>
      </Spin>
    </div>
  );
}

export default ListPage;
