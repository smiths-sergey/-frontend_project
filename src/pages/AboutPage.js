import MenuComponent from "../components/Menu";
import image from "../img/training_logo.png";
function AboutPage() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    description: {
      fontSize: "20px",
      textAlign: "center",
      margin: "20px 0",
    },
    image: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      margin: "20px 0",
    },
  };
  return (
    <>
      <MenuComponent selectedKey="about"></MenuComponent>
      <div style={styles.container}>
        <h2>О сервисе</h2>
        <p style={styles.description}>
          Сервис предоставляет данные о загрязнении воздуха в выбранном
          населенном пункте по данным открытых источников.
        </p>
        <p style={styles.description}>
          Разработан в качестве аттестационного проекта по курсу обучения:
          "Программная инженерия. Управление разработкой ПО (Промышленная
          разработка приложений на JavaScript)", 2023-2024 год. Преподаватель:
          Александр Смирнов. Разработчик: Кузнецов Сергей,
          smiths.sergey@gmail.com
        </p>
        <img src={image} alt="Логотип курса обучения" style={styles.image} />
      </div>
    </>
  );
}

export default AboutPage;
