import {
  GetUserByIdDocument,
  GetUserPortfolioByIdDocument,
  GetSheetByUserIdDocument,
  GetAllSkillDocument,
  GetUserUrlByIdDocument,
  GetPrAndSheetByUserIdDocument,
} from "../src/types/generated/graphql";

import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const userInfoDataMocks = [
  {
    request: {
      query: GetUserByIdDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        user: {
          node: [
            {
              name: "ワンパンマン",
              jobType: "フロントエンド",
              githubURL: "aaa",
              spreadSheetID: "aaa",
            },
          ],
        },
      },
    },
  },
];

/**
 * エラーの際
 */
export const userInfoDataErrorMocks = {
  request: {
    query: GetUserByIdDocument,
    variables: {
      userToken: cookies.get("ForestaID"),
    },
  },
  error: new Error(),
};

export const userPortfolioDataMocks = [
  {
    request: {
      query: GetUserPortfolioByIdDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        portfolios: {
          node: {
            portfolio: [
              {
                title: "楽楽精算",
                description: "らくらくで精算が出来ます",
                img: "aaa",
                portfolioURL: "https://www.rakus-partners.co.jp/",
                id: "62394a1e73afa330af3e9e6f",
                skills: ["HTML", "CSS"],
                specSheetId: "62328a90a3898d80f211bf42",
              },
            ],
          },
        },
      },
    },
  },
];

export const specUserInfoMocks = [
  {
    request: {
      query: GetSheetByUserIdDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        user: {
          node: {
            userInfo: [
              {
                stuffID: "FR-000-0000",
                age: 25,
                gender: "女",
                nearestStation: "新宿駅",
                nearestLine: "埼京線",
                startWorkDate: "2000-10-10",
                seExpAmountYear: "10",
                seExpAmountMonth: 10,
                pgExpAmountYear: 10,
                pgExpAmountMonth: 10,
                itExpAmountYear: 10,
                itExpAmountMonth: 10,
              },
            ],
          },
        },
      },
    },
  },
];

export const specTechInfoMocks = [
  {
    request: {
      query: GetAllSkillDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        skills: [
          {
            data: ["Mac", "Windows"],
          },
          {
            data: ["TypeScript", "JavaScript"],
          },
          {
            data: ["Vue.js", "React"],
          },
          {
            data: ["Vuex", "Redux"],
          },
          {
            data: ["Slack", "Figma"],
          },
        ],
      },
    },
  },
];

export const specSheetMocks = [
  {
    request: {
      query: GetPrAndSheetByUserIdDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        other: {
          node: [
            {
              certification: "自動車免許",
              studyOnOwnTime: "Qiitaに投稿しています。",
              prevJobs: [{ content: "楽天" }],
            },
          ],
        },
        pr: {
          node: [
            {
              selfIntro: "コミュニケーション能力があります。",
            },
          ],
        },
      },
    },
  },
];

export const userUrlsMocks = [
  {
    request: {
      query: GetUserUrlByIdDocument,
      variables: { userToken: cookies.get("ForestaID") },
    },
    result: {
      data: {
        urls: {
          node: {
            userUrls: {
              user_urls: [
                {
                  urlName: "URL name",
                  url: "aaaa",
                  id: "aaaaaa",
                },
              ],
            },
          },
        },
      },
    },
  },
];

/**
 * エラーの際
 */
export const errorMocks = {
  request: {
    query: GetSheetByUserIdDocument,
    variables: {
      userToken: cookies.get("ForestaID"),
    },
  },
  error: new Error(),
};
