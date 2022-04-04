/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MockedProvider } from "@apollo/react-testing";

import { StackSelectSkills } from "../../__mocks__/StudyStacks";
import { StackSelectSkill } from "../../src/components/atoms/study/StackSelectSkill";

const WrapedStackListArea = () => {
  return (
    <MockedProvider mocks={StackSelectSkills} addTypename={false}>
      <StackSelectSkill registers={""} label={"Technology"} />
    </MockedProvider>
  );
};

describe("学習技術セレクトボックス表示", () => {
  it("学習技術セレクトボックス表示がされる", () => {
    render(<WrapedStackListArea />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });
});
