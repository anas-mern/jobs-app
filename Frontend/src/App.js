import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/auth";
import PrivateRouter from "./routes/PrivateRouter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<PrivateRouter />} path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="/edit-note/:id" element={<EditNote />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
