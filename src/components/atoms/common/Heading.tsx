import { FC } from "react";
import { Text } from "@chakra-ui/react";

type Props = {
  text: string; // 見出しのテキスト
};

/**
 * 見出しを表すコンポーネント.
 */
export const Heading: FC<Props> = (props) => {
  const { text } = props;
  return (
    <Text
      fontSize="3xl"
      color="green.400"
      decoration="underline"
      fontWeight="bold"
    >
      {text}
    </Text>
  );
};
