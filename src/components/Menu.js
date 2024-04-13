import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "antd";
import { logout } from "../stores/loginSlice";

function MenuComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = (e) => {
        
    if (e.key == "main") {
      navigate("/");
      return;
    }

    if (e.key == "about") {
      navigate("/about");
      return;
    }

    if (e.key == "notFound") {
      navigate(`/${uuidv4()}`);
      return;
    }

    if (e.key == "logout") {
      dispatch(logout());
      return;
    }

    
  };
  const items = [
    {
      label: "Информация о населенном пункте",
      key: "main",
      
    },
    {
      label: "О сервисе",
      key: "about",

      
    },
    {
      label: "Имитация 404)",
      key: "notFound",
      
    },
    {
      label: "Выход",
      key: "logout",
      
    },
  ];
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[props.selectedKey]}
        mode="horizontal"
        items={items}
        style={{marginBottom: '30px'}}
      />
    </>
  );
}

export default MenuComponent;
