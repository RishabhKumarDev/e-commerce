import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-40 bg-neutral-300 dark:bg-neutral-700" />
        <Skeleton className="h-4 w-64 bg-neutral-300 dark:bg-neutral-700" />
      </div>

      {/* Filters section */}
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-10 w-24 bg-neutral-300 dark:bg-neutral-700" />
        <Skeleton className="h-10 w-24 bg-neutral-300 dark:bg-neutral-700" />
        <Skeleton className="h-10 w-24 bg-neutral-300 dark:bg-neutral-700" />
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Product Image */}
            <Skeleton className="h-40 w-full rounded-md bg-neutral-300 dark:bg-neutral-700" />

            {/* Product Title */}
            <Skeleton className="h-4 w-3/4 bg-neutral-300 dark:bg-neutral-700" />

            {/* Product Price */}
            <Skeleton className="h-4 w-1/2 bg-neutral-300 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
