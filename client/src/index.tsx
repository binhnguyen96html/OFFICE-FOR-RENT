import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomePage from "./screens/HomePage";
import BuildingManagement from "./screens/BuildingManagement";
import {Provider} from "react-redux";
import store from "./store/store";
import NewBuildingScreen from "./screens/NewBuildingScreen";
import EditBuildingScreen from "./screens/EditBuildingScreen";
import CustomerManagement from "./screens/CustomerManagement";
import NewCustomerScreen from "./screens/NewCustomerScreen";
import EditCustomerScreen from "./screens/EditCustomerScreen";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<HomePage/>}/>
            <Route path='/building-management' element={<BuildingManagement/>}/>
            <Route path='/building-management/new-building' element={<NewBuildingScreen />} />
            <Route path='/building-management/:id/edit' element={<EditBuildingScreen />} />
            <Route path='/customer-management' element={<CustomerManagement/>} />
            <Route path='/customer-management/new-customer' element={<NewCustomerScreen/>} />
            <Route path='/customer-management/edit/:id' element={<EditCustomerScreen/>} />
        </Route>
    )
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
