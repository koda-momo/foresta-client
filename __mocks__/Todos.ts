import { Cookies } from "react-cookie";
import { GetAllTodoByUserDocument, ChangeTodoStatusDocument } from "../src/types/generated/graphql";

// クッキー取得用にインスタンス作成
const cookies = new Cookies();

export const todoListDataMock = [
  {
    id: "TodoId",
    title: "Todo1",
    description: "Todo1のメモ",
    startedAt: "2022-03-10",
    finishedAt: "2022-03-12",
    isStatus: false,
  },
  {
    id: "Todo2Id",
    title: "Todo2",
    description: "Todo2のメモ",
    startedAt: "2022-03-15",
    finishedAt: "2022-03-16",
    isStatus: false,
  },
  {
    id: "Todo3Id",
    title: "Todo3",
    description: "Todo4のメモ",
    startedAt: "2021-03-15",
    finishedAt: null,
    isStatus: false,
  },
  {
    id: "Todo4Id",
    title:
      "長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル",
    description: "Todoのメモ",
    startedAt: "2022-04-15",
    finishedAt: null,
    isStatus: true,
  },
  {
    id: "Todo5Id",
    title:
      "長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル",
    description: "Todoのメモ",
    startedAt: "2022-04-02",
    finishedAt: "2022-04-04",
    isStatus: true,
  },
];

// GraphQLエンドポイントへの呼び出しをモック
export const todoMocks = [
  {
    request: {
      query: GetAllTodoByUserDocument, // Codegenで生成されたクエリ Documentで終わるもの。
      variables: {
        userToken: cookies.get("ForestaID"),
      }
    },
    result: {
      // データをモック
      data: {
        todos: {
          node: todoListDataMock
        }
      },
    },
  },
  {
    request: {
      query: ChangeTodoStatusDocument, // Codegenで生成されたクエリ Documentで終わるもの。
      variables: {
        todoId: "TodoId"
      },
    },
    result: {
      // データをモック
      data: {
        changeTodoStatus: {
          status: "success",
          node: {
            id: "TodoId",
            isStatus: false,
          },
        },
      },
    },
  },
];
