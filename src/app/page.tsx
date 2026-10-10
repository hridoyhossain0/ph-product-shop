import AllProducts from "@/componants/HomePage/AllProducts";
import HeroSection from "@/componants/HomePage/HeroSection";
import ProductToolbar from "@/componants/HomePage/ProductToolbar";
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

// const API_URL = 'https://api.api-store.workers.dev/api/bazardor/products'
// const API_URL = 'https://api.abcz.workers.dev/api/bazardor/products'
const API_URL = 'https://openapi.programming-hero.com/api/bazardor/products'

const getProduct = async () => {
  const res = await fetch(API_URL)
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

    <div className="mt-10">

      <HeroSection />


      {/* upper percentage product */}
      <div className="container space-y-5 mx-auto my-15">
        <h1 className="text-3xl"><span className="text-[#008744]">▲</span> আজ দাম বেড়েছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {risers.map((product : ProductType & { netChange: number }) => <AllProducts key={product.id} product={product} />)}
        </div>
      </div>
      

      {/* lower percentage product */}
      <div className="container space-y-5 mx-auto my-15">
        <h1 className="text-3xl"><span className="text-[#008744]">▼</span> আজ দাম কমেছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {droper.map((product : ProductType & { netChange: number }) => <AllProducts key={product.id} product={product} />)}
        </div>
      </div>



      {/* all products */}
      <div
        id="allProduct" 
        className="container space-y-5 mx-auto my-15 scroll-mt-6">

        <ProductToolbar products={products} />
      </div>


    </div>

  );
}
