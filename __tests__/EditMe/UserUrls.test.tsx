/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { UserUrls } from "../../src/components/molucules/editMe/UserUrls";
import { userUrlsMocks } from "../../__mocks__/EditMe";
import userEvent from "@testing-library/user-event";
import { useUserUrls } from "../../src/hooks/editMe/useUserUrls";

const mock = jest.fn();

/**
 * URL編集コンポーネントのテスト.
 */
const WrapUserUrls = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider
      mocks={userUrlsMocks}
      addTypename={false}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <UserUrls setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};
describe("スペックシートその他情報のテスト", () => {
  afterEach(() => {
    cleanup();
  });
  it("URLを更新のページが表示されている", async () => {
    render(<WrapUserUrls />);
    await waitFor(() => {
      expect(screen.getByText("URL name")).toBeInTheDocument();
    });
  });
  it("新規追加ボタンを押して追加画面の項目の表示がされている", async () => {
    render(<WrapUserUrls />);
    await waitFor(() => {
      new Promise((resolve) => setTimeout(resolve, 0));
      userEvent.click(screen.getByTestId("addBtn"));

      expect(screen.getByText("タイトル")).toBeInTheDocument();
      expect(screen.getByText("URL")).toBeInTheDocument();
    });
  });
  it("新規追加ボタンを押して追加画面の項目のplaceholder値が表示されている", async () => {
    render(<WrapUserUrls />);
    await waitFor(() => {
      userEvent.click(screen.getByTestId("addBtn"));
      expect(screen.getByPlaceholderText("タイトル")).toBeTruthy();
      expect(screen.getByPlaceholderText("URL")).toBeTruthy();
    });
  });
  it("削除ボタンを押すと削除確認画面が表示される", async () => {
    render(<WrapUserUrls />);
    await waitFor(() => {
      userEvent.click(screen.getByTestId("deleteBtn"));
      expect(screen.getByText("削除しますか？")).toBeInTheDocument();
    });
  });
});
