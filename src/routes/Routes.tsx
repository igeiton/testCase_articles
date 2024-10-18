import { FC } from "react";
import { useRoutes } from "react-router-dom";

import { Auth } from "../pages/auth/Auth";
import { Provider } from "./Provider";

import { ArticlesList } from "../pages/articlesList/ArticlesList";
import { ArticlePage } from "../pages/articlePage/ArticlePage";
import { PageWrapper } from "../components/pageWrapper/PageWrapper";
import { Registration } from "../pages/registration/Registration";
import { ChangePassword } from "../pages/changePassword/ChangePassword";

import {
  ARTICLES_LIST_PATH,
  AUTH_PATH,
  CHANGE_PASSWORD_PATH,
  REGISTRATION_PATH,
} from "../configs/routes";

export const Routes: FC = () => {
  return useRoutes([
    { path: AUTH_PATH, element: <Auth /> },
    { path: REGISTRATION_PATH, element: <Registration /> },
    {
      path: "/",
      element: <Provider />,
      children: [
        {
          path: ARTICLES_LIST_PATH,
          element: <PageWrapper />,
          children: [
            {
              index: true,
              element: <ArticlesList />,
            },
            { path: ":id", element: <ArticlePage /> },
          ],
        },
        {
          path: CHANGE_PASSWORD_PATH,
          element: <PageWrapper />,
          children: [{ index: true, element: <ChangePassword /> }],
        },
      ],
    },
  ]);
};
