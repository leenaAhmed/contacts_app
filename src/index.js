import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ContactList from './modules/contact-list';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import { Layout } from './components/layout/index';
import ContactDetail  from './modules/contact-details/index';
import ErrorPage from './components/error/index';
import UserForm from './modules/contact-form/index';
import { Provider } from 'react-redux';
import store from './core/store/store';
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
      },
      {
        path: "/create-user",
        element: <UserForm />
       },
       {
        path: "/edit/:id",
        element: <UserForm isEditing/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 );


reportWebVitals();
