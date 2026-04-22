export default function CaseCard({ title, price, img }) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-xl hover:scale-105 transition cursor-pointer">
      <img src={img} className="w-full h-32 object-contain" />

      <h3 className="mt-3">{title}</h3>

      <div className="flex justify-between mt-2">
        <span className="text-purple-400">${price}</span>
        <button className="bg-purple-600 px-3 py-1 rounded">Open</button>
      </div>
    </div>
  );
}
