import Footer from "./components/Footer";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import SigninBanner from "./components/SigninBanner";
import Browse from "./pages/Browse";
import Login from "./components/Login";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <>
            <SigninBanner></SigninBanner>
            <Footer></Footer>
            </>
            
          }
        ></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/browse" element={<Layout></Layout>}>
          <Route index element={<Browse />}></Route>
        </Route>

        <Route path="/latest" element={<Layout />}>
          <Route index element={<h1>Latest</h1>}></Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return <AppRouter />;
}
