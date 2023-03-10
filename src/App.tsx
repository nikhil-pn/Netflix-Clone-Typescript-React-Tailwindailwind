import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

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
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default function App() {
  return <AppRouter />;
}
