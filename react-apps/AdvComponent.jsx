import React, {useState, useEffect, useReducer, useContext } from 'react'
import { AppContext } from './AppContext';

const AdvComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user } = useContext(AppContext);

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

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
    }, [user]);

    const handleBtnClick = () => {
        dispatch({
            type: 'TOGGLE_BUTTON'
        });
    }

    if (loading) {
        return <p>loading</p>;
    } else {
        if (error) {
            return <p>Error: { error.message }</p>;
        } else {
            return (
                <div>
                    <ul>
                    {
                        data.map(item => (
                            <li key={item.id}>
                                { item.name }
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleBtnClick()}>Toggle button</button>
                    <p>Button state : { state.buttonVisible ? 'visible' : 'Hidden' }</p>
                </div>
            );
        }
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_BUTTON':
            return { ...state, buttonVisible: !state.buttonVisible}

        default:
            return state;
    }
};

const initialState = {
    buttonVisible: false
};

export default AdvComponent;