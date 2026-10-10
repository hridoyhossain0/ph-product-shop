import { ProductType } from '@/types/product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RiArrowRightSLine } from 'react-icons/ri';

// const API_URL = 'https://api.api-store.workers.dev/api/bazardor/products';
// const API_URL = 'https://api.abcz.workers.dev/api/bazardor/products';
const API_URL = 'https://openapi.programming-hero.com/api/bazardor/products';

async function getProduct(id: string): Promise<ProductType | null> {
    const response = await fetch(API_URL, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('পণ্যের তথ্য লোড করা যায়নি');
    }

    const data: ProductType[] = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('API থেকে সঠিক পণ্যের তথ্য পাওয়া যায়নি');
    }

    return data.find((product) => String(product.id) === id) ?? null;
}

function toBengaliNumber(value: number | string): string {
    return new Intl.NumberFormat('bn-BD').format(Number(value));
}

function translateUnit(unit: string): string {
    const unitMap: Record<string, string> = {
        kg: 'কেজি',
        litre: 'লিটার',
        liter: 'লিটার',
        piece: 'পিস',
        pcs: 'পিস',
        pc: 'টি',
        dozen: 'ডজন',
        gm: 'গ্রাম',
        gram: 'গ্রাম',
    };

    return unitMap[unit.toLowerCase().trim()] ?? unit;
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const isUp = product.change?.dir === 'up';
    const isDown = product.change?.dir === 'down';
    const isFlat = product.change?.dir === 'flat';

    const changePercentage = toBengaliNumber(
        Math.abs(product.change?.pct ?? 0).toFixed(1)
    );

    const markets = product.markets ?? [];

    const absoluteMin =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : 0;

    const absoluteMax =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : 0;

    const averagePrice =
        markets.length > 0
            ? Math.round(
                markets.reduce(
                    (total, market) =>
                        total + (market.min + market.max) / 2,
                    0
                ) / markets.length
            )
            : 0;

    const unit = translateUnit(product.unit);

    return (
        <main className="min-h-screen bg-[#f7f9f6] p-4 text-gray-800 md:p-6">
            <div className="mx-auto w-full max-w-6xl">

                {/* Breadcrumb */}
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <Link href="/" className="hover:text-emerald-600">
                        হোম
                    </Link>
                    <span><RiArrowRightSLine /></span>
                    <Link href={`/category/${product.category}`}><span>{product.categoryNameBn}</span></Link>
                    <span><RiArrowRightSLine /></span>
                    <span className="font-semibold text-gray-700">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Product header */}
                <section className="mb-6 flex flex-col items-start justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
                    <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-[#f4f7f4] text-3xl shadow-inner">
                            {product.categoryIcon || '📦'}
                        </div>

                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-gray-950 md:text-3xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-sm font-semibold text-gray-400">
                                প্রতি {unit}
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                গতকালের তুলনায় আজ দাম{' '}
                                <span
                                    className={
                                        isUp
                                            ? 'font-bold text-red-500'
                                            : isDown
                                                ? 'font-bold text-emerald-600'
                                                : 'font-bold text-gray-500'
                                    }
                                >
                                    {isUp
                                        ? 'বেড়েছে'
                                        : isDown
                                            ? 'কমেছে'
                                            : 'অপরিবর্তিত'}{' '}
                                    {changePercentage}%
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#fafbfa] px-8 py-4 text-center shadow-sm md:w-auto">
                        <span className="text-xs font-bold text-gray-400">
                            আজকের দাম
                        </span>

                        <span className="mt-1 text-3xl font-black text-gray-950">
                            {toBengaliNumber(product.today)}
                        </span>

                        <span className="mt-1 text-xs font-bold text-gray-400">
                            টাকা / {unit}
                        </span>

                        <span
                            className={`mt-2 flex items-center gap-1 text-xs font-black ${isUp
                                    ? 'text-red-500'
                                    : isDown
                                        ? 'text-emerald-600'
                                        : 'text-gray-500'
                                }`}
                        >
                            <span>
                                {isUp ? '▲' : isDown ? '▼' : '—'}
                            </span>
                            {changePercentage}%
                        </span>
                    </div>
                </section>

                {/* Price summary */}
                <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-black text-gray-950">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <SummaryCard
                            title="সর্বনিম্ন দাম"
                            price={absoluteMin}
                            color="text-emerald-600"
                            unit={unit}
                        />

                        <SummaryCard
                            title="সর্বাধিক দাম"
                            price={absoluteMax}
                            color="text-red-500"
                            unit={unit}
                        />

                        <SummaryCard
                            title="গড় দাম"
                            price={averagePrice}
                            color="text-emerald-600"
                            unit={unit}
                        />
                    </div>
                </section>

                {/* Market table */}
                <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-black text-gray-950">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {markets.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-400">
                                        <th className="px-4 py-3">বাজার</th>
                                        <th className="px-4 py-3">বিভাগ</th>
                                        <th className="px-4 py-3 text-center">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            সর্বাধিক
                                        </th>
                                        <th className="px-4 py-3 text-center">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                                    {markets.map((market, index) => {
                                        const marketAverage = Math.round(
                                            (market.min + market.max) / 2
                                        );

                                        return (
                                            <tr
                                                key={`${market.market}-${index}`}
                                                className="transition-colors hover:bg-slate-50"
                                            >
                                                <td className="px-4 py-4 font-bold text-gray-950">
                                                    {market.market}
                                                </td>

                                                <td className="px-4 py-4 text-gray-400">
                                                    {market.division}
                                                </td>

                                                <td className="px-4 py-4 text-center font-bold">
                                                    {toBengaliNumber(market.min)} টাকা
                                                </td>

                                                <td className="px-4 py-4 text-center font-bold">
                                                    {toBengaliNumber(market.max)} টাকা
                                                </td>

                                                <td className="px-4 py-4 text-center font-black text-gray-950">
                                                    {toBengaliNumber(marketAverage)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="py-8 text-center text-sm text-gray-500">
                            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}

function SummaryCard({
    title,
    price,
    color,
    unit,
}: {
    title: string;
    price: number;
    color: string;
    unit: string;
}) {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-[#fcfdfc] p-5">
            <div>
                <span className="block text-xs font-bold text-gray-400">
                    {title}
                </span>

                <span className={`mt-1 block text-2xl font-black ${color}`}>
                    {new Intl.NumberFormat('bn-BD').format(price)} টাকা
                </span>
            </div>

            <span className="mt-4 block text-xs text-gray-400">
                প্রতি {unit}-এর হিসাবে
            </span>
        </div>
    );
}