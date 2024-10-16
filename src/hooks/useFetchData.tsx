import {useState, useEffect} from "react";


const useFetchData = (fetchFunction :() => Promise<any>) => {
    const [data, setData] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this runs only once
    const fetchData = async () => {
        let timeoutId: NodeJS.Timeout;
        try {
            setLoading(true);
            await fetchFunction().then((response)=> {
                console.log('RESPONSE' , response);
                setData(response);
            });
        } catch (error) {
            console.log('error')
            setError(true);
        } finally {
            timeoutId = setTimeout(() => {
                setLoading(false);
            }, 600);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    };


    return { data, loading, error, refetchFunc:fetchData};
};

export default useFetchData;