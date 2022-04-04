/**
 * @jest-environment jsdom
 */
import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";

import { Public } from "../../src/components/organisms/aboutMe/Public";
import { UrlList } from "../../src/components/molucules/aboutMePublic/UrlList";
import { SiteImageBox } from "../../src/components/molucules/aboutMePublic/SiteImageBox";
import { SiteDetail } from "../../src/components/molucules/aboutMePublic/SiteDetail";
import { SiteImage } from "../../src/components/atoms/AboutMePublic/SiteImage";
import { userPublicMocks, userTreeMocks } from "../../__mocks__/AboutMe";
import { MyTechStack } from "../../src/components/molucules/aboutMePublic/MyTechStack";

/**
 * 基本情報コンポーネントのテスト.
 */
const WrapedUserInfoArea = () => {
  return (
    <MockedProvider mocks={[userPublicMocks]} addTypename={false}>
      <Public />
    </MockedProvider>
  );
};

describe("基本情報の表示", () => {
  it("基本情報が表示される", () => {
    waitFor(() => {
      render(
        <BrowserRouter>
          <WrapedUserInfoArea />
        </BrowserRouter>,
      );
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("氏名:山田太郎")).toBeInTheDocument();
      expect(screen.getByText("フロントエンドエンジニア")).toBeInTheDocument();
    });
  });
});

/**
 * URLリストコンポーネントのテスト.
 */
describe("URLリストの表示", () => {
  act(() => {
    it("URLが表示される", () => {
      render(
        <UrlList
          data={[
            { urlName: "URL1", url: "url1.com", id: "id1" },
            { urlName: "URL2", url: "url2.com", id: "id2" },
          ]}
        />,
      );
      expect(screen.getByText("『URL1』")).toBeInTheDocument();
      expect(screen.getByText("url1.com")).toBeInTheDocument();
      expect(screen.getByText("『URL2』")).toBeInTheDocument();
      expect(screen.getByText("url2.com")).toBeInTheDocument();
    });
  });
});

/**
 * SiteImageBoxコンポーネントのテスト.
 */
describe("制作画面の表示", () => {
  act(() => {
    it("制作物が表示される", () => {
      render(
        <SiteImageBox
          data={[
            {
              id: "ID1",
              title: "制作物タイトル1",
              description: "詳細詳細詳細",
              img: "image.jpg",
              portfolioURL: "url.com",
              skills: ["Vue", "TypeScript"],
              specSheetId: "スプレッドシートID",
            },
            {
              id: "ID2",
              title: "制作物タイトル2",
              description: "詳細詳細詳細",
              img: "image.jpg",
              portfolioURL: "url.com",
              skills: ["Vue", "TypeScript"],
              specSheetId: "スプレッドシートID",
            },
            {
              id: "ID3",
              title: "制作物タイトル3",
              description: "詳細詳細詳細",
              img: "image.jpg",
              portfolioURL: "url.com",
              skills: ["Vue", "TypeScript"],
              specSheetId: "スプレッドシートID",
            },
          ]}
        />,
      );
      expect(screen.getByText("制作物タイトル1")).toBeInTheDocument();
      expect(screen.getByText("制作物タイトル2")).toBeInTheDocument();
      expect(screen.getByText("制作物タイトル3")).toBeInTheDocument();
    });
  });
});

/**
 * SiteDetailコンポーネントのテスト.
 */
describe("制作物詳細画面の表示", () => {
  act(() => {
    const dummyPortfolioList = {
      id: "ID",
      specSheetId: "スプレッドシートID",
      skills: ["Vue", "TypeScript"],
      title: "dummytitle",
      description: "dummy description",
      img: "dummyimage.jpg",
      portfolioURL: "dummyurl.com",
    };
    it("制作物詳細表示テスト", () => {
      render(<SiteDetail siteItem={dummyPortfolioList} />);
      expect(screen.getByText("Vue")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("dummy description")).toBeInTheDocument();
      expect(screen.getByText("dummyurl.com")).toBeInTheDocument();
      //画像表示テスト
    });
  });
});

/**
 * 個々の制作物画面.
 */
describe("個々の制作物画面", () => {
  act(() => {
    const dummyData = {
      imageUrl: "image.jpg",
      siteName: "dummy site name",
    };

    it("Propsが表示される", () => {
      render(<SiteImage {...dummyData} />);
      expect(screen.getByText("dummy site name")).toBeInTheDocument();
    });
  });
});

/**
 * 技術ツリーのゾーンテスト.
 */
const WrapedTreeArea = () => {
  return (
    <MockedProvider mocks={[userTreeMocks]} addTypename={false}>
      <MyTechStack />
    </MockedProvider>
  );
};
describe("技術ツリー埋め込み部分", () => {
  it("技術ツリーが表示される", () => {
    waitFor(() => {
      render(<WrapedTreeArea />);
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("進捗率 30%")).toBeInTheDocument();
    });
  });
});
