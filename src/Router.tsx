import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./container/pages/NotFound";
import { Study } from "./container/templates/Study";
import { AboutMe } from "./container/templates/AboutMe";
import { Login } from "./container/templates/Login";
import { Auth } from "./components/atoms/auth/Auth";
import { TechForest } from "./container/templates/TechForest";
import { EngineerList } from "./container/templates/EngineerList";
import { Header } from "./components/_layout/Header";

export const Router: React.VFC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* cookieに値が入っていない場合(ログインしてない場合は)ログイン画面に遷移する。 */}
        {/* ログイン画面を表示させるには、下記のように<Route>を<Route>で囲む */}
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path={"/"} element={<Study />} />
          </Route>

          <Route path="/aboutme" element={<Auth />}>
            <Route path={"/aboutme"} element={<AboutMe />} />
          </Route>

          <Route path="/engineerlist" element={<Auth />}>
            <Route path={"/engineerlist"} element={<EngineerList />} />
          </Route>

          <Route path="/techforest" element={<Auth />}>
            <Route path={"/techforest"} element={<TechForest />} />
          </Route>

          <Route path="study" element={<Study />} />
          <Route path="login" element={<Login />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="engineerlist" element={<EngineerList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
