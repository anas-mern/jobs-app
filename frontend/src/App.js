import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/auth";
import PrivateRouter from "./routes/PrivateRouter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<PrivateRouter />} path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
