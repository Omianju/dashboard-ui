import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-[60vh] animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-muted/30 animate-pulse" />
        <Loader2
          className="absolute h-10 w-10 text-primary animate-spin"
          aria-hidden="true"
        />
      </div>

      <p className="mt-6 text-base font-semibold text-foreground">
        Loading content...
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Please wait while we prepare your data.
      </p>

      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
};

export default PageLoader;
