import React from 'react';

import { CheckCircle } from '@material-ui/icons/';
import { Cancel } from '@material-ui/icons/';

const ListTransfer = () => {

    return (
        <div className="group">

            <div className="container-date">
                <h5 className="date-label">01 de agosto 2018</h5>
            </div>

            <div className="transfer-details">

                <div className="row">
                    <div className="status-transfer">
                        <CheckCircle className="icon accepted"/> 
                        <span className="status">Aprovada</span>
                    </div>
                    <div className="contact-transfer">
                        <p className="name">João</p>
                    </div>
                    <div className="amount-transfer">
                        <p className="amount">+ R$ 1000.00</p>
                    </div>
                </div>

                <div className="row">
                    <div className="status-transfer">
                        <Cancel className="icon canceled"/>
                        <span className="status">Cancelada</span>
                    </div>
                    <div className="contact-transfer">
                        <p className="name">João</p>
                    </div>
                    <div className="amount-transfer">
                        <p className="amount">+ R$ 1000.00</p>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ListTransfer;