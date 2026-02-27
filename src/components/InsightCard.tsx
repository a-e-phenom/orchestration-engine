interface InsightCardProps {
  title: string;
  count: number;
  description: string;
  recommendation: string;
  recommendationLink: string;
  primaryAction: string;
  secondaryAction: string;
}

const InsightCard = ({
  title,
  count,
  description,
  recommendation,
  recommendationLink,
  primaryAction,
  secondaryAction,
}: InsightCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-md font-medium text-gray-900">{title}</h3>
        <span className="px-1.5 py-0.5 rounded-md text-xs bg-orange-100 text-orange-700">
          {count}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-2">
        {description}
      </p>
      <p className="text-indigo-600 text-sm mb-3">
        Recommendation: <span className=" cursor-pointer">{recommendationLink}</span>
      </p>
      <div className="flex gap-3">
  {/* Primary */}
  <div className="rounded-full p-[1px] bg-gradient-to-r from-teal-400 to-indigo-500">
    <button className="px-3 py-1.5 rounded-full bg-white text-gray-900 text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap">
      {primaryAction}
    </button>
  </div>

  {/* Secondary */}
  <div className="rounded-full p-[1px] bg-gradient-to-r from-teal-400 to-indigo-500">
    <button className="px-3 py-1.5 rounded-full bg-white text-gray-900 text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap">
      {secondaryAction}
    </button>
  </div>
</div>
    </div>
  );
};

export default InsightCard;
