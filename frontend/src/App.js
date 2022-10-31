import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductForm from './components/Manufacturer/ProductForm/ProductForm';
import BatchOrderList from './components/Manufacturer/BatchOrderList/BatchOrderList';
import DelivererList from './components/Manufacturer/DelivererList/DelivererList';
import BatchJourneyList from './components/Manufacturer/BatchJourneyList/BatchJourneyList';
import FaultyBatchList from './components/Manufacturer/FaultyBatchList/FaultyBatchList';
import InvitationList from './components/Deliverer/InvitationList/InvitationList';
import TransferList from './components/Deliverer/TransferList/TransferList';
import BatchJourneyListDeliverer from './components/Deliverer/BatchJourneyList/BatchJourneyListDeliverer';
import Login from './components/Login/Login';
import DelivererFaultyBatch from './components/Deliverer/FaultyBatchList/DelivererFaultyBatch';
import ProductList from './components/Retailer/ProductList/ProductList';
import RetailerFaultyBatch from './components/Retailer/FaultyBatchList/RetailerFaultyBatch';
import RetailerTransferList from './components/Retailer/TransferList/RetailerTransferList';
import CreateUserForm from './components/Admin/CreateUserForm/CreateUserForm';
import UserList from './components/Admin/UserList/UserList';
// import Navbar from './components/NavBar/NavBar';
import { isLoggedIn } from './utils/auth';
import WithNav from './components/Layout/WithNav';
import WithoutNav from './components/Layout/WithoutNav';
import HomePage from './components/Manufacturer/HomePage/HomePage';
import HomePageDeliverer from './components/Deliverer/HomePage/HomePageDeliverer';// import {AnimatedPresence} from "framer-motion/dist/framer-motion"
import HomePageRetailer from './components/Retailer/HomePage/HomePageRetailer';
import HomePageAdmin
 from './components/Admin/HomePage/HomePageAdmin';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Login />} />
          </Route>
          {isLoggedIn() ? <Route element={<WithNav />}>
            <Route path="/manufacturer/homepage" element ={<HomePage/>} />
            <Route path="/manufacturer/productform" element={<ProductForm />} />
            <Route path="/manufacturer/batchorderlist" element={<BatchOrderList />} />
            <Route path="/manufacturer/delivererlist" element={<DelivererList />} />
            <Route path="/manufacturer/batchjourney" element={<BatchJourneyList />} />
            <Route path="/manufacturer/faultybatch" element={<FaultyBatchList />} />
            <Route path="/deliverer/homepage" element ={<HomePageDeliverer/>} />
            <Route path="/deliverer/invitationlist" element={<InvitationList />} />
            <Route path="/deliverer/transferlist" element={<TransferList />} />
            <Route path="/deliverer/batchjourney" element={<BatchJourneyListDeliverer />} />
            <Route path="/deliverer/faultybatch" element={<DelivererFaultyBatch />} />
            <Route path="/retailer/homepage" element ={<HomePageRetailer/>} />
            <Route path="/retailer/productlist" element={<ProductList />} />
            <Route path="/retailer/transferlist" element={<RetailerTransferList />} />
            <Route path="/retailer/faultybatch" element={<RetailerFaultyBatch />} />
            <Route path="/admin/homepage" element ={<HomePageAdmin/>} />
            <Route path="/admin/createuser" element={<CreateUserForm />} />
            <Route path="/admin/userlist" element={<UserList />} />
          </Route> : <Route path="*" element={<Navigate to="/" replace />}></Route>}

          {/* <Route element={<WithoutNav />}><Route path="/" element={<Login />} /></Route> */}

          {/* {isLoggedIn && <Route path="/manufacturer/productform" element={<ProductForm/>} />}
            {isLoggedIn && <Route path="/manufacturer/batchorderlist" element={<BatchOrderList/>} />}
            {isLoggedIn && <Route path="/manufacturer/delivererlist" element={<DelivererList/>} />}
            {isLoggedIn && <Route path="/manufacturer/batchjourney" element={<BatchJourneyList/>} />}
            {isLoggedIn && <Route path="/deliverer/invitationlist" element={<InvitationList/>} />}
            {isLoggedIn && <Route path="/deliverer/transferlist" element={<TransferList/>} />}
            {isLoggedIn && <Route path="/deliverer/batchjourney" element={<BatchJourneyListDeliverer/>} />}
            {isLoggedIn && <Route path="/deliverer/faultybatch" element={<DelivererFaultyBatch/>} />}
            {isLoggedIn && <Route path="/retailer/productlist" element={<ProductList/>} />}
            {isLoggedIn && <Route path="/retailer/transferlist" element={<RetailerTransferList/>} />}
            {isLoggedIn && <Route path="/retailer/faultybatch" element={<RetailerFaultyBatch/>} />}
            {isLoggedIn && <Route path="/admin/createuser" element={<CreateUserForm/>} />}
            {isLoggedIn && <Route path="/admin/userlist" element={<UserList/>} />} */}
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
