import { FC, memo } from "react";
import { Progress } from "@chakra-ui/react";

type Props = {
  AchievementRate: number;
};

export const ProgressBar: FC<Props> = memo(({ AchievementRate }) => {
  return (
    <Progress
      colorScheme="green"
      height="35px"
      value={AchievementRate}
      isAnimated={true}
    />
  );
});
