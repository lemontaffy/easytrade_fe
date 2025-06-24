import RegisteredItems from "@/components/modals/RegisteredItems";
import { serverRequester } from "@/utils/serverRequester";
import dynamic from "next/dynamic";

// const Carousel = dynamic(() => import("@/components/modals/Carosel"), {
//   ssr: false,
// });

export default async function HomePage() {
  // const carouselRes = await serverRequester.get("api/carousel");
  const registeredRes = await serverRequester.get("/api/items");

  // const carouselItems = carouselRes.data;
  const registeredItems = registeredRes.data;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel (클라이언트 전용) */}
      {/* <div className="p-6 bg-white shadow-md">
        <Carousel items={carouselItems} />
      </div> */}

      {/* Registered Items (서버 렌더링 가능) */}
      <RegisteredItems items={registeredItems} />
    </div>
  );
}
