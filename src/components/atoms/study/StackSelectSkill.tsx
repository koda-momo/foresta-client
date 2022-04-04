import { FC, memo } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useStackList } from "../../../hooks/study/useStackList";
import styled from "styled-components";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers: any; //入力値登録
  label: string; //ラベル名
};

/**
 * 学習記録用技術リストselectboxコンポ―ネント.
 */
export const StackSelectSkill: FC<Props> = memo((props) => {
  const { label, registers } = props;

  const { skillTagIdListDatas, skillTagIdLoading, skillTagIdError } =
    useStackList();
  if (skillTagIdLoading) {
    <p>Loading...</p>;
  }
  if (skillTagIdError) {
    <p>error</p>;
  }

  return (
    <>
      <FormControl>
        <FormLabel>
          <_LabelItem> {label}</_LabelItem>
        </FormLabel>

        <Select {...registers}>
          {skillTagIdListDatas &&
            skillTagIdListDatas.getAllTechTree.map((skillTag) => (
              <option key={skillTag.id} value={skillTag.name}>
                {skillTag.name}
              </option>
            ))}
        </Select>
      </FormControl>
    </>
  );
});

const _LabelItem = styled.div`
  color: "#9F9F9F";
  text-align: left;
  font-weight: bold;
`;
