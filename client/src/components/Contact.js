import React, { useEffect } from 'react';
import PageBanner from './general/PageBanner';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';

function Contact(props) {
    useEffect(() => {
        document.title = 'Contact Us | NFT Marketplace';
    });

    return (
        <>
            <PageBanner heading={'Contact Us'} />
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row g-4'>
                        <ContactInfo gridWidth='col-lg-4' />
                        <ContactForm gridWidth='col-lg-8' />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
