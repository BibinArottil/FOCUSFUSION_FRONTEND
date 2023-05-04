import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Dropdown } from "flowbite-react";
import {useDispatch,useSelector} from "react-redux"
import {removeDetails} from "../../redux/features/photographer"

function LandingHeader() {
  const dispatch = useDispatch()
  const {photographerDetails} = useSelector((state)=>state.photographer)
  const [toggle, settoggle] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [photographerProfile, setphotographerProfile] = useState(photographerDetails)

  const handleToggle = () => {
    settoggle(!toggle);
  };

  const logout = () =>{
    dispatch(removeDetails())
    setphotographerProfile()
    localStorage.removeItem("photographer")
  }
  return (
    <div>
      <div className="p-2 w-full sm:flex bg-gray-200 opacity-60 fixed font-Lora">
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
          <div className="flex justify-around">
            <div className="text-end">
              { photographerProfile ? (
                      <div className="flex justify-center">
                      <Dropdown label="BRIDE WEDDING" inline={true}>
                        <Dropdown.Item className="bg-white text-black hover:bg-gray-700">
                          <Link to="/photographer/profile">
                          PROFILE
                          </Link>
                          </Dropdown.Item>
                        <Dropdown.Item className="bg-white text-black hover:bg-gray-700" onClick={logout}>LOG OUT</Dropdown.Item>
                      </Dropdown>
                      </div>
                ) : (
              <Link to="/photographer/register">PHOTOGRAPHER REG/LOGIN</Link>
                )}
            </div>
            <div>
              <Link to="/list">LIST</Link>
            </div>
          </div>
        </div>
        <div className="sm:w-2/4 w-full sm:text-center text-start text-xl sm:text-3xl tracking-widested">
          FOCUSFUSION
        </div>
        <div className="block sm:hidden">
          {/* {!toggle ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />} */}
          {toggle && (
            <div className={`sm:w-1/4 w-full ${toggle || "hidden sm:block"}`}>
              <div className="sm:flex justify-around">
                <div className="text-center pt-2 underline text-xs">
                  <Link to="/photographer/register">PHOTOGRAPHER REG/LOGIN</Link>
                </div>
                <div className="text-center p-1 underline text-xs">
                  <Link>LIST</Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`sm:w-1/4 w-full sm:mr-10 text-xs sm:text-base sm:text-end text-center sm:mt-4 underline sm:no-underline ${
            toggle || "hidden sm:block"
          }`}
        >
          {userProfile ? (
            <div className="flex justify-center sm:ml-52">
            <Dropdown label="JIJIN" inline={true}>
              <Dropdown.Item >PROFILE</Dropdown.Item>
              <Dropdown.Item>LOG OUT</Dropdown.Item>
            </Dropdown>
            </div>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingHeader;
