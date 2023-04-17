import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
    useEffect(() => {
        document.querySelector(".navbar").classList.add("navbar-active");
        return () => {
            document.querySelector(".navbar").classList.remove("navbar-active");
        };
    }, []);

    return (
        <div className='container py-5'>
            <div className='row py-5 text-center'>
                <div className='col--lg-6 mx-auto'>
                    <p className='mb-0 fw-bold' style={{ fontSize: "10rem", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}>
                        404
                    </p>
                    <h1 className='h3 text-uppercase'>Not Found</h1>
                    <p className='text-muted'>This page is not found, return to Home page</p>
                    <Link to='/' className='btn btn-gradient-primary'>
                        Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
