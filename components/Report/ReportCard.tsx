"use client"

const ReportCard = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="p-4 dark:bg-[#121212] border-slate-500 shadow rounded">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default ReportCard;
  