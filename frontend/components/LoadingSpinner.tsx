export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-cyan-400 font-medium">Loading Aegis...</p>
      </div>
    </div>
  );
}
