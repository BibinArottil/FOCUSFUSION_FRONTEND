import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { removeDetails } from "../../redux/features/photographer";
import { userRemoveDetails } from "../../redux/features/user";

function LandingHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photographerDetails } = useSelector((state) => state.photographer);
  const { userDetails } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [userProfile, setUserProfile] = useState(userDetails);
  const [photographerProfile, setPhotographerProfile] =
    useState(photographerDetails);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const userLogout = () => {
    dispatch(userRemoveDetails());
    localStorage.removeItem("user");
    setUserProfile();
    navigate("/");
  };

  const photographerLogout = () => {
    dispatch(removeDetails());
    setPhotographerProfile();
    localStorage.removeItem("photographer");
    navigate("/");
  };
  return (
    <div className="p-2 w-full sm:flex bg-gray-200 bg-opacity-60 fixed font-Lora z-30">
      {!toggle ? (
        <AiOutlineMenu
          size={20}
          className="absolute mt-1 right-5 border block sm:hidden"
          onClick={handleToggle}
        />
      ) : (
        <AiOutlineClose
          size={20}
          className="absolute mt-1 right-5 border block sm:hidden"
          onClick={handleToggle}
        />
      )}
      <div className="w-1/4 hidden sm:block mt-3">
        <div className="flex justify-around"></div>
      </div>
      <div className="sm:w-2/4 w-full sm:text-center text-start text-xl sm:text-3xl tracking-widested">
        FOCUSFUSION
      </div>
      <div
        className={`sm:w-1/4 w-full sm:mr-10 text-xs sm:text-base sm:text-end text-center sm:mt-4 underline sm:no-underline ${
          toggle || "hidden sm:block"
        }`}
      >
        {userProfile || photographerProfile ? (
          userProfile ? (
            <div className="flex justify-center sm:ml-56">
              <Dropdown label={userProfile.name} inline={true}>
                <Link to="/">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    HOME
                  </Dropdown.Item>
                </Link>
                <Link to="/profile">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    PROFILE
                  </Dropdown.Item>
                </Link>
                <Link to="/bookShoot">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    BOOK A SHOOT
                  </Dropdown.Item>
                </Link>
                <Link to="/bookings">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    BOOKINGS
                  </Dropdown.Item>
                </Link>
                <Link to="/list">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    PHOTOGRAPHERS
                  </Dropdown.Item>
                </Link>
                <Link to="/review">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    REVIEW
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item
                  className="bg-white text-black hover:bg-gray-700"
                  onClick={userLogout}
                >
                  LOG OUT
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <div className="flex sm:justify-end justify-center">
              <div className="-mt-3">
              <img className="bg-zinc-500 w-10 h-10 rounded-full mx-2 -pt-10" src={photographerDetails.logo?photographerDetails.logo:"https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt="logo" />
              </div>
              <Dropdown label={photographerDetails.companyName} inline={true}>
                <Link to="/">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    HOME
                  </Dropdown.Item>
                </Link>
                <Link to="/photographer/profile">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    PROFILE
                  </Dropdown.Item>
                </Link>
                <Link to="/photographer/displayProfile">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    DISPLAY PROFILE
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                  <Link to="/photographer/chat">CHAT</Link>
                </Dropdown.Item>
                <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                  <Link to="/photographer/bookings">BOOKINGS</Link>
                </Dropdown.Item>
                <Link to="/photographer/gallery">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    GALLERY
                  </Dropdown.Item>
                </Link>
                <Link to="/photographer/reviews">
                  <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                    REVIEWS
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item
                  className="bg-white text-black hover:bg-gray-700"
                  onClick={photographerLogout}
                >
                  LOG OUT
                </Dropdown.Item>
              </Dropdown>
            </div>
          )
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </div>
    </div>
  );
}

export default LandingHeader;
