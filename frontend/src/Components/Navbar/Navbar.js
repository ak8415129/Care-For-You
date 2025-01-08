import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeWard } from "../../Actions/ChangeWardActions";

const Navbar = ({ wards }) => {
  const dispatch = useDispatch();
  const setCurrentWard = (ward) => {
    dispatch(changeWard(ward));
  };
  const selectedWard = useSelector((state) => state.wardName);
  return (
    <nav className="overflow-y-scroll flex-col w-1/4 items-center bg-teal-300">
      {wards.map((ward, index) => (
        <li
          className={`list-none hover:text-orange-600 mb-3 ${
            index === 0 ? "mt-3" : "mt-32"
          } ms-6 text-center font-medium text-lg ${
            selectedWard === ward ? "text-orange-600" : "black"
          } cursor-pointer`}
          onClick={() => setCurrentWard(ward)}
          key={ward}
        >
          {ward}
        </li>
      ))}
    </nav>
  );
};

export default Navbar;
