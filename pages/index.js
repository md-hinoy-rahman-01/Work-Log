import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f9f9f6] flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md text-center space-y-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-500">Welcome to Work-Log 👋</h1>
        <p className="text-gray-600">Choose what you'd like to do:</p>

        <div className="space-y-4">
          <Link href="/log">
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Log Work
            </button>
          </Link>

          <div className="h-2" />

          <Link href="/dashboard">
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              View Dashboard
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}