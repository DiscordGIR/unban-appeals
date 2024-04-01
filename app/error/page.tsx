"use client";
import { useSearchParams } from "next/navigation";

export default async function ErrorPage() {
  const searchParams = useSearchParams();
  
  // make alert
  return (
    <div className="bg-red-500 text-white p-4 rounded-md shadow-sm">
      {searchParams.get("message")}
    </div>
  );
}
