/**
 * @jest-environment jsdom
 */
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { useState } from "react";
import fetch from "cross-fetch";

import { OtherData } from "../../src/components/molucules/aboutMePrivate/OtherData";
import { Project } from "../../src/components/molucules/aboutMePrivate/Project";
import { SkillTable } from "../../src/components/molucules/aboutMePrivate/SkillTable";
import { UserInfoTable } from "../../src/components/molucules/aboutMePrivate/UserInfoTable";
import { SpecPr } from "../../src/components/molucules/aboutMePrivate/SpecPr";
import {
  errorMocks,
  userInfoMocks,
  userPrMocks,
  userProjectMocks,
  userSkillMocks,
} from "../../__mocks__/AboutMe";
import { MenuBar } from "../../src/components/organisms/aboutMe/MenuBar";
import userEvent from "@testing-library/user-event";
import { UserInfo } from "../../src/components/molucules/editMe/UserInfo";
import {
  specSheetMocks,
  specTechInfoMocks,
  specUserInfoMocks,
  userInfoDataMocks,
  userPortfolioDataMocks,
  userUrlsMocks,
} from "../../__mocks__/EditMe";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { UserPortfolio } from "../../src/components/molucules/editMe/userPortfolio/UserPortfolio";
import { UserUrls } from "../../src/components/molucules/editMe/UserUrls";
import { SpecUserInfo } from "../../src/components/molucules/editMe/SpecUserInfo";
import { SpecTechInfo } from "../../src/components/molucules/editMe/SpecTechInfo";
import { SpecProject } from "../../src/components/molucules/editMe/specProject/SpecProject";
import { SpecSheet } from "../../src/components/molucules/editMe/SpecSheet";

/**
 * 基本情報コンポーネントのテスト.
 */
const WrapedUserInfoArea = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider mocks={[userInfoMocks]} addTypename={false}>
      <UserInfoTable />
    </MockedProvider>
  );
};
describe("基本情報の表示", () => {
  it("基本情報が表示される", () => {
    waitFor(() => {
      render(<WrapedUserInfoArea />);
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("FR-123-4567")).toBeInTheDocument();
      expect(screen.getByText("20歳")).toBeInTheDocument();
      expect(screen.getByText("ほげほげ駅(ほげほげ線)")).toBeInTheDocument();
      expect(screen.getByText("応相談")).toBeInTheDocument();
      expect(screen.getByText("0年3ヵ月")).toBeInTheDocument();
      expect(screen.getByText("1年0ヵ月")).toBeInTheDocument();
      expect(screen.getByText("2年6ヵ月")).toBeInTheDocument();
    });
  });
});

/**
 * テキストボックス(長い文章を表示する)コンポーネントのテスト.
 */
const WrapedPrArea = () => {
  return (
    <MockedProvider mocks={[userPrMocks]} addTypename={false}>
      <SpecPr />
    </MockedProvider>
  );
};
describe("自己PRの表示", () => {
  it("自己PRの表示される", () => {
    waitFor(() => {
      render(<WrapedPrArea />);
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("自己PR")).toBeInTheDocument();
    });
  });
});

/**
 * スキル要約コンポーネントのテスト.
 */
const WrapedSkillArea = () => {
  return (
    <MockedProvider mocks={[userSkillMocks]} addTypename={false}>
      <SkillTable />
    </MockedProvider>
  );
};
describe("スキル要約の表示", () => {
  it("情報が表示される", () => {
    waitFor(() => {
      render(<WrapedSkillArea />);
      new Promise((resolve) => setTimeout(resolve, 0));

      //OS
      expect(screen.getByText("Mac"[0])).toBeInTheDocument();
      expect(screen.getByText("Windows"[1])).toBeInTheDocument();
      expect(screen.getByText("Linux"[2])).toBeInTheDocument();

      //言語
      expect(screen.getByText("TypeScript"[0])).toBeInTheDocument();
      expect(screen.getByText("HTML"[1])).toBeInTheDocument();
      expect(screen.getByText("CSS"[2])).toBeInTheDocument();

      //フレームワーク
      expect(screen.getByText("Vue"[0])).toBeInTheDocument();
      expect(screen.getByText("React"[1])).toBeInTheDocument();
      expect(screen.getByText("Angular"[2])).toBeInTheDocument();

      //ライブラリ
      expect(screen.getByText("React-hook-form"[0])).toBeInTheDocument();
      expect(screen.getByText("Jest"[1])).toBeInTheDocument();
      expect(screen.getByText("StoryBook"[2])).toBeInTheDocument();

      //その他ツール
      expect(screen.getByText("Figma"[0])).toBeInTheDocument();
      expect(screen.getByText("スプレッドシート"[1])).toBeInTheDocument();

      //担当工程
      expect(screen.getByText("詳細設計"[0])).toBeInTheDocument();
      expect(screen.getByText("実装"[1])).toBeInTheDocument();
      expect(screen.getByText("テスト"[2])).toBeInTheDocument();
    });
  });
});

/**
 * 開発経験コンポーネントのテスト.
 */
