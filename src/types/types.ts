import { ChartData, ChartOptions } from "chart.js";
import { string } from "yup";
import {
  Todo,
  Portfolio,
  User,
  StudyStack,
  TreeInfo,
} from "./generated/graphql";

// Todoの型
export type TodoData = Pick<
  Todo,
  "id" | "title" | "description" | "startedAt" | "finishedAt" | "isStatus"
>;

// Todoモーダルのモードの型
export type TodoModalModeType = "read" | "update" | "create" | "delete";

//ユーザ型
export type UserType = Pick<
  User,
  "id" | "name" | "jobType" | "githubURL" | "spreadSheetID"
>;

//制作物
export type PortfolioType = Pick<
  Portfolio,
  | "id"
  | "title"
  | "description"
  | "img"
  | "portfolioURL"
  | "specSheetId"
  | "skills"
>;

//ユーザ情報編集
export type UserInfoType = {
  userToken: string;
  name: string;
  jobType: string;
  githubURL: string;
  spreadSheetID: string;
};

//制作物新規追加
export type NewPortfolioType = {
  title: string;
  description: string;
  img: string;
  portfolioURL: string;
  specSheetId: string;
};

//制作物編集
export type EditPortfolioType = {
  title: string;
  description: string;
  img: string;
  portfolioURL: string;
};

//URL編集
export type UrlType = {
  urlName: string;
  url: string;
};

//スペックシート
export type SpecUserInfoType = {
  stuffID: string;
  age: number;
  gender: string;
  nearestStation: string;
  nearestLine: string;
  startWorkDate: string;
  seExpAmountYear: number;
  seExpAmountMonth: number;
  pgExpAmountYear: number;
  pgExpAmountMonth: number;
  itExpAmountYear: number;
  itExpAmountMonth: number;
};
//スペックシートスキル要約
export type SkillType = {
  id: string;
  devRoles: Array<string>;
  operationEnvs: Array<string>;
  languages: Array<string>;
  frameworks: Array<string>;
  libraries: Array<string>;
  otherTools: Array<string>;
  specSheetId: string;
};

//スペックシート開発経験編集
export type ProjectType = {
  name: string;
  startedAt: string;
  finishedAt: string;
  roleSharing: string;
  memberCount: number;
  content: string;
  devRoles: Array<string>;
  operationEnvs: Array<string>;
  languages: Array<string>;
  frameworks: Array<string>;
  libraries: Array<string>;
  otherTools: Array<string>;
};

// エンジニアの型
export type EngineerData = {
  id: string;
  name: string;
  jobType: string;
  email: string;
  password: string;
  spreadSheetID: string;
  githubURL: string;
  token: string;
  _uuid: string;
};

// 技術エリアの型
export type TechArea = {
  id: string;
  name: string;
};

//技術ツリーの型
export type TreeData = {
  id: string;
  treeId: string;
  areaId: string;
  treeName: string;
  achievementRate: number;
  color: string;
  branches: {
    id: string;
    name: string;
    leafs: {
      id: string;
      name: string;
      techBranch_id: string;
      techTree_id: string;
      isStatus: boolean;
    }[];
  }[];
};

//技術ツリーのみの型
export type TreeOnlyType = Pick<
  TreeInfo,
  "id" | "achievementRate" | "treeName" | "color"
>;

// 技術ブランチの型
export type TechBranch = {
  id: string;
  name: string;
  leafs: {
    id: string;
    name: string;
    techBranch_id: string;
    techTree_id: string;
    isStatus: boolean;
  }[];
};

//技術リーフの型
export type TechLeafData = {
  id: string;
  name: string;
  techBranch_id: string;
  techTree_id: string;
  isStatus: boolean;
};

// エンジニアの型
export type Engineer = {
  engineerData: {
    __typename?: "User" | undefined;
    id: string;
    name: string;
    jobType: string;
    email: string;
    password: string;
    githubURL: string;
  };
  key: number;
};

//学習リストの型
export type AddStack = Pick<
  StudyStack,
  "createdAt" | "skillTagId" | "timeStack" | "content"
>;

//Githubの草データを取得するときの型
export type GithubLeafType = {
  user: {
    login: string;
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: [
          {
            contributionDays: [
              {
                contributionCount: number;
                date: string;
                color: string;
              },
            ];
          },
        ];
      };
    };
  };
};

//日にち毎の学習時間グラフ用
export type DayStackTime = {
  subDateBtn: () => void;
  dateValueDay: number;
  addDateBtn: () => void;
  chartDatas: {
    datasets: {
      label: string;
      data: {
        x: number;
        y: number;
      }[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  dayOptions: any;
  pieDateData: ChartData<"pie">;
  dayPercentOptions: any;
};

//月毎の学習時間グラフ用
export type MonthStackTime = {
  subDateBtn: () => void;
  dateValueMonth: number;
  addDateBtn: () => void;
  chartDatas: {
    datasets: {
      label: string;
      data: {
        x: number;
        y: number;
      }[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  monthOptions: any;
  pieMonthData: ChartData<"pie">;
  monthPercentOptions: ChartOptions<"pie">;
};
