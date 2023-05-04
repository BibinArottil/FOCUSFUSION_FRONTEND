import ReactStars from "react-rating-stars-component"
export default function ReviewModal({ visible,onClose}) {

  const thirdExample = {
    size: 40,
    count: 7,
    isHalf: false,
    value: 4,
    color: "blue",
    activeColor: "red",
    onChange: newValue => {
      console.log(`Example 3: new value is ${newValue}`);
    }
  };

    if(!visible ) return null
    
  return (
<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
        <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
          Share your experience
        </h1>
        <button className="font-semibold mr-3 mb-8 text-xl" 
        onClick={onClose}
        >X</button>
        </div> 
        <div className="flex flex-col  p-5">
          <input
            type="text"
            name="text"
            className="border border-gray-700 p-2 rounded mb-5"
            // onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
          />
        </div>
        <div className="text-center p-5">
          <button className="px-5 py-2 bg-gray-700 text-white rounded"
        //   onClick={()=>handleClick()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
