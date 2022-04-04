import React, { FC, memo, useState } from "react";
import {
  Flex,
  Center,
  Text,
  Input,
  SimpleGrid,
  Spacer,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput: FC<Props> = memo(({ value, onChange }) => {
  // パスワード表示/非表示の状態管理
  const [show, setShow] = useState(false);
  // パスワード表示/非表示の状態を変更
  const handleClick = () => setShow(!show);
  return (
    <Center>
      <SimpleGrid columns={1}>
        <Flex>
          <Text mb={2} fontSize="sm">
            パスワード
          </Text>
          <Spacer />
          <Button
            fontSize="12px"
            mb={2}
            size="sm"
            colorScheme="teal"
            variant="link"
            _focus={{ boxShadow: "none" }}
          >
            パスワードを忘れた場合
          </Button>
        </Flex>

        <InputGroup size="md">
          <Input
            w={72}
            bg="white"
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "非表示" : "表示"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </SimpleGrid>
    </Center>
  );
});
