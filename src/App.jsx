import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/appStore";
import Body from "./components/Body";
import Feed from "./components/Feed";
import GroupDetail from "./components/GroupDetail";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/group/:groupId" element={<GroupDetail />} />
              {/* <Route path="/connections" element={<Connections />} /> */}
              {/* <Route path="/requests" element={<Requests />} /> */}
              {/* <Route path="/chat/:targetUserId" element={<Chat />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
