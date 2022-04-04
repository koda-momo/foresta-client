import { FC, memo } from "react";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  registers: UseFormRegisterReturn; //value(テキストボックスの値と紐づけ用)
  errorMessage?: string | undefined; //エラーメッセージ(errors.registers?.messageの形で渡す)
  array: Array<string>;
  label?: string;
};

/**
 * チェックボックスコンポ―ネント.
 */
export const CheckBoxInput: FC<Props> = memo(
  ({ registers, errorMessage, label, array }) => {
    return (
      <>
        <Flex gap={3}>
          <_LabelItem> {label}</_LabelItem>
          <_ErrorMessage>{errorMessage}</_ErrorMessage>
        </Flex>
        <Flex gap={3} mt={1}>
          {array.map((item) => (
            <Flex alignItems="center" gap={1} key={item}>
              <input type="checkbox" id={item} {...registers} value={item} />
              <label>{item}</label>
            </Flex>
          ))}
        </Flex>
      </>
    );
  },
);

const _ErrorMessage = styled.div`
  color: red;
  height: 10px;
`;

const _LabelItem = styled.div`
  text-align: left;
  font-weight: bold;
`;
