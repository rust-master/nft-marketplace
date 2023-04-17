import React, { useEffect } from "react";

function Preloader() {
    useEffect(() => {
        // REMOVE PRELOADER AFTER DOM CONTENT LOADED
        const preloaderInner = document.querySelector(".preloader-inner");
        if (preloaderInner) {
            preloaderInner.style.opacity = 0;
            setTimeout(function () {
                preloaderInner.parentElement.style.display = "none";
            }, 500);
        }
    });
    return (
        <div className='preloader'>
            <div className='preloader-inner d-flex align-items-center justify-content-center w-100 h-100'>
                <div className='position-relative text-center'>
                    <div className='spinner-holder d-inline-block me-3'>
                        <div className='spinner'>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                            <div className='item'></div>
                        </div>
                    </div>
                    <svg className='d-none'>
                        <defs>
                            <filter id='goo'>
                                <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur'></feGaussianBlur>
                                <feColorMatrix
                                    in='blur'
                                    data-mode='matrix'
                                    values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8'
                                    result='goo'
                                ></feColorMatrix>
                                <feBlend in='SourceGraphic' in2='goo'></feBlend>
                            </filter>
                        </defs>
                    </svg>
                    <div className='text-center'>
                        <p className='h4 mb-0'>Please wait</p>
                        <p className='text-sm text-muted mb-0'>We're loading our awesome stuff...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preloader;
