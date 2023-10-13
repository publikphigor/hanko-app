import LoadingPage from "@components/global/LoadingPage";
import NotFound from "@components/global/NotFound";
import { LazyExoticComponent, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

interface IRoutes {
  path: string;
  component: LazyExoticComponent<React.FC>;
}

const routes: IRoutes[] = [
  {
    path: "/",
    component: lazy(() => import("@pages/Home")),
  },
];

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
