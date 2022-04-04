import { memo, FC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  onClick: () => void;
  name: string | ReactNode;
  backgroundColor?: "green" | "red" | "gray"; // 背景の色
  testId?: string;
};

/**
 * 設定済みのボタンコンポーネント.
 * @remarks
 * 背景色をgreenかredかgrayで指定してください。デフォルトはgreenです。
 */
export const ButtonItem: FC<Props> = memo(
  ({ onClick, name, backgroundColor = "green", testId }) => {
    return (
      <>
        <Button
          type="button"
          onClick={onClick}
          size="md"
          textColor="white"
          backgroundColor={`${backgroundColor}.400`}
          _focus={{ boxShadow: "none" }}
          _hover={{ backgroundColor: `${backgroundColor}.300` }}
          _active={{ backgroundColor: `${backgroundColor}.200` }}
          data-testid={testId}
        >
          {name}
        </Button>
      </>
    );
  },
);
