export const Avatar = ({ name }) => {
  return (
    <div className="w-8 h-8 relative rounded-full  flex items-center justify-center text-slate-700 bg-blue-300">
      <div className="text-center mb-2 w-full opacity-70">
        {name ? name[0] : "UN"}
      </div>
    </div>
  );
};
