describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:9500/");

    //страница регистрация/авторизация ->регистрация
    cy.url().should("include", "/login");
    cy.get('[id="modeSelector"]').contains("Регистрация").click();
    cy.get('input[name="login"]').type("skuznecov");
    cy.get('input[name="password"]').type("psw");
    cy.get('input[name="passwordCheck"]').type("psw");
    cy.get('input[name="email"]').type("smiths.sergey@gmail.com");
    cy.get("button").contains("Зарегистрироваться").click();

    //основная страница
    cy.get('input[id="locality"]').type("Казань");
    cy.get(".ant-select-item").first().click();

    // переход на страницу о сервисе
    cy.get('[data-menu-id*="about"]').click();
    cy.contains("h2", "О сервисе");

    // переход на страницу 404
    cy.get('[data-menu-id*="notFound"]').click();
    cy.get("button#not_found_btn").click();

    //проверка возврата на страницу о сервисе
    cy.contains("h2", "О сервисе");

    //выход
    cy.get('[data-menu-id*="logout"]').click();
    cy.url().should("include", "/login");

    //вход (без регистрации);
    cy.get('input[name="login"]').type("skuznecov");
    cy.get('input[name="password"]').type("psw");
    cy.get("button").contains("Войти").click();
    cy.get('input[id="locality"]');
  });
});
