export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-red-600">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <a href="/" className="text-blue-500 underline">Return to Home</a>
    </div>
  );
}
