import { Button } from "./Button";
export default {
  title: "Button",
  component: Button,
  argTypes: {
    type: {
      type: "string",
      description: "Выбор внешнего вида кнопки",
      control: {
        type: "radio",
      },
      options: ["primary", "secondary"],
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    text: {
      type: "string",
      description: "Текст кнопки",
      defaultValue: "Войти",
    },
  },
};

const Template = (arg) => <Button {...arg} />;
export const Default = Template.bind({});
Default.args = {
  type: "primary",
  text: "Войти",
  isDisabled: false,
};
