"use client";

import React from "react";
import PropTypes from "prop-types";

const QtyField = ({ name, value, onChange }) => {
    const currentValue = Number(value) || 1;

    const qtyControl = (qty) =>
        onChange({
            target: {
                name,
                type: "number",
                value: qty < 1 ? 1 : qty,
            },
        });

    return (
        
       
        <div className="join mt-4 w-fit">
            <button
                type="button"
                onClick={() => qtyControl(currentValue - 1)}
                className="join-item btn btn-outline btn-sm text-lg"
            >
                -
            </button>

            <input
                type="number"
                name={name}
                value={currentValue}
                min={1}
                onChange={(e) => qtyControl(Number(e.target.value))}
                className="join-item input input-bordered input-sm w-16 text-center text-base font-bold"
            />

            <button
                type="button"
                onClick={() => qtyControl(currentValue + 1)}
                className="join-item btn btn-outline btn-sm text-lg"
            >
                +
            </button>
        </div>
    );
}
    
    


QtyField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
};

QtyField.defaultProps = {
    value: 1,
};

export default QtyField;
