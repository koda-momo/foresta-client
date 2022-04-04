import { FC, memo, useState } from "react";
import { Button } from "@chakra-ui/react";

export const FollowButton: FC = memo(() => {
  const [status, setStatus] = useState(true);
  const change = () => {
    setStatus(!status);
  };
  return (
    <div>
      {status ? (
        <Button
          colorScheme="green"
          size="md"
          width="150px"
          borderRadius={20}
          _focus={{ boxShadow: "none" }}
          onClick={change}
        >
          follow
        </Button>
      ) : (
        <Button
          colorScheme="green"
          variant="outline"
          size="md"
          width="150px"
          borderRadius={20}
          _focus={{ boxShadow: "none" }}
          onClick={change}
        >
          unfollow
        </Button>
      )}
    </div>
  );
});
