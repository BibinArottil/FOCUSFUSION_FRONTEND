import { useState } from "react";
import ReactStars from "react-rating-stars-component"
import ReplyModal from "./ReplyModal";

export default function Reviews({props}) {

    const [modal, setModal] = useState(false)
  const handleOnClose = () => setModal(false);


    const thirdExample = {
        size: 20,
        count: 5,
        isHalf: false,
        value: props.rating,
        color: "grey",
        edit:false,
        activeColor: "gold",
      };

  return (
          <div className="flex justify-center">
              <div className="flex w-full justify-between max-w-[1000px] mt-5 border rounded-md p-3">
            <div className="flex">
              <img className="w-10 h-10 object-cover border rounded-full" src={props.user.image?props.user.image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" />
              <div className="flex flex-col">
                <h2 className="ml-5 text-xl">{props.user.name}</h2>
                  <ReactStars classNames="ml-5" {...thirdExample} />
                  <p className="ml-5 mt-2">{props.review}</p>
                    {props.reply?
                  <p className="ml-5 mt-3 font-bold">
                    Response from the owner:<span className="font-normal">{props.reply}</span>
                    </p>:null
                    }
              </div>
            </div>
            <div>
              <p className="text-xs">{props.createdAt.split("T", [1])}</p>
              <button onClick={()=>setModal(true)} className="text-sm bg-gray-300 px-3 py-1 rounded mt-5 font-bold">{props.reply?"Edit":"Reply"}</button>
            </div>
          </div>
          <ReplyModal visible={modal} onClose={handleOnClose} data={props}/>
          </div>
  )
}


