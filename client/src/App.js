import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Create from "./components/create/Create";
import FoodDetails from "./components/foodDetails/FoodDetails";
import FoodCatalog from "./components/foodCatalog/FoodCatalog";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Admin from "./components/admin/Admin";
import Cashout from "./components/cashout/Cashout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/foods" element={<FoodCatalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cashout" element={<Cashout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
