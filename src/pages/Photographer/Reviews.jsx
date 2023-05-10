import axios from "../../instance/axios";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import ReviewCard from "../../components/Photographer/Reviews";

export default function Reviews() {
  const { photographerDetails } = useSelector((state) => state.photographer);
  const [review, setReview] = useState([]);
  const id = photographerDetails._id;

  const fetchReview = async () => {
    await axios.get("/photographer/reviews/" + id).then((res) => {
      setReview(res.data.data);
    });
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="mt-14">
      {review?.map((data, index) => {
        return <ReviewCard key={index} props={data} />;
      })}
    </div>
  );
}
