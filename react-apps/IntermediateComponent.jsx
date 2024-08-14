import React, {useState, useEffect } from 'react';

const IntermediateComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch('/link/to/resource');
                const json = await response.json();
                setData(json);                
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData() 
    }, []);

    return (
        <div>
            {
                loading ? (
                    <p>loading</p>
                ) : (
                    <ul>
                        {data.map((item) => {
                            <li key={item.id}>
                                item.name
                            </li>
                        })}
                    </ul>
            )};
            {
                error && <p>Error: {error.message}</p>
            }
        </div>
    );
};

export default IntermediateComponent;