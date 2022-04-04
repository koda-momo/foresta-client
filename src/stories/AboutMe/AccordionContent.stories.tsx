import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AccordionContent } from "../../components/molucules/AccordionContent";

export default {
  component: AccordionContent,
} as ComponentMeta<typeof AccordionContent>;

export const large: ComponentStoryObj<typeof AccordionContent> = {
  args: {
    title: "large",
    content: <p>large</p>,
    size: "lg",
  },
  storyName: "大きい文字",
};

export const small: ComponentStoryObj<typeof AccordionContent> = {
  args: {
    title: "small",
    content: <p>small</p>,
    size: "sm",
  },
  storyName: "小さい文字",
};
