import { FC, memo } from "react";
import { Button, Text } from "@chakra-ui/react";

type Props = {
  techAreaTextData: string;
  indexOfTechArea: number;
  changeArea: (indexOfTechArea: number) => void;
};

export const AreaSelectButton: FC<Props> = memo(
  ({ techAreaTextData, indexOfTechArea, changeArea }) => {
    return (
      <Button
        bg="gray.100"
        variant="solid"
        onClick={() => changeArea(indexOfTechArea)}
        boxShadow={"base"}
      >
        <Text color="gray.600" fontSize="sm">
          {techAreaTextData}
        </Text>
      </Button>
    );
  },
);
