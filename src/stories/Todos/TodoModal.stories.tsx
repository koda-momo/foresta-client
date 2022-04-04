import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { TodoModal } from "../../components/organisms/study/TodoModal";
import { withReactContext } from "storybook-react-context";
import { TodoModalContext } from "../../Providers/TodoModalProvider";

export default {
  component: TodoModal,
} as ComponentMeta<typeof TodoModal>;

export const BasicRead: ComponentStoryObj<typeof TodoModal> = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
  },
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "read",
        setModalMode: action("setModalMode"),
        todo: {
          id: "Todo1Id",
          title: "Todo1",
          description: "Todo1のメモです",
          startedAt: "2022-03-10",
          finishedAt: "2022-03-12",
          isStatus: false,
        },
        setTodo: action("setTodo"),
      },
    }),
  ],
  storyName: "閲覧モード(Basic)",
};

export const LongRead: ComponentStoryObj<typeof TodoModal> = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
  },
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "read",
        setModalMode: action("setModalMode"),
        todo: {
          id: "Todo1Id",
          title:
            "長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル",
          description:
            "長いメモ\n 長いメモ長いメモ長いメモ長いメモ\n\n\n\n長いメモ\n長いメモ\n\n長いメモ",
          startedAt: "2022-03-10",
          finishedAt: "2022-03-12",
          isStatus: false,
        },
        setTodo: action("setTodo"),
      },
    }),
  ],
  storyName: "閲覧モード(タイトルやメモが長い)",
};

export const AddMode: ComponentStoryObj<typeof TodoModal> = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
  },
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "create",
        setModalMode: action("setModalMode"),
        todo: {},
        setTodo: action("setTodo"),
      },
    }),
  ],
  storyName: "追加モード",
};

export const UpdateMode: ComponentStoryObj<typeof TodoModal> = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
  },
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "update",
        setModalMode: action("setModalMode"),
        todo: {
          id: "Todo1Id",
          title: "Todo1",
          description: "Todo1のメモです",
          startedAt: "2022-03-10",
          finishedAt: "2022-03-12",
          isStatus: false,
        },
        setTodo: action("setTodo"),
      },
    }),
  ],
  storyName: "編集モード",
};

export const DeleteMode: ComponentStoryObj<typeof TodoModal> = {
  args: {
    isOpen: true,
    onClose: action("onClose"),
  },
  decorators: [
    withReactContext({
      Context: TodoModalContext,
      initialState: {
        modalMode: "delete",
        setModalMode: action("setModalMode"),
        todo: {
          id: "Todo1Id",
          title: "Todo1",
          description: "Todo1のメモです",
          startedAt: "2022-03-10",
          finishedAt: "2022-03-12",
          isStatus: false,
        },
        setTodo: action("setTodo"),
      },
    }),
  ],
  storyName: "削除モード",
};
