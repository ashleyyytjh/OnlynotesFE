import { useSearchParams } from 'react-router-dom';
import {useEffect} from "react";

type Params = Record<string, string>;

const useSearchParamsHandler = (defaultParams:Params = {}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParam = (key: string) => {
        return searchParams.get(key) || defaultParams[key] || '';
    };

    const setParam = (key : string, value : any) => {
        setSearchParams({ ...Object.fromEntries(searchParams), [key]: value });
    };

    const resetParams = () => {
        setSearchParams(defaultParams);
    };
    useEffect(() => {
        if (searchParams.get('page') === null) {
            resetParams();
        }
    }, [searchParams]);
    return { getParam, setParam, resetParams, searchParams };
};

export default useSearchParamsHandler