/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// GraphQLエンドポイントへの呼び出しをモックするパッケージ
import { MockedProvider } from "@apollo/client/testing";
// import userEvent from "@testing-library/user-event";
import { Cookies } from "react-cookie";
// import { renderHook } from "@testing-library/react-hooks";

import { TodosArea } from "../../src/components/organisms/study/TodosArea";
import { todoMocks } from "../../__mocks__/Todos";
import { GetAllTodoByUserDocument } from "../../src/types/generated/graphql";
// ファイルから直接 export されない、包括的な名前空間を用意
// import * as TodoModalContext from "../../src/Providers/TodoModalProvider";
import { TodoModalProvider } from "../../src/Providers/TodoModalProvider";
// import { useTodoModal } from "../../src/hooks/study/useTodoModal";
// import { useTodoModalContext } from "../../src/hooks/study/useTodoModalContext";

// クッキー取得用にインスタンス作成
const cookies = new Cookies();

/**
 * MockedProvider, TodoModalProviderで囲んだテスト対象のコンポーネントを定義
 */
const WrapedTodosArea = ({ mocks }) => {
  return (
    // mocksに作成したモックを渡して囲む
    <TodoModalProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodosArea />
      </MockedProvider>
    </TodoModalProvider>
  );
};

describe("TodosAreaのテスト", () => {
  // let alertStateSpy: jest.SpyInstance<unknown>;
  // beforeEach(() => {
  //   // B.上記指定した名前空間から `useAlertState` Hooks を指定してスパイ化
  //   alertStateSpy = jest.spyOn(TodoModalContext, "useAlertState");
  //   // C.スパイ化したうえで State 初期値が返るよう上書き、モック実装する
  //   alertStateSpy.mockImplementation(() => initialState);
  // });
  // afterEach(() => {
  //   // D.上書きしたモック実装を解除する
  //   alertStateSpy.mockClear();
  //   cleanup();
  // });

  // afterEach にはテストケース終了毎に React コンポーネントを画面から unmountするためのcleanUp()関数
  afterEach(() => {
    cleanup();
  });

  it("GraphQLのデータをうまく取得して表示できるか", async () => {
    render(<WrapedTodosArea mocks={todoMocks} />);

    expect(screen.getByText("TodoList")).toBeInTheDocument();
    // setTimeoutしてMockedProviderがモックのレスポンスを取得する処理を走らせる
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getAllByText("Todo1")[0]).toBeInTheDocument();
    expect(screen.getByText("2022/03/10-03/12")).toBeInTheDocument();

    expect(screen.getAllByText("Todo2")[0]).toBeInTheDocument();
    expect(screen.getByText("2022/03/15-03/16")).toBeInTheDocument();
  });

  it("Todoがない時の表示が適切になされるか", async () => {
    const NoTodoMocks = [
      {
        request: {
          query: GetAllTodoByUserDocument, // Codegenで生成されたクエリ Documentで終わるもの。
          variables: {
            userToken: cookies.get("ForestaID"),
          },
        },
        result: {
          // データをモック
          data: {
            todos: {
              node: [],
            },
          },
        },
      },
    ];
    render(<WrapedTodosArea mocks={NoTodoMocks} />);
    expect(screen.getByText("TodoList")).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(screen.getByText("該当のTodoが存在しません")).toBeInTheDocument();
  });

  it("ローディング中の表示がうまくなされるかどうか", async () => {
    render(<WrapedTodosArea mocks={todoMocks} />);
    expect(screen.getByText("TodoList")).toBeInTheDocument();

    // testIdでスケルトンローディングコンポーネントが表示されているかテスト
    expect(screen.getByTestId("todo-loading")).toBeInTheDocument();
  });

  it("エラー発生時の表示がうまくなされるかどうか(ネットワークエラー)", async () => {
    const todoErrorMocks = [
      {
        request: {
          query: GetAllTodoByUserDocument,
          variables: {
            userToken: cookies.get("ForestaID"),
          },
        },
        error: new Error(),
      },
    ];

    render(<WrapedTodosArea mocks={todoErrorMocks} />);
    expect(screen.getByText("TodoList")).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 0));

    // Todoリストのエラー表示
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
    // カレンダーのエラー表示
    expect(
      screen.getByText(
        "なんらかのエラーが発生してイベントを取得できませんでした。",
      ),
    ).toBeInTheDocument();
  });

  // フックスのテストで行う？？(Context)
  // it("Todo追加ボタンを押したときに、モーダルが適切に開くかどうか", async () => {
  //   // カスタムフックの結果が入ってくる
  //   render(<WrapedTodosArea mocks={todoMocks} />);
  //   const result1 = renderHook(() => useTodoModal()).result;
  //   const result2 = renderHook(() => useTodoModalContext()).result;
  //   // result.currentで、その時のカスタムフックの結果を取得

  //   expect(screen.getByText("TodoList")).toBeInTheDocument();

  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   const addBtn = screen.getByRole("button", { name: "Add Todo" });

  //   // setModalMode is not a function
  //   act(() => {
  //     /* fire events that update state */
  //     userEvent.click(addBtn);
  //     result1.current.onOpen();
  //   });
  //   expect(result1.current.isOpen).toBe(true);

  //   screen.debug();
  //   expect(screen.getByText("Todoタイトル")).toBeInTheDocument();
  // });
});
