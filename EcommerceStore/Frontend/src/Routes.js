import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './core/Home'
import AdminDashBoard from './user/AdminDashBoard'
import Profile from './user/Profile'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashBoard from './user/UserDashBoard'
import AdminRoutes from "./auth/helper/AdminRoutes"
import PrivateRoutes from "./auth/helper/PrivateRoutes"
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'


const Routes=()=> {
  return (
    // keep your UI in sync with the URL browserRouter.
    <BrowserRouter>
    {/* Routes are used instead of switch & it switches between routes*/}
        <Switch>
        {/* ROutes avaliable to all users */}
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/cart" exact component={Cart}/>

            {/* now uses props as path="/abc" exact component as element={<component/>} */}
        {/* Routes for naive users */}
            <PrivateRoutes path="/user/Dashboard" exact component={UserDashBoard} />

            {/* Routes for admin */}
            <AdminRoutes path="/admin/Dashboard" exact component={AdminDashBoard} />
            <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
            <AdminRoutes path="/admin/categories" exact component={ManageCategories} />
            <AdminRoutes path="/admin/create/product" exact component={AddProduct} />
            <AdminRoutes path="/admin/products" exact component={ManageProducts}/>
            <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        </Switch>
    </BrowserRouter>
  )
}


export default Routes;
