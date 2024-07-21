import React from "react";

const PrintComponent = React.forwardRef(({ data }, ref) => (
    <div ref={ref} style={{ width: '58mm' }}>
        <div className="w-full mb-3">
            <img
                src="https://i.ibb.co/nw872zF/horizontal-black.png"
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
            />
            <hr/>
            <div className="text-center">

                <div className="font-bold text-2xl">{data.bill_no} - {data.socks}</div>
            </div>
        </div>
        {/* Additional content can go here */}
    </div>
));

export default PrintComponent;
