

export default function CategoryCardsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Category Banner Card Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100/90 p-6 sm:p-8 flex items-center space-x-5 shadow-xs mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0"></div>
        <div className="space-y-2.5 flex-1">
          <div className="h-7 bg-gray-400 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-400 rounded-md w-1/4"></div>
        </div>
      </div>

      {/* Sort Bar Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100/90 p-4 mb-6 flex items-center justify-end shadow-xs">
        <div className="h-9 bg-gray-400 rounded-lg w-40"></div>
      </div>

      {/* Product Count Label Skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-400 rounded-md w-32"></div>
      </div>

      {/* Product Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-36"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-400 rounded-xl shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-400 rounded-md w-3/4"></div>
                <div className="h-3 bg-gray-400 rounded-md w-1/2"></div>
              </div>
            </div>

            <div className="flex items-end justify-between pt-3 border-t border-gray-50">
              <div className="space-y-1.5">
                <div className="h-3 bg-gray-400 rounded-md w-16"></div>
                <div className="h-5 bg-gray-400 rounded-md w-20"></div>
              </div>
              <div className="h-6 bg-gray-400 rounded-md w-14"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}