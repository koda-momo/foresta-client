/**
 * @jest-environment jsdom
 */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { StackList } from "../../src/components/organisms/study/StackList";
import { MockedProvider } from "@apollo/react-testing";

import { studyStacks } from "../../__mocks__/StudyStacks";
import userEvent from "@testing-library/user-event";

const WrapedStackListArea = () => {
  return (
    <MockedProvider mocks={studyStacks} addTypename={false}>
      <StackList />
    </MockedProvider>
  );
};

describe("学習リスト画面表示", () => {
  beforeEach(() => {
    console.log("テストを実行する");
  });
  beforeAll(() => {
    console.log("全てのテストを実行する");
  });
  afterEach(() => {
    console.log("テストが実行された");
  });
  afterEach(cleanup);
  afterAll(() => {
    console.log("全てのテストが実行された");
  });

  it("学習リスト画面が表示されるか", async () => {
    render(<WrapedStackListArea />);
    await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
    expect(screen.getByText("StackList")).toBeInTheDocument();
    expect(screen.getByText("LogList")).toBeInTheDocument();
    expect(screen.getByText("What you learned")).toBeInTheDocument();
  });

  it("学習記録モーダルが表示されるか", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByTestId("addIcon")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
    expect(screen.getByText("Started at")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    userEvent.click(screen.getByText("Cancel")); //キャンセルボタンクリック
    //キャンセルボタンをクリックしてモーダル閉じる
    userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
    expect(screen.getByText("Started at")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    userEvent.click(screen.getByText("Add")); //記録追加ボタンクリック
    expect(screen.getByText("Started at")).toBeInTheDocument(); //記録追加ボタンを押しても入力フォームを入力していないので、モーダルが閉じない
  });

  it("LogList画面が表示されるか", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByText("LogList")).toBeInTheDocument();
    userEvent.click(screen.getByText("LogList"));
  });

  it("学習記録のメモを入力する", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByTestId("addIcon")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
    expect(screen.getByText("Detail")).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputElement: any = screen.getByPlaceholderText("Detail");
    fireEvent.change(inputElement, { target: { value: "useState理解した" } });
    expect(inputElement.value).toBe("useState理解した");
  });

  it("学習記録の日時を入力する", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByTestId("addIcon")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
    expect(screen.getByText("Started at")).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputElement: any = screen.getByPlaceholderText("Started at");
    fireEvent.change(inputElement, { target: { value: "2022-02-22" } });
    expect(inputElement.value).toBe("2022-02-22");
  });

  it("学習記録の時間を入力する", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByTestId("addIcon")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputElement: any = screen.getByLabelText("Minutes");
    fireEvent.keyDown(inputElement);
    fireEvent.change(inputElement, { target: { value: 30 } });
    expect(inputElement.value).toBe("30");
  });

  // it("学習記録の技術を選択する", () => {
  //   render(<WrapedStackListArea />);
  //   expect(screen.getByTestId("addIcon")).toBeInTheDocument();
  //   userEvent.click(screen.getByTestId("addIcon")); //記録追加ボタンクリック
  //   expect(screen.getByText("Technology")).toBeInTheDocument();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const inputElement: any = screen.getByLabelText("Technology");
  //   fireEvent.keyDown(inputElement);
  //   fireEvent.change(inputElement, { target: { value: "React" } });
  //   expect(inputElement.value).toBe("");
  // });
});
