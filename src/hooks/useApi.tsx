import { useEffect, useState } from 'react'

const BASE_URL = '<https://smartsalesbis.com/api/>';

export default function useApi(path :string) {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading]  = useState(false);

    useEffect(() => {
        setLoading(true);
        
        fetch(BASE_URL + path)
        .then((res) => res.json())
        .then((jsonObject) => {

            setDataList(jsonObject);
            setLoading(false);
            
        });
    }, []);

  return { dataList }
}
