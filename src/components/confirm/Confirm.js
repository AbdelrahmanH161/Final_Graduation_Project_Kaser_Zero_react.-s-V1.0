import React from 'react';
import ConfirmLeft from './ConfirmLeft';
import ConfirmRight from './ConfirmRight';

function Confirm() {
    return (
        <>
            <main className="p-5 m-0 bg-white bg-opacity-75">
                <main className="container">
                    <div className="m-0 d-flex justify-content-around flex-lg-row flex-column-reverse">
                        <ConfirmLeft></ConfirmLeft>
                        <ConfirmRight></ConfirmRight>
                    </div>
                </main>
            </main>
        </>
    );
}

export default Confirm;