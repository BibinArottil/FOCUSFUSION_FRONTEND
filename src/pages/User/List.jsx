import React, { useEffect, useState } from "react";
import ListCard from "../../components/Ui/ListCard";
// import Header from "../../components/User/ListHeader";
import SearchTab from "../../components/Ui/SearchTab";
import axios from "../../instance/axios";
import Footer from "../../components/Ui/Header";

function List() {
  const [data, setdata] = useState(null);
  const [filterText, setFilterText] = useState("");
  
  const fetchData = async () => {
    await axios.get("/list").then((res) => {
      setdata(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <SearchTab filterText={filterText} 
          onFilter={(e) => setFilterText(e.target.value)}
      />
      <div className="">
        {data?.filter(
            (item) =>
              item.category &&
              item.category.toLowerCase().includes(filterText.toLowerCase())
          ).map((value, i) => {
          return (
            <ListCard
              key={i}
              value={value}
              companyname={value.companyName}
              image={value.images[0]}
              location={value.location}
              category={value.category}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default List;
