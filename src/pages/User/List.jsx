import React, { useEffect, useState } from "react";
import ListCard from "../../components/Ui/ListCard";
import Pagination from "../../components/Ui/Pagination";
import SearchTab from "../../components/Ui/SearchTab";
import axios from "../../instance/axios";

function List() {
  const [data, setdata] = useState();
  const [page, setPage] = useState(1)
  const [filterText, setFilterText] = useState("");
  
  const fetchData = async () => {
    await axios.get(`/list?page=${page}&search=${filterText}`).then((res) => {
      setdata(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [page,filterText]);

  return (
    <div className="flex flex-col">
      <SearchTab filterText={filterText} 
          onFilter={(e) => setFilterText(e.target.value)}
      />
      <>
        {data?.listData?.map((value, i) => {
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
      </>
      <Pagination
       page={page}
       limit={data?.limit?data?.limit:0}
       total={data?.total?data?.total:0}
       setPage={(page)=>setPage(page)}
       />
    </div>
  );
}

export default List;
