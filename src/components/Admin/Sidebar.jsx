import React from "react";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdAddAPhoto } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaTicketAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    {
      name: "Photographers",
      link: "/admin/photographers/request",
      icon: MdAddAPhoto,
    },
    { name: "Users", link: "/admin/users/list", icon: HiUsers },
    { name: "Banner", link: "/admin/banner", icon: FaTicketAlt },
    { name: "Category", link: "/admin/category", icon: BiCategory },
    // { name: "Review", link: "", icon: MdReviews },
    { name: "Works", link: "/admin/works", icon: BsPersonWorkspace },
    { name: "Sales", link: "/admin/sales", icon: TbReportSearch },
  ];

  const [open, setOpen] = useState(true);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setOpen(false);
      }
      if (window.innerWidth > 640) {
        setOpen(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <section className="flex">
      <div
        className={`bg-gray-900 min-h-screen ${
          open ? "w-2/10" : "w-16"
        } duration-500 text-gray-100 px-4 `}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-5 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className=" group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-teal-800 rounded-2xl"
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 z-10 bg-white font-semibold whitespace-pre text-gray-900 rounded-2xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1
                group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>

        {open ? (
          <button
            onClick={() => logout()}
            className="items-center text-red-600 gap-3.5 mt-4 font-semibold p-2"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => logout()}
            className="text-2xl text-red-600 mt-4"
          >
            <BiLogOut />
          </button>
        )}
      </div>
    </section>
  );
};

export default AdminNavbar;
