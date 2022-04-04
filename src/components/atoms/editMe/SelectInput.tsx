import { FC, memo } from "react";
import { Select, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  registers: UseFormRegisterReturn; //value(テキストボックスの値と紐づけ用)
  errorMessage?: string | undefined; //エラーメッセージ(errors.registers?.messageの形で渡す)
  options: Array<string>; //セレクトボックスのoption
  label?: string;
  placeholder?: string;
};

/**
 * セレクトボックスコンポ―ネント.
 */
export const SelectInput: FC<Props> = memo(
  ({ registers, errorMessage, options, label, placeholder }) => {
    return (
      <>
        <Flex gap={3}>
          <_LabelItem> {label}</_LabelItem>
          <_ErrorMessage>{errorMessage}</_ErrorMessage>
        </Flex>
        <Select {...registers} placeholder={placeholder}>
          {options.map((optionItem, index) => (
            <option key={index} value={optionItem}>
              {optionItem}
            </option>
          ))}
        </Select>
      </>
    );
  },
);

const _LabelItem = styled.div`
  text-align: left;
  font-weight: bold;
`;

const _ErrorMessage = styled.div`
  color: red;
  height: 10px;
  text-align: left;
`;
