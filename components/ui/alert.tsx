"use client";

import { cn } from "@/lib/utils";

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant: "error" | "success";
};

const Alert = ({ children, variant }: Props) => {
  return (
    <div
      className={cn("p-4 rounded-sm text-white", {
        ["bg-red-500"]: variant === "error",
        ["bg-green-500"]: variant === "success",
      })}
    >
      <p>{children}</p>
    </div>
  );
};

export default Alert;
