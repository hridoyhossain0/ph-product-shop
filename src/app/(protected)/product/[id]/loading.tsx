export default function Loading() {
    return (
        <div className="min-h-screen bg-[#f7f9f6] p-6">
            <div className="mx-auto max-w-6xl animate-pulse space-y-6">
                {/* Breadcrumb skeleton */}
                <div className="h-4 w-40 rounded bg-gray-200" />

                {/* Product header skeleton */}
                <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-200" />
                        <div className="space-y-3">
                            <div className="h-6 w-40 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                            <div className="h-3 w-48 rounded bg-gray-200" />
                        </div>
                    </div>

                    <div className="h-28 w-full rounded-xl bg-gray-200 md:w-48" />
                </div>

                {/* Price summary skeleton */}
                <div className="rounded-2xl bg-white p-6">
                    <div className="mb-5 h-5 w-40 rounded bg-gray-200" />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="h-32 rounded-xl bg-gray-200" />
                        <div className="h-32 rounded-xl bg-gray-200" />
                        <div className="h-32 rounded-xl bg-gray-200" />
                    </div>
                </div>

                {/* Market table skeleton */}
                <div className="space-y-4 rounded-2xl bg-white p-6">
                    <div className="h-5 w-48 rounded bg-gray-200" />
                    <div className="h-10 rounded bg-gray-200" />
                    <div className="h-10 rounded bg-gray-200" />
                    <div className="h-10 rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
}