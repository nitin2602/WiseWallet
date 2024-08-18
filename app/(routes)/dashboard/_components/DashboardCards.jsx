import React from "react";

function DashboardCards({symbol,emoji, title, value, icon }) {
  return (
    <div>
      <div className="relative w-auto  overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className=" flex justify-between items-center gap-10">
          <div>
            <div className="sm:flex sm:justify-between sm:gap-10">
              <h3 className="text-sm m-2 font-light text-gray-900 sm:text-sm">
             {title} {emoji}
              </h3>
            </div>
            <div>
              <h3 className=" font-semibold text-2xl">{symbol} {value}</h3>
            </div>
          </div>
          <div >{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
