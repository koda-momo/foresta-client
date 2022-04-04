import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { ModalSet } from "../components/molucules/ModalSet";

/**
 * モーダルコンポーネント.
 */
export default {
  component: ModalSet,
} as ComponentMeta<typeof ModalSet>;

export const Default: ComponentStoryObj<typeof ModalSet> = {
  args: {
    isOpen: true,
    onClose: () => alert("モーダルをとじる"),
    modalTitle: "Default",
    contents: "Default",
    actionBtnArray: [
      { name: "DefaultAction", action: () => alert("DefaultAction") },
    ],
  },
  storyName: "デフォルト",
};

export const noneTitle: ComponentStoryObj<typeof ModalSet> = {
  args: {
    isOpen: true,
    onClose: () => alert("モーダルをとじる"),
    contents: "noneTitle",
    actionBtnArray: [
      { name: "noneTitle", action: () => alert("noneTitleAction") },
    ],
  },
  storyName: "モーダルタイトルなし",
};

export const manyAction: ComponentStoryObj<typeof ModalSet> = {
  args: {
    isOpen: true,
    onClose: () => alert("モーダルをとじる"),
    modalTitle: "manyAction",
    contents: "manyAction",
    actionBtnArray: [
      { name: "Action1", action: () => alert("Action1") },
      { name: "Action2", action: () => alert("Action2") },
      { name: "Action3", action: () => alert("Action3") },
      { name: "Action4", action: () => alert("Action4") },
    ],
  },
  storyName: "メソッドボタンが複数",
};

export const noneAction: ComponentStoryObj<typeof ModalSet> = {
  args: {
    isOpen: true,
    onClose: () => alert("モーダルをとじる"),
    modalTitle: "noneAction",
    contents: "noneAction",
  },
  storyName: "メソッドボタンなし",
};
