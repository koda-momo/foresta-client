import { gql } from "@apollo/client";
import { Cookies } from "react-cookie";
import {
  GetAllStudyStackDocument,
  GetAllTechTreeDocument,
  GetStudyStackByIdDocument,
} from "../src/types/generated/graphql";

const cookies = new Cookies();

/**
 * 学習リスト
 */
export const studyStacks = [
  {
    request: {
      query: GetAllStudyStackDocument,
      variables: {
        userToken: cookies.get("ForestaID"),
      },
    },
    result: {
      data: {
        getAllStudyStack: {
          status: "success",
          msg: "取得に成功しました",
          node: [
            {
              id: "stacks",
              content: "ああ",
              timeStack: 100,
              createdAt: "2022-02-22",
              skillTagId: "React",
              userId: "1111",
            },
            {
              id: "stacks2",
              content: "ああああいい",
              timeStack: 1000,
              createdAt: "2022-02-22",
              skillTagId: "Vue",
              userId: "1111222",
            },
          ],
        },
      },
    },
  },
];

/**
 * 学習リスト１件詳細
 */
export const studyStacksById = [
  {
    request: {
      query: GetStudyStackByIdDocument,
      variables: {
        userToken: cookies.get("ForestaID"),
      },
    },
    result: {
      data: {
        getStudyStackById: {
          status: "success",
          node: {
            id: "stacks",
            content: "useState理解した",
            timeStack: 100,
            createdAt: "2022-02-22",
            skillTagId: "React",
            userId: "1111",
          },
        },
      },
    },
  },
];

/**
 * 学習技術リスト
 */
export const StackSelectSkills = [
  {
    request: {
      query: GetAllTechTreeDocument,
    },
    result: {
      data: {
        getAllTechTree: [
          {
            id: "1",
            name: "React",
            color: "19D9FC",
            techArea_id: "10",
          },
          {
            id: "2",
            name: "Vue",
            color: "41B883",
            techArea_id: "20",
          },
        ],
      },
    },
  },
];

/**
 * GithubLeafリスト
 */
const GithubLeafs = [
  {
    request: {
      query: gql`
        query ($githubUrl: String!) {
          user(login: $githubUrl) {
            login
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
    },
    result: {
      data: {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 500,
              weeks: [
                {
                  contributionDays: [
                    {
                      color: "#ebedf0",
                      contributionCount: 0,
                      date: "2021-03-28T00:00:00.000+00:00",
                    },
                    {
                      color: "#ebedf0",
                      contributionCount: 0,
                      date: "2021-03-29T00:00:00.000+00:00",
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      color: "#ebedf0",
                      contributionCount: 0,
                      date: "2021-04-04T00:00:00.000+00:00",
                    },
                    {
                      color: "#ebedf0",
                      contributionCount: 0,
                      date: "2021-04-05T00:00:00.000+00:00",
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  },
];

export const githubDatas = {
  get: jest.fn().mockResolvedValue(GithubLeafs),
};
