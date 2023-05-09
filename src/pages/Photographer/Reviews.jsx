import axios from "../../instance/axios";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component"
// import Table from "../../components/Ui/Table";
import { useSelector } from "react-redux";

export default function Reviews() {
const {photographerDetails} = useSelector((state)=>state.photographer)
const id = photographerDetails._id

    const fetchReview=async()=>{
        await axios.get("/photographer/reviews/"+id).then((res)=>{
            
        })
    }

    useEffect(()=>{
        fetchReview()
    },[])
    
    const thirdExample = {
        size: 20,
        count: 5,
        isHalf: false,
        value: 4,
        color: "grey",
        edit:false,
        activeColor: "gold",
      };

  return (
    <div className="flex justify-center mt-16">
        <div className="flex w-full justify-between max-w-[1000px] my-5 border rounded-md p-3">
      <div className="flex">
        {/* <img className="w-10 h-10 object-cover border rounded-full" src={data.user.image?data.user.image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" /> */}
        <img className="w-10 h-10 object-cover border rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" />
        <div className="flex flex-col">
          {/* <h2 className="ml-5 text-xl">{data.user.name}</h2> */}
          <h2 className="ml-5 text-xl">Bibin</h2>
            <ReactStars classNames="ml-5" {...thirdExample} />
            <p className="ml-5 mt-2">It was a nice experience</p>
        </div>
      </div>
      <div>
        <p className="text-xs">19-73-3920</p>
        <button className="text-sm bg-gray-300 px-3 py-1 rounded mt-5 font-bold">Reply</button>
      </div>
    </div>
    </div>
  );
}
