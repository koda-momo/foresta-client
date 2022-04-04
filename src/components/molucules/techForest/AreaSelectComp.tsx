import { FC } from "react";
import { useGetAllTechAreaQuery } from "../../../types/generated/graphql";
import { AreaSelectButton } from "../../atoms/techForest/AreaSelectButton";
import { Box, HStack } from "@chakra-ui/react";
import { TechArea } from "../../../types/types";

type Props = {
  setAreaId: (AreaId: string | undefined) => void;
};

export const AreaSelectComp: FC<Props> = ({ setAreaId }) => {
  // 技術エリアを全件取得するQuery
  const { data } = useGetAllTechAreaQuery();
  // 技術エリアデータ(フロントエンド、バックエンド、etc...)
  const techAreaData = data?.getAllTechArea;
  // 技術エリアを変更するメソッド
  const changeArea = (indexOfTechArea: number) => {
    setAreaId(data?.getAllTechArea[indexOfTechArea].id);
  };
  return (
    <Box bg="white" w="100%" p={5} color="white">
      <HStack spacing="24px">
        {techAreaData &&
          techAreaData.map(
            (techAreaData: TechArea, indexOfTechArea: number) => {
              return (
                <AreaSelectButton
                  key={indexOfTechArea}
                  techAreaTextData={techAreaData.name}
                  indexOfTechArea={indexOfTechArea}
                  changeArea={changeArea}
                />
              );
            },
          )}
      </HStack>
    </Box>
  );
};
