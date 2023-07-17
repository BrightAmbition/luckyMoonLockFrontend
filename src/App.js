// import logo from './logo.svg';
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./Components/Dashboard";
import LiqLock from "./Components/LiquidityLock";
import TokenLocker from "./Components/TokenLocker";
import Layout from "./Components/Layout";
import Services from "./Components/Services";
import LiquidityLocker from "./Components/LiquidityLocker";
import TokenLocks from "./Components/TokenLocker/TokenLocks";
import CommintSoon from "./Components/Layout/CommingSoon";
import "./font.css";
import Account from "./Components/Account";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          loader: async () => {
            try {
              const res = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,binancecoin&vs_currencies=usd"
              );
              return res;
            } catch (err) {
              return { err };
            }
          },
        },
        {
          path: "services/liqlock",
          element: <LiqLock />,
        },
        {
          path: "sushi-v1/locker",
          element: <LiquidityLocker />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "/tokenlocker",
          element: <TokenLocker />,
        },
        {
          path: "/profile",
          element: <Account />,
        },
        {
          path: "*",
          element: <CommintSoon />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
