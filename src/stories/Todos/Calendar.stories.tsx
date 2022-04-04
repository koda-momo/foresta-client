import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Calendar } from "../../components/molucules/todos/Calendar";

export default {
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

export const Default: ComponentStoryObj<typeof Calendar> = {
  args: {
    todos: [
      {
        id: "aaa",
        title: "Todo1",
        startedAt: "2022-03-10",
        finishedAt: "2022-03-12",
        isStatus: false,
      },
      {
        id: "bbb",
        title: "Todo2",
        startedAt: "2022-03-15",
        finishedAt: "2022-03-16",
        isStatus: true,
      },
      {
        id: "bbb",
        title: "Todo3",
        startedAt: "2021-03-15",
        finishedAt: null,
        isStatus: false,
      },
      {
        id: "bbb",
        title:
          "長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル",
        startedAt: "2022-03-15",
        finishedAt: null,
        isStatus: true,
      },
      {
        id: "bbb",
        title:
          "長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル",
        startedAt: "2022-03-15",
        finishedAt: "2022-03-17",
        isStatus: true,
      },
    ],
    openReadModal: action("openReadModal"),
  },
  storyName: "デフォルト",
};
