"use client"

const ReportCard = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="p-4 dark:bg-[#121212] border-slate-500 shadow rounded">
        <h3 className="text-slate-500 font-semibold py-2">{title}</h3>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default ReportCard;
  