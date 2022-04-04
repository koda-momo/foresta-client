/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { composeStories } from "@storybook/testing-react";
// import userEvent from "@testing-library/user-event";

import * as stories from "../../src/stories/todos/TodoList.stories";
import { MockedProvider } from "@apollo/client/testing";
import { ChangeTodoStatusDocument } from "../../src/types/generated/graphql";

// composeStories関数は、セットアップされた Story をそのまま jest で再利用（render）可能にする合成関数
const { Default, NoTodo, Loading, Error } = composeStories(stories);

describe("Todoリストのテスト", () => {
  afterEach(() => {
    cleanup();
  });

  const mocks = [
    {
      request: {
        query: ChangeTodoStatusDocument, // Codegenで生成されたクエリ Documentで終わるもの。
        variables: {
          todoId: "Todo1Id",
        },
      },
      result: {
        // データをモック
        data: {
          changeTodoStatus: {
            status: "success",
            node: {
              id: "Todo1Id",
              isStatus: true,
            },
          },
        },
      },
    },
  ];
  it("Todoリストのタイトルやタブ名が適切に表示されるか", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Default />
      </MockedProvider>,
    );
    expect(screen.getByText("TodoList")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Expired")).toBeInTheDocument();
  });

  it("Propsで渡ったTodosが適切に表示されるか", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Default />
      </MockedProvider>,
    );
    expect(screen.getByText("Todo1")).toBeInTheDocument();
    expect(screen.getByText("2022/03/10-03/12")).toBeInTheDocument();
    expect(screen.getByText("Todo2")).toBeInTheDocument();
    expect(screen.getByText("2022/03/15-03/16")).toBeInTheDocument();
  });

  it("Todoがない時の表示が適切に表示されるか", () => {
    render(<NoTodo />);
    screen.debug();
    expect(screen.getByText("TodoList")).toBeInTheDocument();
    expect(screen.getByText("該当のTodoが存在しません")).toBeInTheDocument();
  });

  it("ローディング中の表示が適切になされるか", () => {
    render(<Loading />);
    expect(screen.getByText("TodoList")).toBeInTheDocument();
    expect(screen.getByTestId("todo-loading")).toBeInTheDocument();
  });

  it("エラー発生時の表示が適切になされるか", () => {
    render(<Error />);
    expect(screen.getByText("TodoList")).toBeInTheDocument();
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });
});
