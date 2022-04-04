/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { SpecUserInfo } from "../../src/components/molucules/editMe/SpecUserInfo";
import { specUserInfoMocks } from "../../__mocks__/EditMe";

const mock = jest.fn();

/**
 * スペックシート基本情報のテスト.
 *
 */
const WrapSpecSheetInfo = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider
      mocks={specUserInfoMocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <SpecUserInfo setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};
describe("スペックシート基本情報のテスト", () => {
  afterEach(cleanup);
  it("スペックシート基本情報を更新のページが表示されている", () => {
    render(<WrapSpecSheetInfo />);
    new Promise((resolve) => setTimeout(resolve, 0));
    expect(
      screen.getByText("スタッフID(FR-XXX-XXXXの形式)"),
    ).toBeInTheDocument();
    expect(screen.getByText("年齢")).toBeInTheDocument();
    expect(screen.getByText("性別")).toBeInTheDocument();
    expect(screen.getByText("最寄駅")).toBeInTheDocument();
    expect(screen.getByText("最寄線")).toBeInTheDocument();
    expect(screen.getByText("稼働開始日")).toBeInTheDocument();
    expect(screen.getByText("SE経験")).toBeInTheDocument();
    expect(screen.getByText("PG歴,作業員経験")).toBeInTheDocument();
    expect(screen.getByText("IT全体経験")).toBeInTheDocument();
  });

  it("placeholderの初期値が正しく表示されている", () => {
    render(<WrapSpecSheetInfo />);
    new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByPlaceholderText("スタッフID")).toBeTruthy();
    expect(screen.getByPlaceholderText("年齢")).toBeTruthy();
    expect(screen.getByPlaceholderText("最寄駅")).toBeTruthy();
    expect(screen.getByPlaceholderText("最寄線")).toBeTruthy();
    expect(screen.getByPlaceholderText("稼働開始日")).toBeTruthy();
    expect(screen.getByPlaceholderText("SE経験(年)")).toBeTruthy();
    expect(screen.getByPlaceholderText("SE経験(月)")).toBeTruthy();
    expect(screen.getByPlaceholderText("PG歴,作業員経験(年)")).toBeTruthy();
    expect(screen.getByPlaceholderText("PG歴,作業員経験(月)")).toBeTruthy();
    expect(screen.getByPlaceholderText("IT全体経験(年)")).toBeTruthy();
    expect(screen.getByPlaceholderText("IT全体経験(月)")).toBeTruthy();
  });
});
