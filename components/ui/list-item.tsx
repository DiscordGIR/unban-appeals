import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ListItem = ({ children }: Props) => {
  return <li className="list-inside list-disc">{children}</li>;
};

export default ListItem;
