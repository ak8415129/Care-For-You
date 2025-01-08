import React, { useEffect, useState } from "react";
import Auth from "./Pages/Auth/Auth";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LogoutHandler from "./Components/LogoutHandler/LogoutHandler";
import AddReview from "./Pages/Review/AddReview";
import { useSelector } from "react-redux";
import Reviews from "./Pages/Review/Reviews";
import EditAddWard from "./Pages/EditAddWard/EditAddWard";

function App() {
  const [updatedId, setUpdatedId] = useState(0);
  const location = useLocation();
  let currentWard = useSelector((state) => state.wardName);
  const wardName = currentWard;
  currentWard = currentWard.replace(/\s/g, "").toLowerCase();

  useEffect(() => {
    // This functionality is added for when user click on back button and in setUpdatedId is the current ward id so its need to be reset again
    const handleBackButton = () => {
      setUpdatedId(0);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // getting the currentWard Id from its name
  const allWardData = useSelector((state) => state.wards);
  const currentWardData = allWardData.find(
    (ward) => ward.wardName === wardName
  );
  return (
    <div>
      {location.pathname !== "/auth" && <LogoutHandler />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={<Home updatedId={updatedId} setUpdatedId={setUpdatedId} />}
        />
        <Route
          path={`/${currentWard}/reviews`}
          element={<Reviews ward={wardName} wardId={currentWardData?._id} />}
        />
        <Route
          path={`/${currentWard}/addReview`}
          element={<AddReview ward={wardName} wardId={currentWardData?._id} />}
        />
        <Route
          path={`/${currentWard}/edit`}
          element={
            <EditAddWard updatedId={updatedId} setUpdatedId={setUpdatedId} />
          }
        />
        <Route
          path="/addWard"
          element={
            <EditAddWard updatedId={updatedId} setUpdatedId={setUpdatedId} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
