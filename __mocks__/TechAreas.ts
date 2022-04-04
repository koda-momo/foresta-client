import { GetAllTechAreaDocument } from "../src/types/generated/graphql";

// GraphQLエンドポイントへの呼び出しをモック
export const techAreaMocks = [
  {
    request: {
      query: GetAllTechAreaDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    },
    result: {
      // データをモック
      data: {
        getAllTechArea: [
          {
            id: "6219afb4d55e2e236b9062b8",
            name: "フロントエンド基本技術",
          },
          {
            id: "621af5ff47acf1de0466b756",
            name: "サーバーサイド関連",
          },
          {
            id: "6229c817d83a85af19e3c8ee",
            name: "データベース",
          },
          {
            id: "6229c84dd83a85af19e3c8ef",
            name: "NoSQL",
          },
          {
            id: "6229c86bd83a85af19e3c8f1",
            name: "環境",
          },
          {
            id: "6229c87cd83a85af19e3c8f2",
            name: "テスト",
          },
        ],
      },
    },
  },
];
