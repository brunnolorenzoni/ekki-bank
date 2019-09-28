import React from 'react';

const UserData = (props) => {

    const { name, cpf } = props;

    return (
        <div className="userdata-wrapper">
            <h2 className="user-name">{name}</h2>
            <div>
                <p className="user-cpf">
                    <span>CPF: </span> 
                    <span>{cpf}</span> 
                </p>
            </div>
        </div>
    )


}

export default UserData;