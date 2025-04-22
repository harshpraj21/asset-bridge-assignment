import { User } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="p-4 border rounded shadow hover:bg-gray-50 transition duration-200">
      <h2 className="text-2xl font-semibold">{book.title}</h2>
      <p className="text-gray-700 flex items-center py-1">
        <User className="h-5 w-5 mr-1" />
        {book.author}
      </p>
      <p className="text-gray-600 font-medium">
        {book.genre} | {book.average_rating?.toFixed(1) ?? "N/A"} / 5
      </p>
      <p className="mt-2 text-yellow-600 font-medium">{book.published_year}</p>
    </div>
  );
}
