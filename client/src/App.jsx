import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/rootLayout.jsx";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<RootLayout />}>
            {/* from origin project - example of routing*/}
            <Route index element={<HomePage />} />         
            <Route path="/dashboard" element={<Dashboard />} />
            <Route component={ErrorPage} erroElement={<ErrorPage />} />
            <Route path='*' element={<ErrorPage />}/>
            
        </Route>

    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
