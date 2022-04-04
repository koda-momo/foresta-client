/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from "@testing-library/react-hooks";
import { AccordionContent } from "../src/components/molucules/AccordionContent";
import { ModalSet } from "../src/components/molucules/ModalSet";
import userEvent from "@testing-library/user-event";
import { TableFlexItem } from "../src/components/atoms/TableFlexItem";
import { TextAreaWithCounter } from "../src/components/atoms/common/TextAreaWithCounter";
import { useForm } from "react-hook-form";

/**
 * アコーディオンコンポーネントのテスト.
 */
describe("アコーディオンコンポーネント", () => {
  const dummyData = {
    title: "dummy title",
    content: <p>dummy content</p>,
    size: "lg",
  };

  it("Propsが表示される", () => {
    render(<AccordionContent {...dummyData} />);
    expect(screen.getByText("dummy title")).toBeInTheDocument();
    expect(screen.getByText("dummy content")).toBeInTheDocument();
  });
});

/**
 * モーダルコンポーネントのテスト.
 */
describe("モーダルコンポーネント", () => {
  //ダミーのメソッド
  const mock = jest.fn().mockImplementation(() => {
    return "dummy answer";
  });

  //ダミーのデータ
  const dummyData = {
    onClose: () => console.log("close"),
    isOpen: true,
    modalTitle: "dummy title",
    contents: <p>dummy contents</p>,
    closeBtnName: "dummy close btn",
    actionBtnArray: [{ name: "dummy action btn", action: mock }],
  };

  it("Propsが表示される", () => {
    render(<ModalSet {...dummyData} />);
    expect(screen.getByText("dummy title")).toBeInTheDocument();
    expect(screen.getByText("dummy contents")).toBeInTheDocument();
    expect(screen.getByText("dummy close btn")).toBeInTheDocument();
    expect(screen.getByText("dummy action btn")).toBeInTheDocument();
  });
  it("ボタンを押してメソッドを発動する", () => {
    render(<ModalSet {...dummyData} />);
    //ボタンをクリック
    userEvent.click(screen.getByText("dummy action btn"));
    //メソッド(mock)が呼ばれたかどうか
    expect(mock).toHaveBeenCalled();
  });
});

/**
 * TableFlexItemのテスト.
 */
describe("TableFlexItem", () => {
  const mock = jest.fn();

  const dummyArray = ["dummy1", "dummy2", "dummy3"];

  it("Propsが表示される", () => {
    render(<TableFlexItem itemArray={dummyArray} />);
    expect(screen.getByText("dummy1")).toBeInTheDocument();
    expect(screen.getByText("dummy2")).toBeInTheDocument();
    expect(screen.getByText("dummy3")).toBeInTheDocument();
  });

  it("メソッドが発動する", () => {
    render(<TableFlexItem itemArray={dummyArray} deleteBtn={true} />);
    //ボタンをクリック
    userEvent.click(screen.queryByTestId("test-btn-icon0"));
    //コンポーネント内にあるメソッドの発動確認方法が分からない
    // expect(mock).toHaveBeenCalled();
  });
});
