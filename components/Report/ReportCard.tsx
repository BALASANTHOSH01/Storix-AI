// src/components/ReportCard.tsx

const ReportCard = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default ReportCard;
  