/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MockedProvider } from "@apollo/react-testing";

import { studyStacks } from "../../__mocks__/StudyStacks";
import { StudyListTable } from "../../src/components/molucules/stackList/StudyListTable";

const WrapedStackListArea = () => {
  return (
    <MockedProvider mocks={studyStacks} addTypename={false}>
      <StudyListTable
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
              {
                id: "stacks3",
                content: "useEffect理解した",
                timeStack: 200,
                createdAt: "2022-02-24",
                skillTagId: "React",
                userId: "3333",
              },
            ],
          },
        }}
        stackSumList={[
          {
            id: "stacks4",
            timeStack: 300,
            skillTagId: "React",
            content: "useEffect理解した",
            createdAtStart: new Date("2022-02-22"),
            createdAtLast: new Date("2022-02-24"),
          },
          {
            id: "stacks5",
            timeStack: 10,
            skillTagId: "Vue",
            content: "VueX理解した",
            createdAtStart: new Date("2022-02-23"),
            createdAtLast: new Date("2022-02-23"),
          },
        ]}
      />
    </MockedProvider>
  );
};

describe("学習リストの画面表示", () => {
  it("学習リストが表示される", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("2022/02/22")).toBeInTheDocument();
    expect(screen.getByText("useEffect理解した")).toBeInTheDocument();
  });
});
