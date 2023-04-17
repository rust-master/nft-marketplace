import React from 'react';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';

function ItemAuthor({ creator, owner }) {
    console.log(creator, owner);
    console.log(typeof creator, typeof owner);
    return (
        <div className='row'>
            <div className='col-xl-8'>
                <ul className='list-inline d-flex align-items-center'>
                    <li className='list-inline-item flex-shrink-0 me-4'>
                        <h6 className='mb-3'>Creator</h6>
                        <div className='d-flex align-items-center p-3 bg-dark bd-3 border-gray-gray-darker rounded-sm'>
                            <div style={{ width: '35px', height: '35px' }}>
                                {creator !== undefined && <Jazzicon address={creator} />}
                            </div>
                            <p className='ms-2 mb-0 text-gray-400'>
                                {uniqueNamesGenerator({
                                    dictionaries: [starWars],
                                }).replace('_', ' ')}
                            </p>
                        </div>
                    </li>
                    <li className='list-inline-item flex-shrink-0'>
                        <h6 className='mb-3'>Owner</h6>
                        <div className='d-flex align-items-center p-3 bg-dark bd-3 border-gray-gray-darker rounded-sm'>
                            <div style={{ width: '35px', height: '35px' }}>
                                <Jazzicon address={owner} />
                            </div>
                            <p className='ms-2 mb-0 text-gray-400'>
                                {uniqueNamesGenerator({
                                    dictionaries: [starWars],
                                }).replace('_', ' ')}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ItemAuthor;
