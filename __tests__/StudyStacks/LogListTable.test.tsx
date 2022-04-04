/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MockedProvider } from "@apollo/react-testing";

import { studyStacks } from "../../__mocks__/StudyStacks";
import { LogListTable } from "../../src/components/molucules/stackList/LogListTable";

const WrapedStackListArea = () => {
  return (
    <MockedProvider mocks={studyStacks} addTypename={false}>
      <LogListTable
        data={{
          getAllStudyStack: {
            status: "success",
            msg: "取得に成功しました",
            node: [
              {
                id: "stacks",
                content: "useState理解した",
                timeStack: 100,
                createdAt: "2022-02-22",
                skillTagId: "React",
                userId: "1111",
              },
              {
                id: "stacks2",
                content: "Vuex理解した",
                timeStack: 10,
                createdAt: "2022-02-23",
                skillTagId: "Vue",
                userId: "2222",
              },
            ],
          },
        }}
      />
    </MockedProvider>
  );
};

describe("学習リストのログリスト画面表示", () => {
  it("学習リストのログリストが表示される", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("2022/02/22")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveTextContent("React"); //異なる書き方テスト
    expect(screen.getByText("React")).not.toBeFalsy(); //異なる書き方テスト
  });
});
