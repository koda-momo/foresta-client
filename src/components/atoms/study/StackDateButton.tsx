import React, { FC, memo } from "react";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type StackDateButton = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isType: boolean;
  rightRadius?: number;
  leftRadius?: number;
};

/**
 *学習時間グラフ用日にち切り替えボタン.
 */
export const StackDateButton: FC<StackDateButton> = memo(
  ({ onClick, isType, rightRadius, leftRadius }) => {
    return (
      <Button
        w={4}
        h={8}
        borderRadius="none"
        color="white"
        backgroundColor="blue.800"
        onClick={onClick}
        shadow="base"
        borderRightRadius={rightRadius}
        borderLeftRadius={leftRadius}
        _focus={{ boxShadow: "none" }}
        _hover={{ backgroundColor: "blue.900" }}
        _active={{ backgroundColor: "blue.900" }}
      >
        {isType ? (
          <ChevronLeftIcon w={4} h={4} />
        ) : (
          <ChevronRightIcon w={4} h={4} />
        )}
      </Button>
    );
  },
);
