import { memo, FC } from "react";
import { useCookies } from "react-cookie";
import { Flex, Spinner } from "@chakra-ui/react";
import styled from "styled-components";

import { ProgressComp } from "../techForest/ProgressComp";
import { useGetUserOnlyTreeByIdQuery } from "../../../types/generated/graphql";
import { TreeOnlyType } from "../../../types/types";
import { ShadowFrame } from "../../atoms/common/ShadowFrame";

/**
 * 技術ツリー表示コーナー.
 */
export const MyTechStack: FC = memo(() => {
  //cookieを使用
  const [cookies] = useCookies();

  /**
   * 技術ツリーデータ取得.
   */
  const { data, loading, error } = useGetUserOnlyTreeByIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  //技術ツリーのデータ
  const treeData = data?.tree.node.myForest as Array<TreeOnlyType>;

  /**
   * 進捗率0%の場合を削った配列
   */
  const filterTreeData = treeData?.filter((item) => item.achievementRate != 0);

  /**
   * 進捗率で並び替えした配列
   */
  const sortTreeData = filterTreeData && [...filterTreeData];
  sortTreeData?.sort((a, b) => {
    //achievementRateの降順
    if (a.achievementRate < b.achievementRate) return 1;
    if (a.achievementRate > b.achievementRate) return -1;
    //idの降順
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

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
      <ShadowFrame margin={0} padding={10}>
        <_Contents>
          <_HiddenScrollBar className="overflow-auto h-screen">
            {sortTreeData &&
              sortTreeData.map((item) => (
                <_Progress key={item.id}>
                  <ProgressComp
                    TreeName={item.treeName}
                    AchievementRate={item.achievementRate}
                  />
                </_Progress>
              ))}
          </_HiddenScrollBar>
        </_Contents>
      </ShadowFrame>
    </>
  );
});

//項目
const _Contents = styled.div`
  height: 350px;
`;

//小窓
const _HiddenScrollBar = styled.div`
  overflow: auto;
  height: 350px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

//技術ツリー
const _Progress = styled.div`
  margin-top: 20px;
`;
