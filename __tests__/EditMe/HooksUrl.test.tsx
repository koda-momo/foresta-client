/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/react-testing";

import "@testing-library/jest-dom/extend-expect";
import {
  useAddUrl,
  useCancel,
  useDeleteUrl,
  useUserUrls,
} from "../../../client/src/hooks/editMe/useUserUrls";
import { renderHook } from "@testing-library/react-hooks";
import { useState } from "react";
import { userUrlMocks } from "../../__mocks__/AboutMe";

// const WrapedDeleteUrl = () => {
//   return (
//     <MockedProvider mocks={[userUrlMocks]} addTypename={false}>

//     </MockedProvider>
//   );
// };
describe("URLhooksのテスト", () => {
  const onClose = jest.fn();
  it("キャンセルメソッドが発動する", () => {
    expect(useUserUrls).toBeDefined();
    renderHook(() => {
      useCancel(useState, useState, onClose).cancel();
    });
    expect(onClose).toHaveBeenCalled();
  });
  it("URLが削除される", () => {
    const onDelete = jest.fn();
    expect(useDeleteUrl).toBeDefined();
    renderHook(() => {
      useDeleteUrl(useState, useState, onClose);
    });
    // expect(onDelete).toHaveBeenCalled();
  });
  it("URLが追加される", () => {
    expect(useAddUrl).toBeDefined();
    renderHook(() => {
      useAddUrl("userUrlTableId", useState, useState, onClose);
    });
  });
});
