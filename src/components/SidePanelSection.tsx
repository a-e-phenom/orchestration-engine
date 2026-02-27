interface SidePanelSectionProps {
  title: string;
}

const SidePanelSection = ({ title }: SidePanelSectionProps) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  );
};

export default SidePanelSection;
