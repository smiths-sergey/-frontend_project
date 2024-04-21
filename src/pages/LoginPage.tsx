import { useCallback, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Styles from "./loginPage.module.css";
import Input from "../components/Input";
import { login as toLogin } from "../stores/userSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const [authError, setAuthError] = useState("");
  const [isVlidating, setIsVlidating] = useState(false);
  const [isRegMode, setIsRegMode] = useState(false);

  const [login, setLogin] = useState("");
  const setLoginValue = useCallback((value: string) => {
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
  }, [isVlidating, login,isRegMode]);

  const [password, setPassword] = useState("");
  const setPasswordValue = useCallback((value: string) => {
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
  }, [password,isRegMode]);

  const [passwordCheck, setPasswordCheck] = useState("");
  const setPasswordCheckValue = useCallback((value: string) => {
    setPasswordCheck(value);
  }, []);
  const passwordCheckError = useMemo(() => {
    if (!isRegMode) {
      return "";
    }
    if (!passwordCheck) {
      return "Не может быть пустым";
    }

    if (password !== passwordCheck) {
      return "Пароли не совпадают";
    }

    return "";
  }, [password, passwordCheck,isRegMode]);

  const [email, setEmail] = useState("");
  const setEmailValue = useCallback((value: string) => {
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
  }, [email,isRegMode]);

  const isError = useMemo(() => {
    return loginError || passwordError || passwordCheckError || emailError;
  }, [loginError, passwordError, passwordCheckError, emailError]);

  const register = async () => {
    try {
      await axios.post(
        `${window.location.origin}/api_1/register`,
        {
          login: login,
          email: email,
          psw: password,
        }
      );
      dispatch(toLogin({ login: login, email: email }));
    } catch (e) {}
  };

  const auth = async () => {
    try {
      const resp = await axios.post(`${window.location.origin}/api_1/auth`, {
        login: login,
        psw: password,
      });

      dispatch(toLogin({ login: resp.data.login, email: resp.data.email }));
    } catch (e: any) {
      const resp_code = e?.response?.status;
      if (resp_code === 401) {
        setAuthError("Пользователь с указанным логином и паролем не найден");
      }
    }
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

    
  };
  const handleToggleMode = () => {
    setAuthError("");
    setIsRegMode(!isRegMode);
  };

  return (
    <>
      <div className={Styles.login_page}>
        <div className={Styles.login_container}>
          <p
            id="modeSelector"
            className={Styles.mode_toggle}
            onClick={handleToggleMode}
          >
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

          <p className={Styles.error_text}>{authError}&nbsp;</p>

          <button
            onClick={handleButtonClick}
            disabled={!!isVlidating && !!isError}
          >
            {isRegMode ? "Зарегистрироваться" : "Войти"}{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
