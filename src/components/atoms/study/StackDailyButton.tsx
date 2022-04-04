import React, { FC, memo } from "react";
import { Button } from "@chakra-ui/react";

type StackDailyButton = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
};

/**
 *学習時間グラフ用日毎・月毎切り替えボタン.
 */
export const StackDailyButton: FC<StackDailyButton> = memo(
  ({ onClick, title }) => {
    return (
      <Button
        size="sm"
        textColor="white"
        backgroundColor="blackAlpha.500"
        mr={3}
        _focus={{ boxShadow: "none" }}
        _hover={{ backgroundColor: "blackAlpha.600" }}
        _active={{ backgroundColor: "blackAlpha.700" }}
        onClick={onClick}
      >
        {title}
      </Button>
    );
  },
);
