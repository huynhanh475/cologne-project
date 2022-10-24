import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/manufacturer/productform" element={<ProductForm/>} />
          <Route path="/manufacturer/batchorderlist" element={<BatchOrderList/>} />
          <Route path="/manufacturer/delivererlist" element={<DelivererList/>} />
          <Route path="/manufacturer/batchjourney" element={<BatchJourneyList/>} />
          <Route path="/manufacturer/faultybatch" element={<FaultyBatchList/>} />
          <Route path="/deliverer/invitationlist" element={<InvitationList/>} />
          <Route path="/deliverer/transferlist" element={<TransferList/>} />
          <Route path="/deliverer/batchjourney" element={<BatchJourneyListDeliverer/>} />
          <Route path="/deliverer/faultybatch" element={<DelivererFaultyBatch/>} />
          <Route path="/retailer/productlist" element={<ProductList/>} />
          <Route path="/retailer/transferlist" element={<RetailerTransferList/>} />
          <Route path="/retailer/faultybatch" element={<RetailerFaultyBatch/>} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
