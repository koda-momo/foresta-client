/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";
import { specSheetMocks } from "../../__mocks__/EditMe";
import { SpecSheet } from "../../src/components/molucules/editMe/SpecSheet";

const mock = jest.fn();

/**
 * スペックシートのテスト.
 *
 */
const WrapSpecTechInfo = () => {
  return (
    // mocksに作成したモックを渡して囲む
    <MockedProvider
      mocks={specSheetMocks}
      addTypename={false}
      defaultOptions={{
        watchQuery: { fetchPolicy: "no-cache" },
        query: { fetchPolicy: "no-cache" },
      }}
    >
      <SpecSheet setMenuItem={mock} onClose={mock} />
    </MockedProvider>
  );
};
describe("スペックシートその他情報のテスト", () => {
  afterEach(cleanup);
  it("スペックシートその他情報を更新のページが表示されている", () => {
    render(<WrapSpecTechInfo />);
    expect(screen.getByText("業務外の取り組み")).toBeInTheDocument();
    expect(screen.getByText("前職1")).toBeInTheDocument();
    expect(screen.getByText("資格")).toBeInTheDocument();
    expect(screen.getByText("自己PR")).toBeInTheDocument();
  });
  it("placeholderの初期値が正しく表示されている", () => {
    render(<WrapSpecTechInfo />);
    expect(screen.getByPlaceholderText("業務外の取り組み")).toBeTruthy();
    expect(screen.getByPlaceholderText("前職1")).toBeTruthy();
    expect(screen.getByPlaceholderText("資格")).toBeTruthy();
    expect(screen.getByPlaceholderText("自己PR")).toBeTruthy();
  });
});
