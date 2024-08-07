
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Redirect } from "react-router-dom"; 
import Error from './component/Error';
import PAN from './component/PAN';
import Body from './component/Body';
import Home from './component/Home';
import PAN360 from './component/PAN360';
import BasicPAN from './component/BasicPAN';
import Aadhaar360 from './component/Aadhaar360';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Introduction from './component/Introduction';
import PriceUpdates from './component/PriceUpdates';
import {Navigate } from 'react-router-dom';



const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    element={isLoggedIn ? <Component /> : <Navigate to="/" replace />}
  />
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />, 
    children: [
      {
        path: "body",
        element: <Body />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "introduction",
        element: <Introduction />,
      },
      {
        path: "pan",
        element: <PAN />,
      },
      {
        path: "pan360",
        element: <PAN360 />,
      },
      {
        path: "basicpan",
        element: <BasicPAN />,
      },
      {
        path: "aadhaar360",
        element: <Aadhaar360 />,
      },
      {
        path: "priceupdates",
        element: <PriceUpdates/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_FOR_REACT}>
    <RouterProvider router={router} /> 
  </GoogleOAuthProvider>
);

reportWebVitals();