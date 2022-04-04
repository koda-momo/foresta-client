/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";

import { UserPortfolio } from "../../src/components/molucules/editMe/userPortfolio/UserPortfolio";
import { userPortfolioDataMocks } from "../../__mocks__/EditMe";

const mock = jest.fn();

// MockedProviderで囲んだテスト対象のコンポーネントを定義
const WrappedUserPortfolio = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider
      mocks={userPortfolioDataMocks}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <UserPortfolio setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};

/**
 * 制作物編集コンポーネントのテスト.
 */
describe("制作物編集モーダルのテスト", () => {
  afterEach(cleanup);
  it("UserPortfolioのタイトルが表示されている", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    expect(screen.getByText("楽楽精算")).toBeInTheDocument();
  });
  it("削除ボタンを押したときに確認モーダルが表示されるか", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("deleteBtn"));
    expect(screen.getByText("削除しますか？")).toBeInTheDocument();
  });
  it("編集ボタンを押して編集画面の表示がされている", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("editBtn"));
    expect(screen.getByText("プロジェクト名")).toBeInTheDocument();
    expect(screen.getByText("画像URL")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("使用技術")).toBeInTheDocument();
    expect(screen.getByText("詳細")).toBeInTheDocument();
  });

  it("新規追加ボタンを押して編集画面の表示がされている", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("addBtn"));
    expect(screen.getByText("プロジェクト名")).toBeInTheDocument();
    expect(screen.getByText("画像URL")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("使用技術")).toBeInTheDocument();
    expect(screen.getByText("詳細")).toBeInTheDocument();
  });
  it("スキル追加ボタンが正常に動いているか", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("editBtn"));
    fireEvent.click(screen.getAllByTestId("editAddSkills")[0]);
    expect(screen.getAllByTestId("skill")[1]);
  });
  it("キャンセルボタンが正常に動いているか", async () => {
    render(<WrappedUserPortfolio />);
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
    userEvent.click(screen.getByTestId("cancelBtn"));
    expect(screen.queryByText("プロジェクト名")).not.toBeInTheDocument();
    screen.debug();
  });
});
