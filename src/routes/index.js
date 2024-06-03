import { Navigate, useRoutes } from "react-router-dom";
import Edit from "@/page/edit";
import Preview from "@/page/preview";

const rootRouter = [
  {
    path: "/",
    element: <Navigate to="/edit" />,
  },
  {
    path: "/edit",
    exact: true,
    element: <Edit />,
  },
  {
    path: "/preview",
    exact: true,
    element: <Preview />,
  },
];

const RootRouter = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default RootRouter;
