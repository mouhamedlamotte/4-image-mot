import React from "react";

const Mockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative h-[700px] w-[360px] bg-slate-900  border-4 border-black rounded-2xl "
      style={{ boxShadow: "10px 10px 5px 12px rgb(209, 218, 218)" }}
    >
      <span className="absolute  right-[calc(50%-2rem)] border border-black bg-black w-16 h-4 mt-2 rounded-full"></span>
      <span className="absolute -right-1.5 top-20  border-2 border-black h-10 rounded-md"></span>
      <span className="absolute -left-1.5 top-16  border-2 border-black h-6 rounded-md"></span>
      <span className="absolute -left-1.5 top-32  border-2 border-black h-12 rounded-md"></span>
      <span className="absolute -left-1.5 top-48  border-2 border-black h-12 rounded-md"></span>
      <div className="w-full  h-[1.5rem] bg-slate-800 rounded-t-2xl">
      </div>
      {children}
    </div>
  );
};

export default Mockup;
