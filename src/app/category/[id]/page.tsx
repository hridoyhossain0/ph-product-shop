import { notFound } from 'next/navigation';
import type { ProductType } from '@/types/product';
import CategoryProducts from './CategoryProducts';

const API_URL =
    'https://api.abcz.workers.dev/api/bazardor/products';

async function getCategories(id: string): Promise<ProductType[]> {
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

    return data.filter((product) => product.category === id);
}

export default async function CategoryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products = await getCategories(id);

    if (products.length === 0) {
        notFound();
    }

    const category = products[0];

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-6xl">

                {/* Category header */}
                <div className="mb-6 flex items-center gap-5 rounded-2xl border border-gray-200 bg-[#fcfdfe] p-5 sm:p-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center text-4xl">
                        {category.categoryIcon || '📦'}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {category.categoryNameBn}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {new Intl.NumberFormat('bn-BD').format(
                                products.length
                            )}
                            টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>
                

                <CategoryProducts products={products} />
            </div>
        </main>
    );
}