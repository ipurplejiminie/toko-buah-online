import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const buahData = [
  {
    id: 1,
    nama: "Apel Merah",
    deskripsi: "Apel segar berkualitas premium",
    harga: 25000,
    gambar: "/api/placeholder/200/200",
    stok: 50,
  },
  {
    id: 2,
    nama: "Pisang Cavendish",
    deskripsi: "Pisang manis dan lembut",
    harga: 30000,
    gambar: "/api/placeholder/200/200",
    stok: 100,
  },
  {
    id: 3,
    nama: "Jeruk Mandarin",
    deskripsi: "Jeruk segar dengan rasa manis",
    harga: 40000,
    gambar: "/api/placeholder/200/200",
    stok: 75,
  },
];

const DaftarProduk = () => {
  const [keranjang, setKeranjang] = useState([]);

  const tambahKeKeranjang = (produk) => {
    const produkDiKeranjang = keranjang.find((item) => item.id === produk.id);

    if (produkDiKeranjang) {
      setKeranjang(
        keranjang.map((item) =>
          item.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      );
    } else {
      setKeranjang([...keranjang, { ...produk, jumlah: 1 }]);
    }
  };

  const kurangiDariKeranjang = (produkId) => {
    const produkDiKeranjang = keranjang.find((item) => item.id === produkId);

    if (produkDiKeranjang.jumlah === 1) {
      setKeranjang(keranjang.filter((item) => item.id !== produkId));
    } else {
      setKeranjang(
        keranjang.map((item) =>
          item.id === produkId ? { ...item, jumlah: item.jumlah - 1 } : item
        )
      );
    }
  };

  const hitungTotal = () => {
    return keranjang.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Toko Buah Online</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {buahData.map((buah) => (
          <div key={buah.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={buah.gambar}
              alt={buah.nama}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{buah.nama}</h2>
            <p className="text-gray-600 mb-2">{buah.deskripsi}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">
                Rp {buah.harga.toLocaleString()}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => kurangiDariKeranjang(buah.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <Minus size={16} />
                </button>
                <span>
                  {keranjang.find((item) => item.id === buah.id)?.jumlah || 0}
                </span>
                <button
                  onClick={() => tambahKeKeranjang(buah)}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Keranjang */}
      {keranjang.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>
          {keranjang.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{item.nama}</span>
              <span>
                {item.jumlah} x Rp {item.harga.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="font-bold text-xl mt-4">
            Total: Rp {hitungTotal().toLocaleString()}
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Lanjut ke Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default DaftarProduk;
