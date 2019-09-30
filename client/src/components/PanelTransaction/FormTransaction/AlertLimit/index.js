import React, { useState } from 'react';

const AlertLimit = (props) => {

    const { dialog, releaseListener } = props;

    const handleClick = (e) => {
        releaseListener(e.target.value, dialog.key_response);
    }


    return (
        <div className="modal">
            <p>{dialog.message}</p>
            <button type="button" value={true} onClick={handleClick}>Sim!</button>
            <button type="button" value={false} onClick={handleClick}>Não!</button>
        </div>
    )
}

export default AlertLimit;