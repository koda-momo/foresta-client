import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Cookies } from "react-cookie";
import { StackList } from "../../../components/organisms/study/StackList";
import { GetAllStudyStackDocument } from "../../../types/generated/graphql";

export default {
  component: StackList,
} as ComponentMeta<typeof StackList>;

const cookies = new Cookies();

const mocks = [
  {
    request: {
      query: GetAllStudyStackDocument, // Codegenで生成されたクエリ Documentで終わるもの。
      variables: {
        userToken: cookies.get("ForestaID"),
      },
    },
    result: {
      // データをモック
      getAllStudyStack: {
        node: [{}],
      },
      loading: false,
      error: undefined,
    },
  },
];

export const Default: ComponentStoryObj<typeof StackList> = {
  parameters: {
    apolloClient: {
      mocks,
      addTypename: false,
    },
  },

  storyName: "学習リスト",
};
