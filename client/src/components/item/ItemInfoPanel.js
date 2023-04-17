import React, { useEffect, useState, useContext } from 'react';
import { formatCategory, truncate, configEtherScanUrl } from '../../helpers/utils';
import reactImageSize from 'react-image-size';
import Web3Context from '../../store/web3-context';

function ItemInfoPanel({ img, dateCreated, name, description, category, creator }) {
    const [imgSize, setImgSize] = useState('');
    const web3Ctx = useContext(Web3Context);

    useEffect(() => {
        async function getImageSize(x) {
            try {
                const { width, height } = await reactImageSize(x);
                setImgSize(`${width} x ${height}`);
            } catch {
                setImgSize('Not detected');
            }
        }

        getImageSize(img);
    }, [img]);

    return (
        <>
            <p className='d-inline-block fw-normal text-primary bg-dark px-3 py-2 rounded-sm text-sm mb-0'>
                <i className='las la-image me-2 mb-1 align-middle'></i>
                {formatCategory(category)}
            </p>

            <h1>{name}</h1>
            <p className='text-muted mb-4'>{description}</p>

            <div className='row mb-4'>
                <div className='col-xl-8'>
                    <div className='card shadow-sm rounded'>
                        <div className='card-body p-4'>
                            <ul className='list-unstyled text-sm text-muted mb-0'>
                                <li className='d-flex align-items-center justify-content-between mb-2 pb-1'>
                                    <p className='mb-0 d-flex align-items-center'>
                                        <i className='text-primary las la-user-circle'></i>
                                        <span className='ms-2'>Item Artist</span>
                                    </p>
                                    <p className='mb-0'>
                                        <a
                                            href={configEtherScanUrl(web3Ctx.networkId, creator)}
                                            className='text-reset'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {creator !== undefined && truncate(creator, 10)}
                                        </a>
                                    </p>
                                </li>
                                <li className='d-flex align-items-center justify-content-between mb-2 pb-1'>
                                    <p className='mb-0 d-flex align-items-center'>
                                        <i className='text-primary las la-clock'></i>
                                        <span className='ms-2'>Created at</span>
                                    </p>
                                    <p className='mb-0'>{new Date(dateCreated).toLocaleDateString('en-US')}</p>
                                </li>
                                <li className='d-flex align-items-center justify-content-between mb-2 pb-1'>
                                    <p className='mb-0 d-flex align-items-center'>
                                        <i className='text-primary las la-crop-alt'></i>
                                        <span className='ms-2'>Item Dimensions</span>
                                    </p>
                                    <p className='mb-0'>{imgSize}</p>
                                </li>
                                <li className='d-flex align-items-center justify-content-between mb-2 pb-1'>
                                    <p className='mb-0 d-flex align-items-center'>
                                        <i className='text-primary las la-photo-video'></i>
                                        <span className='ms-2'>Category</span>
                                    </p>
                                    <p className='mb-0'>{formatCategory(category)}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemInfoPanel;
