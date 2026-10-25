

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-50/30 animate-pulse">
      {/* 1. Header Skeleton */}
      <header className="border-b border-gray-100 bg-white py-3.5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
            <div className="space-y-1.5">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 bg-gray-200 rounded-xl w-20"></div>
            <div className="h-9 bg-gray-200 rounded-xl w-24"></div>
          </div>
        </div>
      </header>

      {/* 2. Marquee Ticker Skeleton */}
      <div className="bg-white border-b border-gray-100 py-2.5 overflow-hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-8 px-3 sm:px-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NavLinks Category Bar Skeleton */}
      <div className="border-b border-gray-100 bg-white py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 overflow-hidden px-3 sm:px-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg shrink-0">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="space-y-10 pb-16">
        {/* 4. Hero Section Skeleton */}
        <div className="mx-auto my-6 max-w-6xl px-3 sm:px-4 lg:px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl w-full">
              <div className="h-6 bg-gray-200 rounded-full w-32"></div>
              <div className="h-9 bg-gray-200 rounded-xl w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl w-32 mt-2"></div>
            </div>
            <div className="w-72 h-48 bg-gray-200 rounded-2xl shrink-0"></div>
          </div>
        </div>

        {/* 5. AllProducts & ProductCards Section Skeleton */}
        <section className="mx-auto max-w-6xl space-y-12 px-3 sm:px-4 lg:px-6">
          
          {/* Section A: আজ দাম বেড়েছে */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between h-32">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between pt-3 border-t border-gray-50">
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-14"></div>
                      <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: আজ দাম কমেছে */}
          <div>
            <div className="h-7 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between h-32">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between pt-3 border-t border-gray-50">
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-14"></div>
                      <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: সব পণ্য */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="space-y-2">
                <div className="h-7 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
              <div className="h-9 bg-gray-200 rounded-lg w-36"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between h-32">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between pt-3 border-t border-gray-50">
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-14"></div>
                      <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
