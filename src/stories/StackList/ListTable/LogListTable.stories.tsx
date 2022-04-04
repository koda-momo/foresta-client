import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Cookies } from "react-cookie";
import { LogListTable } from "../../../components/molucules/stackList/LogListTable";
import { GetAllStudyStackDocument } from "../../../types/generated/graphql";

export default {
  component: LogListTable,
} as ComponentMeta<typeof LogListTable>;
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
        node: [
          {
            id: "stacks",
            content: "ああ",
            timeStack: 100,
            createdAtStart: "2022-02-22",
            createdAtLast: "2022-02-22",
            skillTagId: "React",
            userId: "1111",
          },
          {
            id: "stacks2",
            content: "ああああいい",
            timeStack: 1000,
            createdAtStart: "2022-02-22",
            createdAtLast: "2022-02-22",
            skillTagId: "Vue",
            userId: "1111222",
          },
        ],
      },
      loading: false,
      error: undefined,
    },
  },
];

export const Default: ComponentStoryObj<typeof LogListTable> = {
  parameters: {
    apolloClient: {
      mocks,
      addTypename: false,
    },
  },
  // args: {
  //   data: {
  //     getAllStudyStack: {
  //       node: [
  //         {
  //           id: "111",
  //           content: "あああ",
  //           timeStack: 100,
  //           createdAt: "2022-01-12",
  //           skillTagId: "React",
  //           userId: "123",
  //         },
  //       ],
  //     },
  //   },
  //   storyName: "学習リスト",
  // },
};
