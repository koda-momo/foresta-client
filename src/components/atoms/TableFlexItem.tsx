import { memo, FC, useCallback, SetStateAction, Dispatch } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { XIcon } from "@primer/octicons-react";

type Props = {
  itemArray: Array<string>; //タグのように並べたい項目
  deleteBtn?: boolean;
  setArray?: Dispatch<SetStateAction<Array<string>>>; //配列をいじる
};

/**
 * テーブルにてFlexBoxで項目回しているところ.
 */
export const TableFlexItem: FC<Props> = memo(
  ({ itemArray, deleteBtn = false, setArray }) => {
    /**
     * 配列から要素の削除.
     */
    const deleteAction = useCallback(
      (index: number) => {
        const array = itemArray;
        array.splice(index, 1);
        {
          setArray && setArray([...array]);
        }
      },
      [itemArray, setArray],
    );

    return (
      <>
        <Flex wrap="wrap" w={500} gap={2}>
          {itemArray.map((item, i) => (
            <div key={i}>
              <Box
                backgroundColor="gray.400"
                borderRadius={5}
                px={2}
                py={1}
                textColor="white"
                data-testid="skill"
              >
                {item}
                {deleteBtn && (
                  <Button
                    data-testid={`test-btn-icon${i}`}
                    onClick={() => deleteAction(i)}
                    backgroundColor="gray.400"
                    width={3}
                    height={3}
                    _hover={{ backgroundcolor: "gray.400", opacity: "30%" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    <XIcon size={16} />
                  </Button>
                )}
              </Box>
            </div>
          ))}
        </Flex>
      </>
    );
  },
);
