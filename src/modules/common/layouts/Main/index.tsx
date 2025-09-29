import { FC, ReactNode } from "react";

interface IParams {
  children?: ReactNode;
}

export const MainLayout: FC<IParams> = ({ children }) => {
  return <div className="bg-gray-200 min-h-screen p-6">{children}</div>;
};
