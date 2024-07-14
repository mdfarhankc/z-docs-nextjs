import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
