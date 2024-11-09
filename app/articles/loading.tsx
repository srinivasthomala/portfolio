export default function Loading() {
  return (
    <div className="max-w-[45rem] mx-auto px-4 sm:px-8 pt-28 sm:pt-36">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 w-[250px] mb-8" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full" />
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-[90%]" />
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-[80%]" />
        </div>
      </div>
    </div>
  );
}