const WrapedProjectArea = () => {
  return (
    <MockedProvider mocks={[userInfoMocks]} addTypename={false}>
      <Project />
    </MockedProvider>
  );
};
describe("開発経験の表示", () => {
  it("内容が表示される", () => {
    waitFor(() => {
      render(<WrapedProjectArea />);
      new Promise((resolve) => setTimeout(resolve, 0));

      //基本情報
      expect(screen.getByText("プロジェクトタイトル")).toBeInTheDocument();
      expect(screen.getByText("PG")).toBeInTheDocument();
      expect(screen.getByText(30)).toBeInTheDocument();
      expect(
        screen.getByText("プロジェクトについての詳細説明です。"),
      ).toBeInTheDocument();
      expect(screen.getByText("PG")).toBeInTheDocument();
      expect(screen.getByText("2022-3-1~2022-3-31")).toBeInTheDocument();

      //OS
      expect(screen.getByText("Mac"[0])).toBeInTheDocument();
      expect(screen.getByText("Windows"[1])).toBeInTheDocument();
      expect(screen.getByText("Linux"[2])).toBeInTheDocument();

      //言語
      expect(screen.getByText("TypeScript"[0])).toBeInTheDocument();
      expect(screen.getByText("HTML"[1])).toBeInTheDocument();
      expect(screen.getByText("CSS"[2])).toBeInTheDocument();

      //フレームワーク
      expect(screen.getByText("Vue"[0])).toBeInTheDocument();
      expect(screen.getByText("React"[1])).toBeInTheDocument();
      expect(screen.getByText("Angular"[2])).toBeInTheDocument();

      //ライブラリ
      expect(screen.getByText("React-hook-form"[0])).toBeInTheDocument();
      expect(screen.getByText("Jest"[1])).toBeInTheDocument();
      expect(screen.getByText("StoryBook"[2])).toBeInTheDocument();

      //その他ツール
      expect(screen.getByText("Figma"[0])).toBeInTheDocument();
      expect(screen.getByText("スプレッドシート"[1])).toBeInTheDocument();

      //担当工程
      expect(screen.getByText("詳細設計"[0])).toBeInTheDocument();
      expect(screen.getByText("実装"[1])).toBeInTheDocument();
      expect(screen.getByText("テスト"[2])).toBeInTheDocument();
    });
  });
});

/**
 * その他データコンポーネントのテスト.
 */
const WrapedOtherArea = () => {
  return (
    <MockedProvider mocks={[userInfoMocks]} addTypename={false}>
      <OtherData />
    </MockedProvider>
  );
};
//エラーの場合のモック
const WrapedErrorOtherArea = () => {
  return (
    <MockedProvider mocks={[errorMocks]} addTypename={false}>
      <OtherData />
    </MockedProvider>
  );
};
describe("その他の情報の表示", () => {
  it("基本情報が表示される", () => {
    waitFor(() => {
      render(<WrapedOtherArea />);
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("業務外に行っている事")).toBeInTheDocument();
      expect(screen.getByText("ITパスポート")).toBeInTheDocument();
      expect(screen.getByText("前職経験1"[0])).toBeInTheDocument();
      expect(screen.getByText("前職経験2"[1])).toBeInTheDocument();
    });
  });
});

// describe("メニューバー", () => {
//   const onClose = jest.fn();
//   const client = new ApolloClient({
//     link: createHttpLink({
//       uri: "http://localhost:4000/",
//       fetch,
//     }),
//     cache: new InMemoryCache(),
//   });

//   it("メニューバーが表示される", () => {
//     act(() => {
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       expect(screen.getByText("ユーザ情報")).toBeInTheDocument();
//       expect(screen.getByText("制作物")).toBeInTheDocument();
//       expect(screen.getByText("URL")).toBeInTheDocument();
//       expect(screen.getByText("スペックシート基本情報")).toBeInTheDocument();
//       expect(screen.getByText("スペックシートスキル要約")).toBeInTheDocument();
//       expect(screen.getByText("スペックシートその他情報")).toBeInTheDocument();
//       expect(screen.getByText("スペックシート開発経験")).toBeInTheDocument();
//     });
//   });
//   it("メニューバー内のボタンをクリックする", () => {
//     waitFor(async () => {
//       //ユーザ情報
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("ユーザ情報"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={userInfoDataMocks}>
//             <UserInfo setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(screen.getByText("ユーザ情報を更新")).toBeInTheDocument();
//       //制作物
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("制作物"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={userPortfolioDataMocks}>
//             <UserPortfolio setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(screen.getByText("制作物を更新")).toBeInTheDocument();
//       //URL
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("URL"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={userUrlsMocks}>
//             <UserUrls setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(screen.getByText("URLを更新")).toBeInTheDocument();
//       //スペシ基本情報
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("スペックシート基本情報"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={specUserInfoMocks}>
//             <SpecUserInfo setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(
//         screen.getByText("スペックシート基本情報を更新"),
//       ).toBeInTheDocument();
//       //スぺシスキル要約
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("スペックシートスキル要約"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={specTechInfoMocks}>
//             <SpecTechInfo setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(
//         screen.getByText("スペックシートスキル要約を更新"),
//       ).toBeInTheDocument();
//       //スペシその他
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("スペックシートその他情報"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={specSheetMocks}>
//             <SpecSheet setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(
//         screen.getByText("スペックシートその他情報を更新"),
//       ).toBeInTheDocument();
//       //スペシ開発経験
//       render(<MenuBar />);
//       userEvent.click(screen.queryByTestId("open-menu"));
//       userEvent.click(screen.getByText("スペックシート開発経験"));
//       render(
//         <ApolloProvider client={client}>
//           <MockedProvider mocks={[userProjectMocks]}>
//             <SpecProject setMenuItem={useState} onClose={onClose} />
//           </MockedProvider>
//         </ApolloProvider>,
//       );
//       new Promise((resolve) => setTimeout(resolve, 0));
//       expect(
//         screen.getByText("スペックシート開発経験を更新"),
//       ).toBeInTheDocument();
//     });
//   });
// });
