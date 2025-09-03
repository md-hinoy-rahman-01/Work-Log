import { useState } from 'react';
import { database } from '../lib/firebase';
import { ref, push } from 'firebase/database';
import Link from 'next/link';

export default function LogPage() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end <= start) {
      alert('End time must be after start time.');
      return;
    }

    const totalHours = ((end - start) / (1000 * 60 * 60)).toFixed(2);
    const earning = (totalHours * parseFloat(rate)).toFixed(2);

    const logRef = ref(database, 'worklogs');
    await push(logRef, {
      date,
      startTime,
      endTime,
      totalHours,
      rate: parseFloat(rate),
      earning: parseFloat(earning),
    });

    alert('Work log saved!');
    setDate('');
    setStartTime('');
    setEndTime('');
    setRate('');
  };

  return (
    <main className="min-h-screen bg-[#f9f9f6] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <Link href="/">
          <button className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
            ⬅ Home
          </button>
        </Link>

        <h1 className="text-2xl font-bold text-gray-700 mb-4">Log Your Work</h1>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Rate per Hour (€)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}