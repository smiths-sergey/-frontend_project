import React from 'react';
import { useNavigate } from "react-router-dom";
import Styles from "./notFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={Styles.notfound_container}>
      <div>
        <div className={Styles.notfound_error_message}>404 Not Found</div>
        <div>К сожалению, страница на которую вы попытались перейти, не найдена.</div>
        <div className={Styles.notfound_emoji} >😥</div>
        <button id="not_found_btn"className={Styles.notfound_backButton} onClick={handleGoBack}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
