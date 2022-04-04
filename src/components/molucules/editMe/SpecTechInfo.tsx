import { memo, FC, Dispatch, SetStateAction } from "react";
import { Spinner, Flex } from "@chakra-ui/react";

import { useSpecTechInfo } from "../../../hooks/editMe/useSpecTechInfo";
import { useGetAllSkillQuery } from "../../../types/generated/graphql";
import styled from "styled-components";
import { CheckBoxInput } from "../../atoms/editMe/CheckBoxInput";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * スペックシートスキル要約編集画面.
 * @remarks OS、言語、フレームワーク、ライブラリ、ツール、役割
 */
export const SpecTechInfo: FC<Props> = memo(({ setMenuItem, onClose }) => {
  const { data, loading, error } = useGetAllSkillQuery();

  console.log(data);
  //セレクトボックス選択肢用
  //担当工程
  const rol = ["詳細設計", "実装", "デバッグ", "テスト"];
  //OS
  const os = data?.skills[0].data as Array<string>;
  //言語
  const lang = data?.skills[1].data as Array<string>;
  //フレームワーク
  const frame = data?.skills[2].data as Array<string>;
  //ライブラリ
  const lib = data?.skills[3].data as Array<string>;
  //その他技術
  const other = data?.skills[4].data as Array<string>;

  //hooksを使用
  const { handleSubmit, register, onSubmit } = useSpecTechInfo(
    setMenuItem, //メニューアイテムを空にする
    onClose, //モーダルを閉じるメソッド
  );

  //読み込み中時の表示
  if (loading) {
    return (
      <Flex justifyContent="center">
        <Spinner color="green.400" />
      </Flex>
    );
  }
  //エラー時の表示
  if (error) {
    return <Flex justifyContent="center">Error</Flex>;
  }

  return (
    <>
      {/* 担当工程 */}
      <_TextItem>
        <CheckBoxInput
          label="担当工程"
          registers={register("devRoles")}
          array={rol}
        />
      </_TextItem>

      {/* OS */}
      <_TextItem>
        <CheckBoxInput
          label="動作環境（OS）"
          registers={register("operationEnvs")}
          array={os}
        />
      </_TextItem>

      {/* 言語 */}
      <_TextItem>
        <CheckBoxInput
          label="言語"
          registers={register("languages")}
          array={lang}
        />
      </_TextItem>

      {/* フレームワーク */}
      <_TextItem>
        <CheckBoxInput
          label="フレームワーク"
          registers={register("frameworks")}
          array={frame}
        />
      </_TextItem>

      {/* ライブラリ */}
      <_TextItem>
        <CheckBoxInput
          label="ライブラリ"
          registers={register("libraries")}
          array={lib}
        />
      </_TextItem>

      {/* ツール */}
      <_TextItem>
        <CheckBoxInput
          label="ツール,その他"
          registers={register("otherTools")}
          array={other}
        />
      </_TextItem>
      <Flex gap={3} justifyContent="right" mt={7}>
        <ButtonItem
          testId="updateBtn"
          name="Update"
          backgroundColor="green"
          onClick={handleSubmit(onSubmit)}
        />
        <ButtonItem
          testId="cancelBtn"
          name="Cancel"
          backgroundColor="gray"
          onClick={onClose}
        />
      </Flex>
    </>
  );
});

const _TextItem = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;
