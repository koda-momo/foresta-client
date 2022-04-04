import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { StudyModal } from "../../../components/molucules/stackList/StudyModal";

export default {
  component: StudyModal,
} as ComponentMeta<typeof StudyModal>;

/**
 * モーダル表示するコンポーネント
 */
export const Default: ComponentStoryObj<typeof StudyModal> = {
  args: {
    title: "デフォルト",
    icon: <AddIcon />,
    stackId: "",
  },
  storyName: "デフォルト",
};

export const AddStack: ComponentStoryObj<typeof StudyModal> = {
  args: {
    title: "記録追加",
    icon: <AddIcon />,
    stackId: "",
  },
  storyName: "記録追加",
};

export const UpdateStack: ComponentStoryObj<typeof StudyModal> = {
  args: {
    title: "記録編集",
    icon: <EditIcon />,
    stackId: "111",
  },
  storyName: "記録編集",
};

export const DeleteStack: ComponentStoryObj<typeof StudyModal> = {
  args: {
    title: "記録削除",
    icon: <DeleteIcon />,
    stackId: "111",
  },
  storyName: "記録削除",
};
