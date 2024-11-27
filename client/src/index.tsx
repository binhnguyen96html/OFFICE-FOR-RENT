import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomePage from "./screens/HomePage";
import RentManagement from "./screens/RentManagement";
import {Provider} from "react-redux";
import store from "./store/store";
import NewBuildingScreen from "./screens/NewBuildingScreen";
import EditBuildingScreen from "./screens/EditBuildingScreen";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<HomePage/>}/>
            <Route path='/rent-management' element={<RentManagement/>}/>
            <Route path='/rent-management/new-building' element={<NewBuildingScreen />} />
            <Route path='/rent-management/:id/edit' element={<EditBuildingScreen />} />
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
