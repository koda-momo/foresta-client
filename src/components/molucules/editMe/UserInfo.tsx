import { memo, FC, Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";

import { SelectInput } from "../../atoms/editMe/SelectInput";
import { TextInput } from "../../atoms/common/TextInput";
import { useUserInfo } from "../../../hooks/editMe/useUserInfo";
import styled from "styled-components";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * public部分基本情報編集画面.
 * @remarks 名前, 職種, github, (mail,pw,specsheetId)
 */
export const UserInfo: FC<Props> = memo(({ setMenuItem, onClose }) => {
  //public部分基本情報編集hooksを使用(引数に渡してあげつつ、使う機能を宣言)
  const { handleSubmit, register, errors, onSubmit } = useUserInfo(
    setMenuItem, //メニューアイテムを空にする
    onClose, //モーダルを閉じるメソッド
  );

  return (
    <>
      {/* 名前の入力欄 */}
      <_TextItem>
        <TextInput
          registers={register("name")}
          errorMessage={errors.name?.message}
          label="氏名"
          placeholder="氏名"
          data-testid="userName"
        />
      </_TextItem>

      {/* githubアカウント入力欄 */}
      <_TextItem>
        <TextInput
          registers={register("githubURL")}
          errorMessage={errors.githubURL?.message}
          label="GitHubアカウント"
          placeholder="GitHubアカウント"
        />
      </_TextItem>

      {/* 職種入力欄 */}
      <_TextItem>
        <SelectInput
          options={[
            "フロントエンドエンジニア",
            "バックエンドエンジニア",
            "営業",
          ]}
          registers={register("jobType")}
          errorMessage={errors.jobType?.message}
          label="職種"
        />
      </_TextItem>

      {/* スプレッドシートID */}
      <_TextItem>
        <TextInput
          registers={register("spreadSheetID")}
          errorMessage={errors.spreadSheetID?.message}
          label="スプレッドシートID(スプレッドシートのURL)"
          placeholder="スプレッドシートID"
        />
      </_TextItem>

      <Flex gap={3} justifyContent="right" mt={7}>
        <ButtonItem
          name="Update"
          backgroundColor="green"
          onClick={handleSubmit(onSubmit)}
          testId="updateBtn"
        />

        <ButtonItem name="Cancel" backgroundColor="gray" onClick={onClose} />
      </Flex>
    </>
  );
});

const _TextItem = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;
