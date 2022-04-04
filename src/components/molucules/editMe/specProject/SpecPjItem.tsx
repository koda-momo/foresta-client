import { memo, FC, Dispatch, SetStateAction } from "react";
import { Spinner, Flex } from "@chakra-ui/react";
import styled from "styled-components";

import { TextInput } from "../../../atoms/common/TextInput";
import { TextAreaWithCounter } from "../../../atoms/common/TextAreaWithCounter";
import { useSpecProject } from "../../../../hooks/editMe/useSpecProject";
import {
  SpecProjectSheet,
  useGetAllSkillQuery,
} from "../../../../types/generated/graphql";
import { CheckBoxInput } from "../../../atoms/editMe/CheckBoxInput";
import { ButtonItem } from "../../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
  projectData: SpecProjectSheet;
  setIndexNum: Dispatch<SetStateAction<number>>;
};

/**
 * スペックシート開発経験編集画面.
 * @remarks プロジェクト名, 期間(始め&終わり), 役割, 人数, 内容, OS, 言語, フレームワーク, ライブラリ, ツール, 役割
 */
export const SpecPjItem: FC<Props> = memo(
  ({ setMenuItem, onClose, projectData, setIndexNum }) => {
    const { data, loading, error } = useGetAllSkillQuery();

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
    const { handleSubmit, register, errors, onSubmit } = useSpecProject(
      projectData,
      setIndexNum,
      setMenuItem,
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
        {/* プロジェクト名 */}
        <_TextItem>
          <TextInput
            registers={register("name")}
            errorMessage={errors.name?.message}
            label="プロジェクト名"
            placeholder="プロジェクト名"
          />
        </_TextItem>

        {/* 開始日 */}
        <_TextItem>
          <TextInput
            registers={register("startedAt")}
            errorMessage={errors.startedAt?.message}
            label="開始日"
            placeholder="開始日"
            type="date"
          />
        </_TextItem>

        {/* 終了日 */}
        <_TextItem>
          <TextInput
            registers={register("finishedAt")}
            errorMessage={errors.finishedAt?.message}
            label="終了日"
            placeholder="終了日"
            type="date"
          />
        </_TextItem>

        {/* 担当役割 */}
        <_TextItem>
          <TextInput
            registers={register("roleSharing")}
            errorMessage={errors.roleSharing?.message}
            label="担当役割"
            placeholder="担当役割"
          />
        </_TextItem>

        {/* 担当工程 */}
        <_TextItem>
          <CheckBoxInput
            label="担当工程"
            registers={register("devRoles")}
            array={rol}
          />
        </_TextItem>

        {/* チーム人数 */}
        <_TextItem>
          <TextInput
            registers={register("memberCount")}
            errorMessage={errors.memberCount?.message}
            label="チーム人数(PJ全体)"
            placeholder="チーム人数(PJ全体)"
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

        {/* 詳細 */}
        <_TextItem>
          <TextAreaWithCounter
            registers={register("content")}
            errorMessage={errors.content?.message}
            label="詳細"
            placeholder="詳細"
            counter={true}
          />
        </_TextItem>

        <Flex gap={3} justifyContent="right" mt={7}>
          <ButtonItem
            name="Update"
            backgroundColor="green"
            onClick={handleSubmit(onSubmit)}
          />
          <ButtonItem
            name="Cancel"
            backgroundColor="gray"
            onClick={() => {
              setIndexNum(-1);
            }}
          />
        </Flex>
      </>
    );
  },
);

const _TextItem = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;
