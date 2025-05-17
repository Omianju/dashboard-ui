
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[140px]" />
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/30 p-4">
          <div className="grid grid-cols-6 gap-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 col-span-2" />
            <Skeleton className="h-5 hidden sm:block" />
            <Skeleton className="h-5 hidden md:block" />
            <Skeleton className="h-5 hidden lg:block" />
          </div>
        </div>
        
        {Array(rows).fill(0).map((_, i) => (
          <div key={i} className="border-t p-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 col-span-2" />
              <Skeleton className="h-5 hidden sm:block" />
              <Skeleton className="h-5 hidden md:block" />
              <Skeleton className="h-8 w-full lg:w-24 col-span-2 lg:col-span-1" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <Skeleton className="h-5 w-[120px]" />
        <Skeleton className="h-9 w-[160px]" />
      </div>
    </div>
  );
};

export default TableSkeleton;
