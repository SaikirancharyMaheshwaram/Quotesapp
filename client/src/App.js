import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./components/Signup.js";
import Home from "./components/Home";
import SignIn from "./components/Signin.js";
import ClassicForm from "./components/homecomponets/ClassicForm.js";
import UpdateForm from "./components/homecomponets/UpdateForm.js";
import Myposts from "./components/homecomponets/Myposts.js";
import Myfav from "./components/homecomponets/Myfav.js";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/createpost" element={<ClassicForm />}></Route>
          <Route path="/updatepost" element={<UpdateForm />}></Route>
          <Route path="/myposts" element={<Myposts />}></Route>
          <Route path="/fav" element={<Myfav />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
