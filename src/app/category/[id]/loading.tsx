export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f0f5f0] p-6">
            <div className="mx-auto max-w-6xl animate-pulse">
                <div className="mb-6 h-24 rounded-2xl bg-white" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-40 rounded-3xl bg-white"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}