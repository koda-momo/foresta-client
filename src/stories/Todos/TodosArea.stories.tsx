import { action } from "@storybook/addon-actions";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";

import { todoMocks } from "../../../__mocks__/Todos";
import { TodosArea } from "../../components/organisms/study/TodosArea";
import { TodoModalContext } from "../../Providers/TodoModalProvider";

export default {
  component: TodosArea,
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "read",
        setModalMode: action("setModalMode"),
        todo: {},
        setTodo: action("setTodo"),
      },
    }),
  ],
} as ComponentMeta<typeof TodosArea>;

export const Default: ComponentStoryObj<typeof TodosArea> = {
  storyName: "デフォルト",
  parameters: {
    apolloClient: {
      mocks: todoMocks,
      addTypename: false,
    },
  },
};
