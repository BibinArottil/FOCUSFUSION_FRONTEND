import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ViewReviewCard from "../../components/User/ViewReviewCard";
import axios from "../../instance/axios";

export default function ViewReview() {
  const { userDetails } = useSelector((state) => state.user);
  const [review, setReview] = useState([]);
  const id = userDetails._id;

  const fetchReview = async () => {
    await axios.get("/view-review/" + id).then((res) => {
      setReview(res.data.data);
    });
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="mt-14">
      {review.map((data, index) => {
        return <ViewReviewCard key={index} props={data} />;
      })}
    </div>
  );
}
