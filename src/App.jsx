import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/NavBar/Navbar"; // 👈 Impor navbar
import Footer  from "./components/Footer/Footer"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Layout general */}
        <div className="flex flex-col min-h-screen">
          {/* Navbar fijo */}
          <Navbar />

          {/* Contenido principal (con padding-top para compensar el navbar) */}
          <main className="flex-grow pt-24">
            <AppRoutes />
          </main>

          {/* Footer al fondo */}
          <Footer />
        </div>

        {/* Notificaciones */}
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
