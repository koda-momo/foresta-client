import { memo, FC, Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import { Spinner, Flex, Box } from "@chakra-ui/react";

import {
  SpecProjectSheet,
  useGetSheetProjectByUserIdQuery,
} from "../../../../types/generated/graphql";
import { SpecPjItem } from "./SpecPjItem";
import styled from "styled-components";
import { ButtonItem } from "../../../atoms/common/ButtonItem";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * スペックシート開発経験編集画面.
 * @remarks プロジェクト名, 期間(始め&終わり), 役割, 人数, 内容, OS, 言語, フレームワーク, ライブラリ, ツール, 役割
 */
export const SpecProject: FC<Props> = memo(({ setMenuItem, onClose }) => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * 開発経験情報の取得.
   */
  const { data, loading, error } = useGetSheetProjectByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const projectData = data?.projects.node.project as Array<SpecProjectSheet>;

  const [indexNum, setIndexNum] = useState(-1);

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
      {projectData && (
        <>
          {indexNum === -1 && (
            <>
              {/* 1開発目 */}
              <Box mt={5}>
                <Flex alignItems="center">
                  {projectData[0].name ? (
                    <_TextItem>{projectData[0].name}</_TextItem>
                  ) : (
                    <_TextItem>未登録</_TextItem>
                  )}
                  <ButtonItem
                    name="Edit"
                    backgroundColor="green"
                    onClick={() => setIndexNum(0)}
                  />
                </Flex>
              </Box>

              {/* 2開発目 */}
              <Box mt={5}>
                <Flex alignItems="center">
                  {projectData[1].name ? (
                    <_TextItem>{projectData[1].name}</_TextItem>
                  ) : (
                    <_TextItem>未登録</_TextItem>
                  )}
                  <ButtonItem
                    name="Edit"
                    backgroundColor="green"
                    onClick={() => setIndexNum(1)}
                  />
                </Flex>
              </Box>

              {/* 3開発目 */}
              <Box mt={5}>
                <Flex alignItems="center">
                  {projectData[2].name ? (
                    <_TextItem>{projectData[2].name}</_TextItem>
                  ) : (
                    <_TextItem>未登録</_TextItem>
                  )}
                  <ButtonItem
                    name="Edit"
                    backgroundColor="green"
                    onClick={() => setIndexNum(2)}
                  />
                </Flex>
              </Box>
            </>
          )}
        </>
      )}

      {indexNum != -1 && (
        <>
          <SpecPjItem
            setMenuItem={setMenuItem}
            onClose={onClose}
            projectData={projectData[indexNum]}
            setIndexNum={setIndexNum}
          />
        </>
      )}
    </>
  );
});

const _TextItem = styled.div`
  width: 300px;
`;
