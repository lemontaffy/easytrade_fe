"use client";

import requester from "@/utils/requester";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DetailItem {
  detailName: string;
  price: string;
  leftovers: string;
  maxBuyCount: string;
  preview?: string;
  detailImageUrl: string;
}

interface MainItem {
  title: string;
  thumbnailUrl: string;
  tags: string;
  salesStartDate: string;
  salesEndDate: string;
  deliveryFee: string;
  productBoard: string;
}

export default function ItemDetailPage() {
  const { id } = useParams(); // /items/[id] 라우트에서 ID 추출
  const [mainItem, setMainItem] = useState<MainItem | null>(null);
  const [detailItems, setDetailItems] = useState<DetailItem[]>([]);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const res = await requester?.get(`/api/items/${id}`);
        console.log(res);
        const data = res?.data;

        setMainItem(data.item);
        setDetailItems(data.detailItems);
      } catch (err) {
        console.error("Failed to fetch item detail:", err);
      }
    };

    if (id) fetchItemDetail();
  }, [id]);

  if (!mainItem) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {mainItem.title}
      </h2>

      {/* Thumbnail */}
      <div className="mb-6">
        <img
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT_LOCAL}/${mainItem.thumbnailUrl}`}
          alt="Thumbnail"
          className="w-full max-h-64 object-cover rounded-lg"
        />
      </div>

      {/* Period */}
      <p className="text-gray-600 mb-2">
        판매기간: {mainItem.salesStartDate} ~ {mainItem.salesEndDate}
      </p>

      <p className="text-gray-600 mb-4">
        배송비:
        {Array.isArray(mainItem.deliveryFee)
          ? mainItem.deliveryFee.map((fee, i) => (
            <span key={i}>
              {fee.method} {fee.fee.toLocaleString()}원{i < mainItem.deliveryFee.length - 1 ? ', ' : ''}
            </span>
          ))
          : "0원"}
      </p>

      {/* Product Board (HTML) */}
      <div
        className="prose max-w-none border p-4 mb-6"
        dangerouslySetInnerHTML={{ __html: mainItem.productBoard }}
      />

      {/* Detail Items */}
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Detail Items</h3>
      <div className="grid gap-4">
        {detailItems.map((item, idx) => (
          <div key={idx} className="border rounded p-4 shadow-sm">
            {item.detailImageUrl && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT_LOCAL}/${item.detailImageUrl}`}
                alt="detail"
                className="h-40 w-full object-cover mb-2 rounded"
              />
            )}
            <p className="font-bold">{item.detailName}</p>
            <p>가격: {item.price}원</p>
            <p>재고: {item.leftovers}</p>
            <p>1인 최대 구매수량: {item.maxBuyCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
