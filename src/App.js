import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import SignInForm from "./components/signInForm/SignInForm";
import Home from "./components/home/Home";
import CreatePost from "./components/create-post/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
