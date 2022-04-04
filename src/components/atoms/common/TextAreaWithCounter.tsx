import { FC, memo, useCallback, useState } from "react";
import { Textarea, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  registers: UseFormRegisterReturn; //value(テキストボックスの値と紐づけ用)
  errorMessage?: string | undefined; //エラーメッセージ(errors.registers?.messageの形で渡す)
  label?: string;
  placeholder?: string;
  counter?: boolean; //カウンターの表示(デフォは非表示)
};

/**
 * テキストエリアコンポ―ネント.
 */
export const TextAreaWithCounter: FC<Props> = memo(
  ({ registers, errorMessage, label, placeholder, counter = false }) => {
    const [textLength, setTextLength] = useState(150);
    /**
     * 文字を数える.
     */
    const count = useCallback((e) => {
      const MAX_LENGTH = 150;
      setTextLength(MAX_LENGTH - e.target.value.length);
    }, []);

    return (
      <>
        <Flex gap={3}>
          <_LabelItem> {label}</_LabelItem>
          <_ErrorMessage>{errorMessage}</_ErrorMessage>
        </Flex>
        {counter && (
          <Flex gap={2}>
            残り文字数:
            {textLength >= 0 ? (
              <div>{textLength}</div>
            ) : (
              <_Length>{textLength}</_Length>
            )}
            文字
          </Flex>
        )}
        <Textarea {...registers} placeholder={placeholder} onChange={count} />
      </>
    );
  },
);

const _LabelItem = styled.div`
  color: "#9F9F9F";
  text-align: left;
  font-weight: bold;
`;

const _ErrorMessage = styled.div`
  color: red;
  height: 10px;
  font-size: 12px;
`;

const _Length = styled.div`
  color: red;
`;
