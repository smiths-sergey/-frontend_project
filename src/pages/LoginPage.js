import { useCallback, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { message } from "antd";
import Styles from "./loginPage.module.css";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { login as loginStore } from "../stores/loginSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [isVlidating, setIsVlidating] = useState(false);
  const [isRegMode, setIsRegMode] = useState(false);

  const [login, setLogin] = useState("");
  const setLoginValue = useCallback((value) => {
    setLogin(value);
  }, []);
  const loginError = useMemo(() => {
    if (!isVlidating) {
      return "";
    }
    if (!login) {
      return "Не может быть пустым";
    }

    if (!isRegMode) {
      return "";
    }

    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(login)) {
      return "Может содержать тлько латинские буквы и цифры";
    }

    return "";
  }, [isVlidating, login]);

  const [password, setPassword] = useState("");
  const setPasswordValue = useCallback((value) => {
    setPassword(value);
  }, []);
  const passwordError = useMemo(() => {
    if (!password) {
      return "Не может быть пустым";
    }

    if (!isRegMode) {
      return "";
    }

    const regex = /^[a-z]*$/;
    if (!regex.test(password)) {
      return "Может содержать тлько латинские буквы в нижнем регистре";
    }

    return "";
  }, [password]);

  const [passwordCheck, setPasswordCheck] = useState("");
  const setPasswordCheckValue = useCallback((value) => {
    setPasswordCheck(value);
  }, []);
  const passwordCheckError = useMemo(() => {
    if (!isRegMode) {
      return "";
    }
    if (!passwordCheck) {
      return "Не может быть пустым";
    }

    if (password != passwordCheck) {
      return "Пароли не совпадают";
    }

    return "";
  }, [password, passwordCheck]);

  const [email, setEmail] = useState("");
  const setEmailValue = useCallback((value) => {
    setEmail(value);
  }, []);
  const emailError = useMemo(() => {
    if (!isRegMode) {
      return "";
    }
    if (!email) {
      return "Не может быть пустым";
    }

    const regex = /@/;
    if (!regex.test(email)) {
      return "Неверный формат email";
    }

    return "";
  }, [email]);

  const isError = useMemo(() => {
    
    return loginError || passwordError || passwordCheckError || emailError;
  }, [loginError, passwordError, passwordCheckError, emailError]);

  const register = async () => {
    try {
      const resp = await axios.post(
        `${window.location.origin}/api_1/register`,
        {
          login: login,
          email: email,
        }
      );
      dispatch(loginStore());
    } catch (e) {}
  };

  const auth = async () => {
    try {
      const resp = await axios.post(`${window.location.origin}/api_1/auth`, {
        login: login,
      });
      dispatch(loginStore());
    } catch (e) {}
  };

  const handleButtonClick = async () => {
    if (!isVlidating) {
      setIsVlidating(true);
    }

    if (isError) {
      return;
    }
    if (isRegMode) {
      await register();
    } else {
      await auth();
    }

    messageApi.open({
      type: "success",
      content: "Регистрация прошла успешно",
    });
  };
  const handleToggleMode = () => {
    setIsRegMode(!isRegMode);
  };

  return (
    <>
      <div className={Styles.login_page}>
        <div className={Styles.login_container}>
          <p id="modeSelector" className={Styles.mode_toggle} onClick={handleToggleMode}>
            {isRegMode ? "Вход" : "Регистрация"}
          </p>
          <h1>{isRegMode ? "Регистрация" : "Вход"}</h1>

          <Input
            name="login"
            type="text"
            placeholder="Логин"
            value={login}
            setValue={setLoginValue}
          />
          <p className={Styles.error_text}>
            {isVlidating ? loginError : ""}&nbsp;
          </p>
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            setValue={setPasswordValue}
          />

          <p className={Styles.error_text}>
            {isVlidating ? passwordError : ""}&nbsp;
          </p>
          {isRegMode && (
            <>
              <Input
                name="passwordCheck"
                type="password"
                placeholder="Пароль (повтор для проверки)"
                value={passwordCheck}
                setValue={setPasswordCheckValue}
              />

              <p className={Styles.error_text}>
                {isVlidating ? passwordCheckError : ""}&nbsp;
              </p>

              <Input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                setValue={setEmailValue}
              />

              <p className={Styles.error_text}>
                {isVlidating ? emailError : ""}&nbsp;
              </p>
            </>
          )}
          <Button
            text={isRegMode ? "Зарегистрироваться" : "Войти"}
            onClick={handleButtonClick}
            isDisabled={isVlidating && isError}
          ></Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
