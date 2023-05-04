import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../instance/axios";
import { useSelector } from "react-redux";
import {toast} from "react-toastify"

function DisplayDetails() {
  const { photographerDetails } = useSelector((state) => state.photographer);
  const id = photographerDetails._id;
  const [category, setCategory] = useState([]);
  // const [details, setDetails] = useState({});

  const [values, setValues] = useState({
    location:"",
    category: "",
    owncategory: "",
    aboutUs: "",
  });

  // let data = {
  //   pId: id,
  //   pValues: values,
  // };

  const fetchData = async () => {
    await axios
      .get("/photographer/display-profile/"+id)
      .then((res) => {
        setValues(res.data.details);
        setCategory(res.data.listCategory);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit =async () => {
    try {
      await axios.put("/photographer/display-profile",{id,values}).then((res)=>{
        toast.success(res.data.message)
      }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-100 h-96 rounded-lg m-auto sm:mt-32 mx-5 font-Lora bg-gray-300">
      {/* <form onSubmit={handleSubmit}> */}
        <div className="flex justify-around items-center mt-10 text-lg">
          <div>
            <h1>Location</h1>
              <input
                // placeholder={details.location}
                value={values.location}
                className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
                type="text"
                name="location"
                onChange={(e) =>
                  setValues({ ...values, location: e.target.value })
                }
              />

          </div>
          <div>
            <h1>Specialized</h1>

              <select
                className="rounded-lg text-gray-700 mt-2 p-2 px-8 focus:bg-gray-200 focus:outline-none"
                name="category"
                onChange={(e) =>
                  setValues({ ...values, category: e.target.value })
                }
              >
                <option>{values.category? values.category:"Choose category"}</option>
                {category?.map((data) => {
                  return <option key={data._id}>{data.name}</option>;
                })}
              </select>

          </div>
          <div>
            <h1>Add your own category</h1>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
              type="text"
              name="owncategory"
              onChange={(e) =>
                setValues({ ...values, owncategory: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col justify-center mt-5 ml-32">
            <label>About Us</label>
              <textarea
              value={values.aboutUs}
                className="w-[930px] max-h-28 rounded-lg mt-2 p-2 outline-none"
                cols="30"
                rows="4"
                onChange={(e) =>
                  setValues({ ...values, aboutUs: e.target.value })
                }
              />

          </div>
        </div>
        <div className="flex justify-center font-Lora items-center mt-5">

            <button onClick={handleSubmit} className="px-5  py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              {values?"UPDATE":"ADD"}
            </button>
        </div>
      {/* </form> */}
    </div>
  );
}

export default DisplayDetails;
