import React, { FC, memo } from "react";
import { Center, Text, Input, SimpleGrid } from "@chakra-ui/react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EmailInput: FC<Props> = memo(({ value, onChange }) => {
  return (
    <Center mt={8}>
      <SimpleGrid columns={1}>
        <Text mb={2} fontSize="sm">
          メールアドレス
        </Text>
        <Input w={72} bg="white" value={value} onChange={(e) => onChange(e)} />
      </SimpleGrid>
    </Center>
  );
});
