import { memo, FC, Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

import { TextInput } from "../../atoms/common/TextInput";
import { useSpecUserInfo } from "../../../hooks/editMe/useSpecUserInfo";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * スペックシート部分基本情報編集画面.
 * @remarks スタッフID, 年齢, 性別, 最寄駅, 稼働開始日, エンジニア歴(SE,PG), IT全体歴
 */
export const SpecUserInfo: FC<Props> = memo(({ setMenuItem, onClose }) => {
  //hooksを使用
  const { handleSubmit, register, errors, onSubmit } = useSpecUserInfo(
    setMenuItem, //メニューアイテムを空にする
    onClose, //モーダルを閉じるメソッド
  );

  return (
    <>
      {/* スタッフID */}
      <_TextItem>
        <TextInput
          registers={register("stuffID")}
          errorMessage={errors.stuffID?.message}
          label="スタッフID(FR-XXX-XXXXの形式)"
          placeholder="スタッフID"
        />
      </_TextItem>
      {/* 年齢 */}
      <_TextItem>
        <TextInput
          registers={register("age")}
          errorMessage={errors.age?.message}
          label="年齢"
          placeholder="年齢"
        />
      </_TextItem>
      {/* 性別 */}
      <_TextItem>
        <Flex gap={3}>
          <_LabelItem>性別</_LabelItem>
          <_ErrorMessage>{errors.gender?.message}</_ErrorMessage>
        </Flex>

        <Flex textAlign="left" ml={3} gap={5}>
          <Flex alignItems="center" gap={1}>
            <input type="radio" {...register("gender")} value="男" id="男" />
            <label htmlFor="男">男</label>
          </Flex>
          <Flex alignItems="center" gap={1}>
            <input type="radio" {...register("gender")} value="女" id="女" />
            <label htmlFor="女">女</label>
          </Flex>
        </Flex>
      </_TextItem>

      {/* 最寄駅*/}
      <_TextItem>
        <TextInput
          registers={register("nearestStation")}
          errorMessage={errors.nearestStation?.message}
          label="最寄駅"
          placeholder="最寄駅"
        />
      </_TextItem>
      {/* 最寄線 */}
      <_TextItem>
        <TextInput
          registers={register("nearestLine")}
          errorMessage={errors.nearestLine?.message}
          label="最寄線"
          placeholder="最寄線"
        />
      </_TextItem>
      {/* 稼働開始日 */}
      <_TextItem>
        <TextInput
          registers={register("startWorkDate")}
          errorMessage={errors.startWorkDate?.message}
          label="稼働開始日"
          placeholder="稼働開始日"
        />
      </_TextItem>

      {/* SE歴 */}
      <_TextItem>
        <Flex gap={3}>
          <_LabelItem>SE経験</_LabelItem>
          <_ErrorMessage>{errors.seExpAmountYear?.message}</_ErrorMessage>
        </Flex>
        <Flex alignItems="center">
          <TextInput
            registers={register("seExpAmountYear")}
            errorMessage={errors.seExpAmountYear?.message}
            placeholder="SE経験(年)"
          />
          <_YearMonth>年</_YearMonth>

          <TextInput
            registers={register("seExpAmountMonth")}
            errorMessage={errors.seExpAmountMonth?.message}
            placeholder="SE経験(月)"
          />
          <_YearMonth>ヵ月</_YearMonth>
        </Flex>
      </_TextItem>

      {/* PG歴 */}
      <_TextItem>
        <Flex gap={3}>
          <_LabelItem>PG歴,作業員経験</_LabelItem>
          <_ErrorMessage>{errors.pgExpAmountYear?.message}</_ErrorMessage>
        </Flex>
        <Flex alignItems="center">
          <TextInput
            registers={register("pgExpAmountYear")}
            errorMessage={errors.pgExpAmountYear?.message}
            placeholder="PG歴,作業員経験(年)"
          />
          <_YearMonth>年</_YearMonth>

          <TextInput
            registers={register("pgExpAmountMonth")}
            errorMessage={errors.pgExpAmountMonth?.message}
            placeholder="PG歴,作業員経験(月)"
          />
          <_YearMonth>ヵ月</_YearMonth>
        </Flex>
      </_TextItem>

      {/* IT歴 */}
      <_TextItem>
        <Flex gap={3}>
          <_LabelItem>IT全体経験</_LabelItem>
          <_ErrorMessage>{errors.itExpAmountYear?.message}</_ErrorMessage>
        </Flex>
        <Flex alignItems="center">
          <TextInput
            registers={register("itExpAmountYear")}
            errorMessage={errors.itExpAmountYear?.message}
            placeholder="IT全体経験(年)"
          />
          <_YearMonth>年</_YearMonth>

          <TextInput
            registers={register("itExpAmountMonth")}
            errorMessage={errors.itExpAmountMonth?.message}
            placeholder="IT全体経験(月)"
          />
          <_YearMonth>ヵ月</_YearMonth>
        </Flex>
      </_TextItem>

      <Flex gap={3} justifyContent="right" mt={7}>
        <ButtonItem
          name="Update"
          backgroundColor="green"
          onClick={handleSubmit(onSubmit)}
          data-testid="updateBtn"
        />
        <ButtonItem
          name="Cancel"
          backgroundColor="gray"
          onClick={onClose}
          testId="cancelBtn"
        />
      </Flex>
    </>
  );
});

const _TextItem = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const _YearMonth = styled.div`
  width: 90px;
`;

const _LabelItem = styled.div`
  text-align: left;
  font-weight: bold;
`;

const _ErrorMessage = styled.div`
  color: red;
  height: 10px;
  text-align: left;
`;
