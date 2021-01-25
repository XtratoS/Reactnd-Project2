import React from 'react'

function ProgressBar(props) {
    const { progress } = props;
    return (
        <div
            className="progress m-1"
            style={{
                height: '1.5rem'
            }}
        >
            <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                    height: '100%',
                    width: `${progress}%`
                }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                    {progress}%
            </div>
        </div>
    )
}

export default ProgressBar
