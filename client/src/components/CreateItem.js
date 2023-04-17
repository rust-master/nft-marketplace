import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Select from 'react-dropdown-select';
import Web3Context from '../store/web3-context';
import CollectionContext from '../store/collection-context';
import PageBanner from './general/PageBanner';
import ItemPreview from './create/ItemPreview';
import SuccessMessage from './general/SuccessMessage';
import FullScreenLoader from './general/FullScreenLoader';
import { categoryOptions } from '../helpers/constants';
const ipfsClient = require('ipfs-http-client');

const projectId = '2HJJkDwcnhBjlBdxSrnizHkePHu';
  const projectSecret = '95855fbce8d430480913d65714faf159';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

function CreateItem() {
    const history = useHistory();
    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    const [mintSuccess, setMintSuccess] = useState(false);
    const [enteredName, setEnteredName] = useState('');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const [enteredDescription, setEnteredDescription] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);
    const [selectedFile, setSelectedFile] = useState();
    const [fileIsValid, setFileIsValid] = useState(true);
    const [preview, setPreview] = useState();
    const [enteredCategory, setEnteredCategory] = useState('Not Specified');
    const [mintLoading, setMintLoading] = useState(false);
    const { addToast } = useToasts();
    const today = new Date();

    useEffect(() => {
        document.title = 'Mint an NFT | NFT Marketplace';
    }, []);

    useEffect(() => {
        if (mintLoading === true) {
            document.body.style.overflowY = 'hidden';
        } else if (mintLoading === false) {
            document.body.style.overflowY = 'auto';
        }
    }, [mintLoading]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const enteredNameHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const enteredDescriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    // 🟢 SUBMISSION => submit create form
    const submissionHandler = (event) => {
        event.preventDefault();

        // 🟢 Validate form fields
        enteredName ? setNameIsValid(true) : setNameIsValid(false);
        enteredDescription ? setDescriptionIsValid(true) : setDescriptionIsValid(false);
        selectedFile ? setFileIsValid(true) : setFileIsValid(false);
        const formIsValid = enteredName && enteredDescription && selectedFile;

        // 🧊 Upload file to IPFS and push to the blockchain
        const mintNFT = async () => {
            setMintLoading(true);

            // Add file to the IPFS
            const fileAdded = await ipfs.add(selectedFile);
            if (!fileAdded) {
                console.error('Something went wrong when updloading the file');
                return;
            }

            const metadata = {
                title: 'Asset Metadata',
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: enteredName,
                    },
                    description: {
                        type: 'string',
                        description: enteredDescription,
                    },
                    image: {
                        type: 'string',
                        description: fileAdded.path,
                    },
                    category: {
                        type: 'string',
                        description: enteredCategory,
                    },
                    dateCreated: {
                        type: 'string',
                        description: today,
                    },
                },
            };

            const metadataAdded = await ipfs.add(JSON.stringify(metadata));
            if (!metadataAdded) {
                console.error('Something went wrong when updloading the file');
                return;
            }

            collectionCtx.contract.methods
                .safeMint(metadataAdded.path)
                .send({ from: web3Ctx.account })
                .on('transactionHash', (hash) => {
                    collectionCtx.setNftIsLoading(true);
                    setMintLoading(true);
                })
                .on('error', (e) => {
                    addToast('Something went wrong when pushing to the blockchain', {
                        appearance: 'error',
                    });
                    collectionCtx.setNftIsLoading(false);
                    setMintLoading(false);
                })
                .on('receipt', () => {
                    setMintSuccess(true);
                    setMintLoading(false);
                    setTimeout(() => {
                        history.push('/explore');
                    }, 2500);
                });
        };

        formIsValid && mintNFT();
    };

    // Inject validation classes to input fields
    const nameClass = nameIsValid ? 'form-control' : 'form-control is-invalid';
    const descriptionClass = descriptionIsValid ? 'form-control' : 'form-control is-invalid';
    const fileClass = fileIsValid ? 'form-control' : 'form-control is-invalid';

    if (mintSuccess)
        return (
            <SuccessMessage
                heading="Great! You've successfully minted your NFT"
                subheading="We're redirecting to homepage"
            />
        );

    return (
        <>
            {mintLoading ? <FullScreenLoader heading='loading' /> : null}
            <PageBanner heading='Mint an NFT' />
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row g-5'>
                        <div className='col-lg-8'>
                            {/* NFT INFORMATION */}

                            <form className='' onSubmit={submissionHandler}>
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='icon icon-md me-2 flex-shrink-0 bg-primary rounded-sm text-white'>
                                        <i className='las la-image'></i>
                                    </div>
                                    <h2 className='h5 mb-0'>Upload image</h2>
                                </div>

                                <div className='row mb-5'>
                                    <div className='col-lg-12'>
                                        {/* <label className='form-label text-gray-400'>Image</label> */}
                                        <input
                                            className={`form-control shadow-0 bd-dark-lighter bg-none custom-file-upload ${fileClass}`}
                                            type='file'
                                            autoComplete='off'
                                            name='nft_image'
                                            id='nft_image'
                                            placeholder='e.g. Crypto Funk'
                                            onChange={onSelectFile}
                                        />
                                        <label
                                            className={`form-label text-gray-400 text-center bg-dark ${
                                                selectedFile ? 'p-3' : 'p-5'
                                            }`}
                                            htmlFor='nft_image'
                                        >
                                            {!selectedFile ? (
                                                <div className='my-5'>
                                                    <i className='las la-image la-3x text-muted'></i>
                                                    <h6 className='mb-0 fw-normal text-gray-500'>
                                                        Click here to uplad
                                                    </h6>
                                                    <p className='text-muted mb-0'>Waiting to catch your cool image</p>
                                                </div>
                                            ) : (
                                                <img src={preview} className='img-fluid' alt={enteredName} />
                                            )}
                                        </label>
                                    </div>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <div className='icon icon-md me-2 flex-shrink-0 bg-primary rounded-sm text-white'>
                                        <i className='las la-icons'></i>
                                    </div>
                                    <h2 className='h5 mb-0'>Add Info</h2>
                                </div>

                                <div className='bg-dark p-4 p-lg-5'>
                                    <div className='row gy-3 has-field-icons'>
                                        <div className='col-lg-12'>
                                            <label className='form-label text-gray-400' htmlFor='nft_title'>
                                                Title
                                            </label>
                                            <div className='input-icon'>
                                                <div className='input-icon-text bg-none'>
                                                    <i className='text-primary las la-user-edit'></i>
                                                </div>
                                                <input
                                                    className={`form-control bd-dark-lighter shadow-0 bg-none ${nameClass}`}
                                                    type='text'
                                                    autoComplete='off'
                                                    name='nft_title'
                                                    id='nft_title'
                                                    placeholder='e.g. Crypto Funk'
                                                    value={enteredName}
                                                    onChange={enteredNameHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <label className='form-label text-gray-400' htmlFor='nft_description'>
                                                Description
                                            </label>
                                            <div className='input-icon'>
                                                <div className='input-icon-text bg-none'>
                                                    <i className='las la-align-left text-primary'></i>
                                                </div>
                                                <textarea
                                                    rows='6'
                                                    className={`form-control shadow-0 bd-dark-lighter bg-none ${descriptionClass}`}
                                                    name='nft_description'
                                                    id='nft_description'
                                                    placeholder='Provide some good description about your asset'
                                                    value={enteredDescription}
                                                    onChange={enteredDescriptionHandler}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <label className='form-label text-gray-400' htmlFor='nft_category'>
                                                Category
                                            </label>
                                            <div className='input-icon flex-nowrap category-select'>
                                                <div className='input-icon-text bg-none'>
                                                    <i className='las la-icons text-primary'></i>
                                                </div>
                                                <Select
                                                    searchable={false}
                                                    options={categoryOptions}
                                                    className='form-select shadow-0 bd-dark-lighter bg-none'
                                                    value={enteredCategory}
                                                    onChange={(values) =>
                                                        setEnteredCategory(values.map((el) => el.value).toString())
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* SUBMIT */}
                                        <div className='col-12'>
                                            <button className='btn btn-primary' type='submit'>
                                                <i className='lab la-ethereum me-2'></i>Mint NFT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* PREVIEW ITEM */}
                        <div className='col-lg-4'>
                            <ItemPreview
                                heading='Preview Item'
                                preview={preview}
                                title={enteredName}
                                category={enteredCategory}
                                author={web3Ctx.account}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CreateItem;
