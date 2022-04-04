import { memo, FC } from "react";
import { TodosArea } from "../../components/organisms/study/TodosArea";
import { GithubLeaf } from "../../components/organisms/study/GithubLeaf";
import { StackArea } from "../../components/organisms/study/StackArea";

export const Study: FC = memo(() => {
  return (
    <>
      <TodosArea />
      <StackArea />
      <GithubLeaf />
    </>
  );
});
