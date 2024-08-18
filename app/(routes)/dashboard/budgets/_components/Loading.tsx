import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <div className=" m-5 flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default Loading;
