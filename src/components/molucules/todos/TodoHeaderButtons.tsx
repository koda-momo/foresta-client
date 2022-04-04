import { FC, ReactNode } from "react";
import { Button, Flex } from "@chakra-ui/react";

type Props = {
  label1: string | ReactNode;
  label2: string | ReactNode;
  func1: () => void;
  func2: () => void;
};

/**
 * Todoモーダルのヘッダー部分のボタンを表示するコンポーネント.
 * @param label1 一つ目のボタンのラベル
 * @param label2 二つ目のボタンのラベル
 * @param func1 一つ目のボタンが押された時に呼ばれる関数
 * @param func2 二つ目のボタンが押された時に呼ばれる関数
 */
export const TodoHeaderButtons: FC<Props> = (props) => {
  const { label1, label2, func1, func2 } = props;

  return (
    <Flex justify="end">
      <Flex gap={1}>
        <Button colorScheme="green" size="sm" onClick={func1}>
          {label1}
        </Button>
        <Button colorScheme="green" size="sm" onClick={func2}>
          {label2}
        </Button>
      </Flex>
    </Flex>
  );
};
