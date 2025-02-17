import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import { Header, Wrapper } from "./components"
import { HomePage, LoginPage, SignupPage, CartPage, StorePage } from "./pages";


import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'


function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Wrapper>
      
          <Header />
          <div className="pt-3 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/cart/:id" element={<CartPage />} />
              <Route path="/store" element={<StorePage />} />

            </Routes>
          </div>
        
        </Wrapper>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
