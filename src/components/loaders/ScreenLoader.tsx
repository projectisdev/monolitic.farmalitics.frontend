import { toAbsoluteUrl } from '@/utils';

const ScreenLoader = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center fixed inset-0 z-50 bg-light transition-opacity duration-700 ease-in-out">
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="animate-spin rounded-full h-8 w-8 border-4 border-success border-t-transparent"></span>
      </div>
    </div>
  );
};

export { ScreenLoader };
