import React from 'react';
import Loader from './Loader';
import { motion } from 'framer-motion/dist/es/index';

const fullScreenLoaderStyle = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    background: 'rgba(0, 0, 0, 0.85)',
    zIndex: '9999',
};

function FullScreenLoader({ heading }) {
    return (
        <motion.div
            className='d-flex align-items-center justify-content-center'
            style={fullScreenLoaderStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
        >
            <div className='row w-100 text-center'>
                <div className='col-lg-6 mx-auto'>
                    <p className='h2 text-uppercase mb-0'>{heading}</p>
                    <Loader />
                </div>
            </div>
        </motion.div>
    );
}

export default FullScreenLoader;
