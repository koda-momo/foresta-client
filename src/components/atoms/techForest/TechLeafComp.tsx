import { FC, memo, useState } from "react";
import { useCookies } from "react-cookie";
import { useGetUserLeafsByIdQuery } from "../../../types/generated/graphql";
import { useChangeLeafStatusMutation } from "../../../types/generated/graphql";
import { GetUserLeafsByIdDocument } from "../../../types/generated/graphql";
import { Box, Text, HStack, Checkbox, useToast } from "@chakra-ui/react";

export type Props = {
  treeData: {
    id: string;
    treeId: string;
    areaId: string;
    treeName: string;
    achievementRate: number;
    color: string;
    branches: {
      id: string;
      name: string;
      leafs: {
        id: string;
        name: string;
        techBranch_id: string;
        techTree_id: string;
        isStatus: boolean;
      }[];
    }[];
  }[];
  techLeafTextData: string;
  techLeafStatus: boolean;
  indexOfTreeData: number;
  indexOfBranchData: number;
  indexOfLeafData: number;
};

export const TechLeafComp: FC<Props> = memo(
  ({
    treeData,
    techLeafTextData,
    techLeafStatus,
    indexOfTreeData,
    indexOfLeafData,
    indexOfBranchData,
  }) => {
    // エラー通知用のトースト
    const toast = useToast();
    // 技術ツリーIdの状態管理
    const [treeId, setTreeId] = useState<string>("");
    // 技術ブランチIdの状態管理
    const [branchId, setBranchId] = useState<string>("");
    // 技術リーフIdの状態管理
    const [leafId, setLeafId] = useState<string>("");
    // 習得状況の状態管理
    const [isStatus, setIsStatus] = useState<boolean>(false);
    // userleafId取得用のクッキー
    const [cookies] = useCookies();
    // userleafId取得用のQuery
    const { data } = useGetUserLeafsByIdQuery({
      variables: {
        userToken: cookies.ForestaID,
      },
    });
    // userleafIdを宣言、取得したIDを代入
    const userleafId = String(data?.getUserLeafsById.node.id);
    // 技術リーフの取得状態を変更するMutation
    const [changeLeafStatusMutation] = useChangeLeafStatusMutation({
      variables: {
        techLeafInfo: {
          userLeafsId: userleafId, // ユーザーの技術リストを指定するためのID
          treeId: treeId, // 切り替える技術リーフが属する技術ツリーを指定するためのID
          branchId: branchId, // 切り替える技術リーフが属する技術ブランチを指定するためのID
          leafId: leafId, // 切り替える技術リーフを指定するためのID
          currentStatus: isStatus, //現在の習得状態を表すフラグ
        },
      },
      //refetchでチェック後の技術データを再取得
      refetchQueries: [GetUserLeafsByIdDocument],
    });
    // 技術リーフの習得状態を切り替えるメソッド
    const cheakedLeaf = async (
      treeId: string,
      branchId: string,
      leafId: string,
      isStatus: boolean,
    ) => {
      // サーバーで技術の習得状態を切り替えるのに必要な情報をuseStateにset
      await setTreeId(treeId);
      setBranchId(branchId);
      setLeafId(leafId);
      setIsStatus(isStatus);
      // サーバーに技術リーフの習得状態を送信するMutationを実行
      const response = await changeLeafStatusMutation();
      // Mutation送信後、エラーが返ってきた場合はユーザーに通知
      if (response.data?.changeLeafStatus.status == "error") {
        toast({
          title: "エラーが発生しました",
          position: "bottom-left",
          status: "error",
          isClosable: true,
        });
      }
    };

    return (
      <Box key={indexOfLeafData} px={4}>
        <HStack>
          <Text color="gray.600" fontSize="xl">
            {techLeafTextData}
          </Text>
          <Checkbox
            size="lg"
            colorScheme="green"
            onChange={() =>
              cheakedLeaf(
                treeData?.[indexOfTreeData].id,
                treeData?.[indexOfTreeData].branches[indexOfBranchData].id,
                treeData?.[indexOfTreeData].branches[indexOfBranchData].leafs[
                  indexOfLeafData
                ].id,
                treeData?.[indexOfTreeData].branches[indexOfBranchData].leafs[
                  indexOfLeafData
                ].isStatus,
              )
            }
            isChecked={techLeafStatus}
          />
        </HStack>
      </Box>
    );
  },
);
