/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { composeStories } from "@storybook/testing-react";
// import userEvent from "@testing-library/user-event";

import * as stories from "../../src/stories/todos/TodoWithCheck.stories";
import { MockedProvider } from "@apollo/client/testing";
import { ChangeTodoStatusDocument } from "../../src/types/generated/graphql";
// import { act } from "react-dom/test-utils";

// composeStories関数は、セットアップされた Story をそのまま jest で再利用（render）可能にする合成関数
const { CompletedTodo, NoCompletedTodo, MultipleDaysTodo } =
  composeStories(stories);

// 完了済みか未完了か
// 1日のタスクか複数日に渡るタスクか
// ステータスの更新が正常に行われるか

describe("チェックボックス付きTodoのテスト", () => {
  afterEach(() => {
    cleanup();
  });

  const mocks = [
    {
      request: {
        query: ChangeTodoStatusDocument, // Codegenで生成されたクエリ Documentで終わるもの。
        variables: {
          todoId: "TodoId",
        },
      },
      result: {
        // データをモック
        data: {
          changeTodoStatus: {
            status: "success",
            node: {
              id: "TodoId",
              isStatus: false,
            },
          },
        },
      },
    },
  ];
  it("Todoのタイトルと日付が表示されるかどうか", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompletedTodo />
      </MockedProvider>,
    );
    expect(screen.getByText("Todoタイトル")).toBeInTheDocument();
    expect(screen.getByText("2022/03/10")).toBeInTheDocument();
  });

  it("完了済みの場合にきちんとチェック がついているかどうか", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompletedTodo />
      </MockedProvider>,
    );
    expect(screen.getByText("Todoタイトル")).toBeInTheDocument();
    expect(screen.getByText("2022/03/10")).toBeInTheDocument();

    // チェックボックスを取得
    const checkbox = screen.getByRole("checkbox");
    // チェックボックスがチェックされているかチェック
    expect(checkbox).toBeChecked();
  });

  it("未完了のTodoが適切に表示されるかどうか(1日のタスク)", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NoCompletedTodo />
      </MockedProvider>,
    );

    // チェックボックスを取得
    const checkbox = screen.getByRole("checkbox");
    // チェックボックスがチェックされてないことをチェック
    expect(checkbox).not.toBeChecked();
  });

  it("複数日に渡るTodoの日付が適切に表示されるかどうか", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MultipleDaysTodo />
      </MockedProvider>,
    );
    expect(screen.getByText("2022/03/10-03/15")).toBeInTheDocument();
  });

  // ↓完了/未完了の更新処理を実装したらテスト
  it("チェックボックスを押すと完了/未完了が適切に切り替わるかどうか", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompletedTodo />
      </MockedProvider>,
    );
    // チェックボックスを取得
    const checkbox = screen.getByRole("checkbox");
    // チェックボックスがチェックされてることをチェック
    expect(checkbox).toBeChecked();
    // チェックボックスをクリック
    // fireEvent.click(screen.getByTestId("toggle-status"));
    // await act(async() => {
    //   await fireEvent.click(checkbox);
    //   // fireEvent.click(screen.getByTestId("toggle-status"));
    //   expect(checkbox).not.toBeChecked();
    // });

    // await new Promise((resolve) => setTimeout(resolve, 0));
    // await waitFor(() => {
    //   expect(checkbox).not.toBeChecked();
    // });
    // チェックボックスがチェックされていないことをチェック
    // expect(checkbox).toBeChecked();
  });
});
