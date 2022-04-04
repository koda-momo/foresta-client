import { FC, memo } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { StackList } from "./StackList";
import { StackTime } from "./StackTime";

/**
 * Stackを表示するエリアのコンポーネント.
 */
export const StackArea: FC = memo(() => {
  return (
    <Container maxWidth="full" pt={10}>
      <Flex alignItems="stretch">
        <StackList />

        <StackTime />
      </Flex>
    </Container>
  );
});
