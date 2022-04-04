import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { FollowButton } from "../../components/atoms/engineers/FollowButton";

export default {
  component: FollowButton,
} as ComponentMeta<typeof FollowButton>;

export const Template: ComponentStoryObj<typeof FollowButton> = {
  storyName: "フォローボタン",
};
