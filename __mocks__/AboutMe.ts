import {
  GetSheetByUserIdDocument,
  GetSheetOtherByUserIdDocument,
  GetSheetPrByUserIdDocument,
  GetSheetProjectByUserIdDocument,
  GetUserByIdDocument,
  useRemoveUserUrlsMutation,
} from "../src/types/generated/graphql";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//パブリック
/**
 * ユーザ情報.
 */
export const userPublicMocks = {
  request: {
    query: GetUserByIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: "",
    },
  },
  result: {
    data: {
      tree: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          name: "山田太郎",
          jobType: "フロントエンドエンジニア",
          spreadSheetID: "",
          githubURL: "",
        },
      },
    },
  },
};

/**
 * 技術ツリー
 */
export const userTreeMocks = {
  request: {
    query: GetSheetByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: cookies.get("ForestaID"),
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      user: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          myForest: [
            {
              id: "1",
              treeName: "React",
              achievementRate: 30,
              color: "blue",
            },
            {
              id: "2",
              treeName: "Vue",
              achievementRate: 40,
              color: "green",
            },
            {
              id: "3",
              treeName: "Angular",
              achievementRate: 50,
              color: "red",
            },
          ],
        },
      },
    },
  },
};

// プライベート
/**
 * 基本情報.
 */
export const userInfoMocks = {
  request: {
    query: GetSheetByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: cookies.get("ForestaID"),
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      user: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          userInfo: {
            id: "ユーザID",
            stuffID: "FR-123-4567",
            age: 20,
            gender: "男",
            nearestStation: "ほげほげ駅(ほげほげ線)",
            startWorkDate: "応相談",
            seExpAmount: 3,
            pgExpAmount: 12,
            itExpAmount: 30,
            specSheetId: "スプレッドシートID",
          },
        },
      },
    },
  },
};

/**
 * エラーの際
 */
export const errorMocks = {
  request: {
    query: GetSheetByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: cookies.get("ForestaID"),
    },
  },
  error: new Error(),
};

/**
 * 自己PR.
 */
export const userPrMocks = {
  request: {
    query: GetSheetPrByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: "",
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      pr: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          id: "ユーザID",
          selfIntro: "自己PR",
        },
      },
    },
  },
};

/**
 * スキル要約.
 */
export const userSkillMocks = {
  request: {
    query: GetSheetPrByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: "",
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      skills: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          techInfo: {
            id: "ユーザID",
            operationEnvs: ["Mac", "Windows", "Linux"],
            languages: ["TypeScript", "HTML", "CSS"],
            frameworks: ["Vue", "React", "Angular"],
            libraries: ["React-hook-form", "Jest", "StoryBook"],
            otherTools: ["Figma", "スプレッドシート"],
            devRoles: ["詳細設計", "実装", "テスト"],
            specSheetId: "スプレッドシートID",
          },
        },
      },
    },
  },
};

/**
 * 開発経験.
 */
export const userProjectMocks = {
  request: {
    query: GetSheetProjectByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: "",
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      projects: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          project: [
            {
              id: "ユーザID",
              name: "プロジェクトタイトル",
              startedAt: "Tue Mar 01 2022 09:00:00 GMT+0900 (日本標準時)",
              finishedAt: "Thu Mar 31 2022 09:00:00 GMT+0900 (日本標準時)",
              roleSharing: "PG",
              memberCount: 30,
              content: "プロジェクトについての詳細説明です。",
              operationEnvs: ["Mac", "Windows", "Linux"],
              languages: ["TypeScript", "HTML", "CSS"],
              frameworks: ["Vue", "React", "Angular"],
              libraries: ["React-hook-form", "Jest", "StoryBook"],
              otherTools: ["Figma", "スプレッドシート"],
              devRoles: ["詳細設計", "実装", "テスト"],
              specSheetId: "スプレッドシートID",
            },
          ],
        },
      },
    },
  },
};

/**
 * その他情報.
 */
export const userOtherMocks = {
  request: {
    query: GetSheetOtherByUserIdDocument, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      userToken: "",
    },
  },
  result: {
    // データをモック
    data: {
      __typename: "Query",
      other: {
        status: "success",
        msg: "取得に成功しました。",
        node: {
          id: "ユーザID",
          studyOnOwnTime: "業務外に行っている事",
          certification: "ITパスポート",
          prevJobs: [
            {
              content: "前職経験1",
            },
            {
              content: "前職経験2",
            },
          ],
        },
      },
    },
  },
};

//=================================================================================-
/**
 * URLの削除.
 */
export const userUrlMocks = {
  request: {
    query: useRemoveUserUrlsMutation, // Codegenで生成されたクエリ Documentで終わるもの。
    variables: {
      urlData: {
        urlId: "useId",
        userUrlsId: "urlTableId",
      },
    },
  },
  result: {
    // データをモック
    data: {
      removeUserUrls: {
        status: "success",
        msg: "削除に成功しました。",
      },
    },
  },
};
