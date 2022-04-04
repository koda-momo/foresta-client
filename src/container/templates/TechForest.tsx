import { FC, useState } from "react";
import { TreeData } from "../../types/types";
import { useGetUserLeafsByIdQuery } from "../../types/generated/graphql";
import { useCookies } from "react-cookie";
import { AreaSelectComp } from "../../components/molucules/techForest/AreaSelectComp";
import { TechTreeComp } from "../../components/organisms/techForest/TechTreeComp";

export const TechForest: FC = () => {
  // クッキー
  const [cookies] = useCookies();
  // 技術エリアデータの状態管理、(初期値はフロントエンド)
  const [areaId, setAreaId] = useState<string | undefined>(
    "6219afb4d55e2e236b9062b8",
  );
  // 特定のユーザーが保有している技術データ
  const { data } = useGetUserLeafsByIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  // 技術ツリーデータ(技術エリアデータの状態と一致しているものを絞り込み)
  const treeData = data?.getUserLeafsById.node.myForest.filter(
    (element: TreeData) => element.areaId == areaId,
  );

  return (
    <>
      <AreaSelectComp setAreaId={setAreaId} />
      <TechTreeComp treeData={treeData} />
    </>
  );
};
