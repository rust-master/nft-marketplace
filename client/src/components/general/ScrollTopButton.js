import React, { useEffect } from "react";

function ScrollTopButton() {
    useEffect(() => {
        // SCROLL TOP BUTTON [SHOW & HIDE & CLICKING]
        const scrollTopBtn = document.querySelector(".scroll-top-btn");
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener("click", function () {
                window.scrollTo(0, 0);
            });

            window.addEventListener("scroll", function () {
                if (window.pageYOffset >= 1000) {
                    scrollTopBtn.classList.add("is-visible");
                } else {
                    scrollTopBtn.classList.remove("is-visible");
                }
            });
        }
    });

    return (
        <div className='scroll-top-btn d-flex align-items-center shadow'>
            <span>Top</span>
            <i className='las la-arrow-right ms-2'></i>
        </div>
    );
}

export default ScrollTopButton;
