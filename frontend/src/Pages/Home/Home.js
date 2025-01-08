import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWardData } from "../../Actions/WardActions";
import Navbar from "../../Components/Navbar/Navbar";
import Ward from "./Ward/Ward";

const Home = React.memo(({ updatedId, setUpdatedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getWardData());
  }, [navigate, dispatch]);

  const wardsData = useSelector((state) => state.wards);
  let currentWard = useSelector((state) => state.wardName);
  const wards = [...new Set(wardsData.map((ward) => ward.wardName))];
  const [currentWardData] = wardsData.filter(
    (ward) => ward.wardName === currentWard
  );
  currentWard = currentWard.replace(/\s/g, "").toLowerCase();

  return (
    <div className="flex h-screen">
      <Navbar wards={wards} />
      <Ward currentWardData={currentWardData} setUpdatedId={setUpdatedId} />
      <div>
        <Button
          variant="contained"
          style={{
            position: "absolute",
            bottom: "1.3vmin",
            right: "97vmin",
            backgroundColor: "#0bd1bc",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => navigate(`/${currentWard}/reviews`)}
        >
          Reviews
        </Button>
        <Button
          variant="contained"
          style={{
            position: "absolute",
            bottom: "1.3vmin",
            right: "66vmin",
            fontWeight: "bold",
          }}
          onClick={() => navigate(`/${currentWard}/addReview`)}
        >
          Add Review
        </Button>
      </div>
    </div>
  );
});

export default Home;
