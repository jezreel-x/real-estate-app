{/* StatCard.jsx */}
export function StatCard({ title, value, icon: Icon, iconColor, iconBgColor, subtitle, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-14 h-14 rounded-full ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}