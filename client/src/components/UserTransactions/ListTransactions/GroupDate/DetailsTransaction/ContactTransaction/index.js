import React, { useEffect } from 'react';

import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

const ContactTransaction = (props) => {

    const { from, to } = props;

    return (
        <div className="contact-transfer">
            <p className="name">{from.name}</p>
            <TrendingFlatIcon className="icon"/>
            <p className="name">{to.name}</p>
        </div>
    )

}

export default ContactTransaction;

