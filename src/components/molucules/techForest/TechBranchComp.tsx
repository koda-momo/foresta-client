import { FC, memo } from "react";
import { TechLeafComp } from "../../atoms/techForest/TechLeafComp";
import { AccordionContent } from "../../molucules/AccordionContent";
import { TechLeafData } from "../../../types/types";
import { Flex, HStack } from "@chakra-ui/react";

type Props = {
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
  indexOfTreeData: number;
  techBranchText: string;
  indexOfBranchData: number;
};

export const TechBranchComp: FC<Props> = memo(
  ({ treeData, indexOfTreeData, techBranchText, indexOfBranchData }) => {
    return (
      <HStack key={indexOfBranchData}>
        <AccordionContent
          title={techBranchText}
          content={
            <Flex>
              {treeData?.[indexOfTreeData].branches[indexOfBranchData].leafs &&
                treeData?.[indexOfTreeData].branches[
                  indexOfBranchData
                ].leafs.map(
                  (techLeafData: TechLeafData, indexOfLeafData: number) => {
                    return (
                      <TechLeafComp
                        key={indexOfLeafData}
                        treeData={treeData}
                        techLeafTextData={techLeafData.name}
                        techLeafStatus={techLeafData.isStatus}
                        indexOfTreeData={indexOfTreeData}
                        indexOfBranchData={indexOfBranchData}
                        indexOfLeafData={indexOfLeafData}
                      />
                    );
                  },
                )}
            </Flex>
          }
          size={"lg"}
        />
      </HStack>
    );
  },
);
