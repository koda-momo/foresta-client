/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  render,
  screen,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { SpecTechInfo } from "../../src/components/molucules/editMe/SpecTechInfo";
import { specTechInfoMocks } from "../../__mocks__/EditMe";
import userEvent from "@testing-library/user-event";

const mock = jest.fn();

/**
 * スペックシートスキル情報のテスト.
 */
const WrapSpecTechInfo = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider
      mocks={specTechInfoMocks}
      addTypename={false}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <SpecTechInfo setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};

describe("スペックシート基本情報のテスト", () => {
  afterEach(() => {
    cleanup();
  });
  describe("正しいモーダルが表示されているか", () => {
    it("スペックシート基本情報を更新のページが表示されている", async () => {
      render(<WrapSpecTechInfo />);
      await waitFor(() => {
        expect(screen.getByText("担当工程")).toBeInTheDocument();
        expect(screen.getByText("動作環境（OS）")).toBeInTheDocument();
        expect(screen.getByText("言語")).toBeInTheDocument();
        expect(screen.getByText("フレームワーク")).toBeInTheDocument();
        expect(screen.getByText("ライブラリ")).toBeInTheDocument();
        expect(screen.getByText("ツール,その他")).toBeInTheDocument();
      });
    });
  });
});
describe("選択肢が正しく表示されている", () => {
  afterEach(() => {
    cleanup();
  });
  it("担当工程の選択肢が正しく表示されているか", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("詳細設計")).toBeInTheDocument();
      expect(screen.getByText("実装")).toBeInTheDocument();
      expect(screen.getByText("デバッグ")).toBeInTheDocument();
      expect(screen.getByText("テスト")).toBeInTheDocument();
    });
  });
  it("動作環境（OS）の選択肢が正しく表示されている", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("Mac")).toBeInTheDocument();
      expect(screen.getByText("Windows")).toBeInTheDocument();
    });
  });
  it("言語の選択肢が正しく表示されている", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });
  });
  it("フレームワークの選択肢が正しく表示されている", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("Vue.js")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });
  it("ライブラリの選択肢が正しく表示されている", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("Redux")).toBeInTheDocument();
      expect(screen.getByText("Vuex")).toBeInTheDocument();
    });
  });
  it("ツール,その他の選択肢が正しく表示されている", async () => {
    render(<WrapSpecTechInfo />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("Figma")).toBeInTheDocument();
      expect(screen.getByText("Slack")).toBeInTheDocument();
    });
  });
});

describe("ボタンのテスト", () => {
  afterEach(() => {
    cleanup();
  });
  it("キャンセルボタンを押した時にメソッドが呼ばれている", async () => {
    render(<WrapSpecTechInfo />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("cancelBtn"));
    expect(mock).toHaveBeenCalled();
  });
});
