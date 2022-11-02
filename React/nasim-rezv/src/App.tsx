import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const Layout = lazy(() => import("./components/Layout/Layout"));
const AllQuranPages = lazy(() => import("./components/AllQuranPages"));
const Main = lazy(() => import("./components/Main"));
const Setting = lazy(() => import("./components/setting/Setting"));
const Search = lazy(() => import("./components/search/Search"));

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/pages/:id" element={<AllQuranPages />}>
              <Route path=":surahNumberSearch" element={<AllQuranPages />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
