import { useMetrics } from "../Hooks";

export const Metrics = () => {
    const { metrics, loading, error } = useMetrics();

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Backend Metrics</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-gray-100 p-4 rounded w-full overflow-x-auto">
                <pre className="text-sm sm:text-base">{metrics}</pre>
            </div>
        </div>
    );
};
