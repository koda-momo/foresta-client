/**
 * @jest-environment jsdom
 */
"@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
// import { renderHook, act } from "@testing-library/react-hooks";
// import { Cookies } from "react-cookie";
import { useAddStack } from "../../src/hooks/study/useAddStack";
// import { useAddStudyStackMutation } from "../../src/types/generated/graphql";

jest.mock("../../src/types/generated/graphql");
// const cookies = new Cookies();

describe("useAddStackテスト", () => {
  it("useAddStackが存在するかどうか", () => {
    expect(useAddStack).toBeDefined;
  });

  // const mockMessageB = "message from mockB";

  // beforeAll(() => {
  //   // mock moduleで何を返すかを設定する
  //   (useAddStudyStackMutation as jest.Mock).mockImplementation(() => ({
  //     awesomeFuncB: jest.fn().mockReturnValue(mockMessageB),
  //   }));
  // });
  // beforeEach(() => {
  //   // 呼び出し回数などをクリア
  //   (useAddStudyStackMutation as jest.Mock).mockClear();
  // });

  // it("記録を追加する", () => {
  //   const onClose = jest.fn();
  //   const reset = jest.fn();
  //   const data = {
  //     content: "useState理解",
  //     createdAt: "2022-02-22",
  //     skillTagId: "React",
  //     timeStack: 100,
  //     // userToken: cookies.get("ForestaID"),
  //   };
  //   const { result } = renderHook(() =>
  //     useAddStack(onClose, reset),
  //   );
  //   expect(result.current.addStack(data)).toBe(
  //     `Hellow! Here are messages for you!: ${mockMessageB} `,
  //   );
  // });
});
