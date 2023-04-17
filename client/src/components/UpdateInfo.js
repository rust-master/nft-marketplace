import React, { useEffect } from 'react';
import PageBanner from './general/PageBanner';
import UpdateProfileForm from './account/UpdateProfileForm';

function UpdateInfo() {
    useEffect(() => {
        document.title = 'Edit profile | NFT Marketplace';
        return () => console.log('clear...');
    }, []);

    return (
        <>
            <PageBanner heading='Edit your profile' />
            <section className='py-5 position-relative'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-9 mx-auto'>
                            <UpdateProfileForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpdateInfo;
