import { FC, memo } from "react";
import { ProgressBar } from "../../atoms/techForest/ProgressBar";
import { Text, HStack, Heading } from "@chakra-ui/react";

type Props = {
  TreeName: string;
  AchievementRate: number;
};

export const ProgressComp: FC<Props> = memo(({ TreeName, AchievementRate }) => {
  return (
    <div>
      <HStack pb={4}>
        <Heading color="green.500" as="h2" size="xl">
          {TreeName}
        </Heading>
        <Text color="gray.600" fontSize="xl" pt={2} pl={2}>
          進捗率 {AchievementRate}%
        </Text>
      </HStack>
      <ProgressBar AchievementRate={AchievementRate} />
    </div>
  );
});
