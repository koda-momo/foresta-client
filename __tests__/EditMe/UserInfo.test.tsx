/**
 * @jest-environment jsdom
 */
import React from "react";
import {
  render,
  screen,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { UserInfo } from "../../src/components/molucules/editMe/UserInfo";
import {
  userInfoDataMocks,
  userInfoDataErrorMocks,
} from "../../__mocks__/EditMe";

const mock = jest.fn();

/**
 * public部分基本情報編集コンポーネントのテスト.
 */
const WrapUserInfo = () => {
  return (
    <MockedProvider
      mocks={userInfoDataMocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <UserInfo setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};

//エラーの場合のモック
const WrapErrorUserInfo = () => {
  return (
    <MockedProvider mocks={[userInfoDataErrorMocks]} addTypename={false}>
      <UserInfo setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};
describe("ユーザー情報", () => {
  afterEach(cleanup);
  it("UserInfoのメニューが表示されている", () => {
    render(<WrapUserInfo />);
    waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText("氏名")).toBeInTheDocument();
      expect(screen.getByText("GitHubアカウント")).toBeInTheDocument();
      expect(screen.getByText("職種")).toBeInTheDocument();
      expect(
        screen.getByText("スプレッドシートID(スプレッドシートのURL)"),
      ).toBeInTheDocument();
    });
  });

  it("placeholderの初期値が正しく表示されている", () => {
    render(<WrapUserInfo />);
    waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByPlaceholderText("氏名")).toBeTruthy();
      expect(screen.getByPlaceholderText("GitHubアカウント")).toBeTruthy();
      expect(screen.getByPlaceholderText("スプレッドシートID")).toBeTruthy();
    });
  });
});
