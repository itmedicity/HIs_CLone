import React from 'react'

const TestComponent = () => {
    const handleClick = () => {
        window.open('http://localhost:3000/t', '_blank');
    };
    return (
        <button onClick={handleClick}>
            Open new window
        </button>
    )
}

export default TestComponent