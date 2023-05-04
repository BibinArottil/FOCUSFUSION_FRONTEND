import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "flowbite-react";

function InitialImages() {
  const location = useLocation();
  const data = location.state;
  const image = data.data.initialImage;

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold font-Lora mt-5">
          {data.data.companyName}
        </h1>
      </div>
      <div className="grid md:grid-cols-3 grid-col p-3">
        {image.map((data, index) => {
          return (
            <div key={index} className="mx-2 my-2">
              <Card className="w-full p-2">
                <img
                  className="object-cover md:h-80 rounded"
                  src={data}
                  alt="photographerpics"
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InitialImages;
