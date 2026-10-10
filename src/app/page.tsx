import AllProducts from "@/componants/HomePage/AllProducts";
import HeroSection from "@/componants/HomePage/HeroSection";
import { Suspense } from "react";


export interface ProductType {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string
  unit: string
  image: string
  today: number
  yesterday: number
  lastWeek: number
  lastMonth: number
  change: Change
  markets: Market[]
}

export interface Change {
  dir: string
  pct: number
}

export interface Market {
  market: string
  division: string
  min: number
  max: number
}



const getProduct = async () => {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')
  const data = res.json()
  return data

}


export default async function Home() {
  const products = await getProduct()

  const totalProductsBn = new Intl.NumberFormat('bn-BD').format(products.length);
  const filterUpProduct = products.filter((product : ProductType) => product.change.dir === 'up')
  const filterDownProduct = products.filter((product : ProductType)=> product.change.dir === 'down')


  const risers = filterUpProduct
    .map((product : ProductType)  => {
      let netChange = 0;
      if (product.change?.dir === "up") netChange = product.change.pct;
      if (product.change?.dir === "down") netChange = -product.change.pct;
      return { ...product, netChange };
    })
    .sort((a : ProductType & { netChange: number }, b : ProductType & { netChange: number }) => b.netChange - a.netChange)
    .slice(0, 6);

  const droper = filterDownProduct
    .map((product : ProductType)  => {
      let netChange = 0;
      if (product.change?.dir === "up") netChange = product.change.pct;
      if (product.change?.dir === "down") netChange = -product.change.pct;
      return { ...product, netChange };
    })
    .sort((a : ProductType & { netChange: number }, b : ProductType & { netChange: number })  => b.netChange  - a.netChange )
    .slice(0, 6);
  return (

    <div>
      <HeroSection />

      <div className="container space-y-4 mx-auto my-10">
        <h1 className="text-4xl">▲ আজ দাম বেড়েছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {risers.map((product : ProductType & { netChange: number }) => <AllProducts key={product.id} product={product} />)}
        </div>
      </div>
      
      <div className="container space-y-4 mx-auto my-10">
        <h1 className="text-4xl">▼ আজ দাম কমেছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {droper.map((product : ProductType & { netChange: number }) => <AllProducts key={product.id} product={product} />)}
        </div>
      </div>

      <div className="container space-y-4 mx-auto my-10">
        <h1 className="text-4xl ">সব পণ্য</h1>
        <p>মোট {totalProductsBn}টি পণ্য দেখানো হচ্ছে</p>
        <Suspense fallback={'loading..'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
            {products.map((product : ProductType & { netChange: number }) => <AllProducts key={product.id} product={product} />)}
          </div>
        </Suspense>
      </div>


    </div>

  );
}
