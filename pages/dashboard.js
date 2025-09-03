import { useEffect, useState } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link';

export default function DashboardPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logRef = ref(database, 'worklogs');
    onValue(logRef, (snapshot) => {
      const data = snapshot.val();
      const entries = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setLogs(entries);
    });
  }, []);

  function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
  }

  return (
    <main className="min-h-screen bg-[#f9f9f6] p-8">
      <Link href="/">
        <button className="mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
          ⬅ Home
        </button>
      </Link>

      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Work Log Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start</th>
              <th className="px-4 py-2 text-left">End</th>
              <th className="px-4 py-2 text-left">Hours</th>
              <th className="px-4 py-2 text-left">Rate (€)</th>
              <th className="px-4 py-2 text-left">Earning (€)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-black">{log.date}</td>
                <td className="px-4 py-2 text-black">{formatTime(log.startTime)}</td>
                <td className="px-4 py-2 text-black">{formatTime(log.endTime)}</td>
                <td className="px-4 py-2 text-black">{log.totalHours}</td>
                <td className="px-4 py-2 text-black">{log.rate}</td>
                <td className="px-4 py-2 font-semibold text-green-700">{log.earning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}