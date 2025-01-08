import React from "react";
import PatientIcon from "../../../assets/icons/patient.png";
import WorkerIcon from "../../../assets/icons/worker.png";
import Review from "../../../Components/Review/Review";
import "./Ward.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const Ward = ({ currentWardData, setUpdatedId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const onEditWardButtonClickHandler = (e) => {
    let currentWardName = currentWardData.wardName;
    currentWardName = currentWardName.replace(/\s/g, "").toLowerCase();
    console.log(currentWardData._id);
    setUpdatedId(currentWardData._id);
    navigate(`/${currentWardName}/edit`, { state: { currentWardData } });
  };

  const onAddWardButtonClickHandler = () => {
    navigate("/addWard");
  };
  return (
    currentWardData && (
      <div className="ward_info w-full justify-around">
        <div className="ward_info__name">
          <p className="text-3xl font-medium mt-6">
            {currentWardData.wardName}
          </p>
        </div>
        <div className="ward_info__details w-2/5">
          <div className="ward_info__patient">
            <img src={PatientIcon} width="70px" height="70px" alt="patient" />
            <h2>{currentWardData.patientNumber}</h2>
            <p>Ward Patient</p>
          </div>
          <div className="ward_info__worker">
            <img src={WorkerIcon} width="70px" height="70px" alt="worker" />
            <h2>{currentWardData.workerNumber}</h2>
            <p>Ward Worker</p>
          </div>
        </div>
        {user.result.isAdmin && (
          <div className="flex w-60 justify-between">
            <Button
              style={{
                backgroundColor: "#6b36d6",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={onEditWardButtonClickHandler}
            >
              Edit
            </Button>
            <Button
              style={{
                backgroundColor: "#6b36d6",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={onAddWardButtonClickHandler}
            >
              Add Ward
            </Button>
          </div>
        )}
        <div className="ward_info__review">
          <Review clean={currentWardData.cleanPoints} />
        </div>
      </div>
    )
  );
};

export default Ward;
