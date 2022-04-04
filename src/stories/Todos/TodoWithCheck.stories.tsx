import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TodoWithCheck } from "../../components/molucules/todos/TodoWithCheck";

export default {
  component: TodoWithCheck,
} as ComponentMeta<typeof TodoWithCheck>;

// 完了済みか未完了か
// 1日のタスクか複数日に渡るタスクか

export const CompletedTodo: ComponentStoryObj<typeof TodoWithCheck> = {
  args: {
    todo: {
      id: "TodoId",
      title: "Todoタイトル",
      startedAt: "2022-03-10",
      finishedAt: null,
      isStatus: true,
    },
    openReadModal: action("openReadModal"),
  },
  storyName: "完了済みタスク",
};

export const NoCompletedTodo: ComponentStoryObj<typeof TodoWithCheck> = {
  args: {
    todo: {
      id: "TodoId",
      title: "Todoタイトル",
      startedAt: "2022-03-10",
      finishedAt: null,
      isStatus: false,
    },
    openReadModal: action("openReadModal"),
  },
  storyName: "未完了タスク",
};

export const MultipleDaysTodo: ComponentStoryObj<typeof TodoWithCheck> = {
  args: {
    todo: {
      id: "TodoId",
      title: "Todoタイトル",
      startedAt: "2022-03-10",
      finishedAt: "2022-03-15",
      isStatus: true,
    },
    openReadModal: action("openReadModal"),
  },
  storyName: "複数日のタスク",
};
