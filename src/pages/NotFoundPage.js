import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "24px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      color: "#333",
    },
    errorMessage: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    emoji: {
      fontSize: "48px",
    },
    backButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div style={styles.container}>
      <div>
        <div style={styles.errorMessage}>404 Not Found</div>
        <div>К сожалению, страница на которую вы попытались перейти, не найдена.</div>
        <div style={styles.emoji}>😥</div>
        <button id="not_found_btn"style={styles.backButton} onClick={handleGoBack}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
