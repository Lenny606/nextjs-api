'use client'
import { useEffect, useState } from 'react';

export default function Home() {
    const url = `https://dummyjson.com/products?limit=10`;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = (await fetch(url,{
                    mode:  'cors',
                    method: 'GET',
                    headers : {
                        "Authorization": "Bearer sdvksdvkb",
                    }
                }));
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setData(data);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <p>Hello</p>
            {error && <p>Error: {error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
