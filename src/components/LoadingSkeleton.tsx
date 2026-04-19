export function HouseCardSkeleton() {
  return (
    <div className="house-card overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-36 mb-1.5" />
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-4 py-3">
        <div className="h-3 bg-gray-100 rounded w-16" />
      </div>
      <div className="flex border-t border-[var(--color-border)]">
        <div className="flex-1 py-3 bg-gray-50" />
        <div className="w-px bg-[var(--color-border)]" />
        <div className="flex-1 py-3 bg-white" />
      </div>
    </div>
  );
}

export function HouseListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3 px-4 pt-4">
      {Array.from({ length: count }).map((_, i) => (
        <HouseCardSkeleton key={i} />
      ))}
    </div>
  );
}
