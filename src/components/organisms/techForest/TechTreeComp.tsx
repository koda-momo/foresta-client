import { FC, memo } from "react";
import { TreeData } from "../../../types/types";
import { TechBranch } from "../../../types/types";
import { TechBranchComp } from "../../molucules/techForest/TechBranchComp";
import { ProgressComp } from "../../molucules/techForest/ProgressComp";
import { Box, Center, SimpleGrid } from "@chakra-ui/react";

type Props = {
  treeData:
    | {
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
      }[]
    | undefined;
};

export const TechTreeComp: FC<Props> = memo(({ treeData }) => {
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

  return (
    <>
      {sortTreeData &&
        sortTreeData.map((techTreeData: TreeData, indexOfTreeData: number) => {
          return (
            <Center key={indexOfTreeData}>
              <Box
                bg="white"
                w="85%"
                p={8}
                m={5}
                borderRadius="lg"
                boxShadow={"base"}
              >
                <SimpleGrid columns={1} spacing={3}>
                  <ProgressComp
                    TreeName={techTreeData.treeName}
                    AchievementRate={techTreeData.achievementRate}
                  />
                  {treeData?.[indexOfTreeData].branches &&
                    treeData?.[indexOfTreeData].branches.map(
                      (
                        techBranchData: TechBranch,
                        indexOfBranchData: number,
                      ) => {
                        return (
                          <TechBranchComp
                            key={indexOfBranchData}
                            treeData={treeData}
                            indexOfTreeData={indexOfTreeData}
                            techBranchText={techBranchData.name}
                            indexOfBranchData={indexOfBranchData}
                          />
                        );
                      },
                    )}
                </SimpleGrid>
              </Box>
            </Center>
          );
        })}
    </>
  );
});
