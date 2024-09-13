import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ContactList from './modules/contact-list';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import { Layout } from './components/layout/index';
import  ContactDetail  from './modules/contact-details/index';
import ErrorPage from './components/error/index';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
     children: [
      {
        path: "/",
        element: <ContactList />,
      },
      {
        path: "/contact/:uuid",
        element: <ContactDetail/>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
 );


reportWebVitals();
