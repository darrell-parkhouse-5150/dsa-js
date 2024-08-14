import React, { useState, useEffect } from 'react'
import Notification from './notifications/Notifications';
const Results = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch('/api/results'
            .then(response => response.json())
            .then(data => setResults(data))
        )
    }, []);

    return (
        <div>
            { results.map((result, idx) => (
                <div key={idx}>
                    <h2>{result.post_content}</h2>
                    <p>shares: { result.shares }</p>
                    <p>likes:  { result.likes }</p>
                    <p>views:  { result.views }</p>
                </div>
            ))}
        </div>
    );
};

export default Results;