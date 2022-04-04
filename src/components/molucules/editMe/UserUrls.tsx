import { memo, FC, Dispatch, SetStateAction, useState } from "react";
import { Spinner, Flex, Box } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import { TextInput } from "../../atoms/common/TextInput";
import {
  useAddUrl,
  useDeleteUrl,
  useUserUrls,
} from "../../../hooks/editMe/useUserUrls";
import { Url, useGetUserUrlByIdQuery } from "../../../types/generated/graphql";
import { ButtonItem } from "../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * public部分URL編集画面.
 * @remarks title, url
 */
export const UserUrls: FC<Props> = memo(({ setMenuItem, onClose }) => {
  //cookieからID取得
  const [cookies] = useCookies();

  const { data, loading, error } = useGetUserUrlByIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  //URLリストデータ
  const urlData = data?.urls.node.userUrls.user_urls as Array<Url>;
  //URLのテーブルID
  const urlTableId = data?.urls.node.userUrls.id as string;

  //編集モード
  const [editMode, setEditMode] = useState("");
  //IDセット用
  const [urlId, setUrlId] = useState("");

  /**
   * URL情報の入出力.
   */
  const { handleSubmit, register, errors } = useUserUrls();

  /**
   * URLを追加する.
   */
  const { onSubmit } = useAddUrl(urlTableId, setMenuItem, setEditMode, onClose);

  /**
   * URLを削除する.
   */
  const { onDelete } = useDeleteUrl(setMenuItem, setEditMode, onClose);

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
      {editMode === "" && (
        <>
          {urlData.map((url) => (
            <div key={url.id}>
              <_List>
                <Flex>
                  <_ListTitle>{url.urlName}</_ListTitle>
                  <Box ml={3}>
                    <ButtonItem
                      name="Delete"
                      backgroundColor="red"
                      onClick={() => {
                        setEditMode("削除");
                        setUrlId(url.id);
                      }}
                      testId="deleteBtn"
                    />
                  </Box>
                </Flex>
              </_List>
            </div>
          ))}

          <Flex gap={3} justifyContent="center" mt={7}>
            <ButtonItem
              name="Add"
              backgroundColor="green"
              onClick={() => setEditMode("追加")}
              testId="addBtn"
            />
            <ButtonItem
              name="Cancel"
              backgroundColor="gray"
              onClick={onClose}
            />
          </Flex>
        </>
      )}

      {editMode === "追加" && (
        <>
          <_TextItem>
            <TextInput
              registers={register("urlName")}
              errorMessage={errors.urlName?.message}
              label="タイトル"
              placeholder="タイトル"
            />
          </_TextItem>

          <_TextItem>
            <TextInput
              registers={register("url")}
              errorMessage={errors.url?.message}
              label="URL"
              placeholder="URL"
            />
          </_TextItem>

          <Flex gap={3} justifyContent="right" mt={7}>
            <ButtonItem
              name="Add"
              backgroundColor="green"
              onClick={handleSubmit(onSubmit)}
              testId="updateBtn"
            />
            <ButtonItem
              name="Cancel"
              backgroundColor="gray"
              onClick={() => {
                setEditMode("");
              }}
            />
          </Flex>
        </>
      )}

      {editMode === "削除" && (
        <>
          削除しますか？
          <Flex gap={3} justifyContent="center" mt={5}>
            <ButtonItem
              name="Yes"
              backgroundColor="red"
              onClick={() => {
                onDelete(urlId, urlTableId);
                setUrlId("");
              }}
            />

            <ButtonItem
              name="Cancel"
              backgroundColor="gray"
              onClick={() => {
                setUrlId("");
              }}
            />
          </Flex>
        </>
      )}
    </>
  );
});

const _TextItem = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const _ListTitle = styled.div`
  width: 300px;
`;

const _List = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;
