// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import PostAd from "./pages/PostAd";
import ExchangeProducts from "./pages/exchange_products_page/ExchangeProducts";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/ProductCategoryPage";
import MyProduct from "./pages/ProductPage";
import MyInfo from "./pages/MyInfo";
import MyCart from "./pages/CartPage";
import MyWishlist from "./pages/MyWishlist";
import MyAds from "./pages/MyAds";
import Notfound from "./pages/Notfound";
import Guard from "./components/guard/Guard";
import '../node_modules/bootstrap/dist/js/bootstrap'
import Footer from "./components/footer/Footer";
import SearchedItems from "./components/searchedItems/SearchedItems";
import RequireAuth from "./components/loginAuths/RequireAuth";
import ConfirmPage from "./pages/ConfirmPage";
import SeeOffers from "./pages/seeOffers/SeeOffers"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


function App() {
  return (
    <>
      <PayPalScriptProvider options={{"client-id":"AUmhsxLzCXuQsabEuOPcmN32WTzkgReWGzyqI3ul2J2fpN9w8QhguYbUoo245cL3WJx5i-7tDJgJ8jsi"}}>
        <Navbar />
        <Routes>

          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category/:catid" element={<Category />} />
          <Route path="/searchedItems" element={<SearchedItems />} />
          <Route path="/product" element={<MyProduct />} />

          <Route element={<RequireAuth />}>
            <Route path="/postAd/:uid" element={<PostAd />} />
            <Route path="/exchangeProducts" element={<ExchangeProducts />} />
            <Route path="/myInfo/:uid" element={<MyInfo />} />
            <Route path="/myAds/:uid" element={<MyAds />} />
            <Route path="/myWishlist/:uid" element={<MyWishlist />} />
            <Route path="/cart/:uid" element={<MyCart />} />
            <Route path="/confirm/:uid" element={<ConfirmPage />} />
            <Route path="/seeoffers" element={<SeeOffers />} />
          </Route>

          <Route path="*" element={<Notfound />} />

        </Routes>
        <Footer />
      </PayPalScriptProvider>
    </>
  );
}

export default App;
