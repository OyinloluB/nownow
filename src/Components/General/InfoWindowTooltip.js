import React from 'react';

const InfoWindowTooltip = ({ user }) => {
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.phone}</p>
          </div>
    );
}

export default InfoWindowTooltip;
