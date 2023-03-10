import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <div className="grid h-screen place-content-center bg-green-500">
              <h1 className=" justify-center  text-6xl font-semibold text-white underline ">
                Tailwind Is Working
              </h1>
            </div>
          }
        ></Route>

        <Route path="/login" element={<h1>Login Page</h1>}></Route>

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
