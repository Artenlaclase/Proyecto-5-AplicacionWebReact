import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
           setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Ciudad no existe. Reintentar");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
                console.log("error fetching data", error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, [url])

    return { data, loading, error }
};

export default useFetch;