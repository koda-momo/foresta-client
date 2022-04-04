import React, { FC, memo } from "react";
import { Button } from "@chakra-ui/react";

type StackFigButton = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
};

/**
 *学習時間グラフ用グラフ切り替えボタン.
 */
export const StackFigButton: FC<StackFigButton> = memo(({ onClick, title }) => {
  return (
    <Button
      size="sm"
      textColor="white"
      backgroundColor="blackAlpha.500"
      mr={3}
      onClick={onClick}
      _focus={{ boxShadow: "none" }}
      _hover={{ backgroundColor: "blackAlpha.600" }}
      _active={{ backgroundColor: "blackAlpha.700" }}
    >
      {title}
    </Button>
  );
});
