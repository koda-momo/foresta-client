import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ApolloError } from "@apollo/client";

import { TodoList } from "../../components/organisms/study/TodoList";
import { todoListDataMock, todoMocks } from "../../../__mocks__/Todos";

export default {
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

export const Default: ComponentStoryObj<typeof TodoList> = {
  args: {
    todos: todoListDataMock,
    loading: false,
    error: undefined,
    openReadModal: action("openReadModal"),
    openAddModal: action("openAddModal"),
  },
  parameters: {
    apolloClient: {
      mocks: todoMocks,
      addTypename: false,
    },
  },
  storyName: "デフォルト",
};

export const NoTodo: ComponentStoryObj<typeof TodoList> = {
  args: {
    ...Default.args,
    todos: [],
  },
  storyName: "Todoがない時",
};

export const Loading: ComponentStoryObj<typeof TodoList> = {
  args: {
    ...Default.args,
    todos: [],
    loading: true,
  },
  storyName: "ローディング中",
};

export const Error: ComponentStoryObj<typeof TodoList> = {
  args: {
    ...Default.args,
    todos: [],
    error: new ApolloError({}),
  },
  storyName: "エラー発生時",
};
