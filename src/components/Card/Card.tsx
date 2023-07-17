import React from 'react';
import { CardProps } from './interfaces';

const Card = ({className, children}: CardProps) => {
    return (
        <div className={`${className} rounded-xl bg-purple-50 overflow-hidden`}>
            {children}
        </div>
    );
};

export default Card;