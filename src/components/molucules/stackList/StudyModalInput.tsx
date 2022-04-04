import { ModalBody } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { AddStack } from "../../../types/types";
import { TextAreaWithCounter } from "../../atoms/common/TextAreaWithCounter";
import { TextInput } from "../../atoms/common/TextInput";
import { StackSelectSkill } from "../../atoms/study/StackSelectSkill";
import { StackTimeSelectBox } from "../../atoms/study/StackTimeSelectBox";

type Props = {
  register: UseFormRegister<AddStack>;
  errors: {
    createdAt?: FieldError | undefined;
    skillTagId?: FieldError | undefined;
    timeStack?: FieldError | undefined;
    content?: FieldError | undefined;
  };
};

/**
 * studyModalに表示するテキストボックス.
 */
export const StudyModalInput: FC<Props> = memo((props) => {
  const { register, errors } = props;

  return (
    <ModalBody backgroundColor="white" m={3} borderRadius="base">
      <TextInput
        label="Started at"
        type="date"
        placeholder="Started at"
        registers={register("createdAt")}
        errorMessage={errors.createdAt?.message}
      />
      <StackSelectSkill registers={register("skillTagId")} label="Technology" />
      <StackTimeSelectBox
        label="Minutes"
        options={[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]}
        registers={register("timeStack")}
        data-testid="stackTimeSelect"
      />
      <TextAreaWithCounter
        label="Detail"
        placeholder="Detail"
        registers={register("content")}
        errorMessage={errors.content?.message}
      />
    </ModalBody>
  );
});
