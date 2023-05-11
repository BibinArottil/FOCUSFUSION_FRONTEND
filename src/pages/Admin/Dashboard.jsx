import { useEffect, useState } from "react"
import Card from "../../components/Admin/Card"
import PieChart from "../../components/Admin/PieChart"
import axios from "../../instance/axios"

export default function Dashboard() {
    const [data, setData] = useState({})

    const fetchData=async()=>{
        await axios.get("/admin/dashboard").then((res)=>{
            setData(res.data)
        })
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className="w-full">
        <div className="flex flex-col px-20 py-5">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
        <Card props={data}/>
        <div className="w-full flex justify-center">
        <PieChart props={data}/>
        </div>
    </div>
  )
}
