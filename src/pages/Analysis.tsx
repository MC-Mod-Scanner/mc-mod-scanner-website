import React, {useState} from 'react';
import Navbar from "./page_components/Navbar";
import {useParams} from "react-router-dom";
import {CodeAnalysis} from "../analysis_components/CodeAnalysis";
import FileViewer from "../analysis_components/FileViewer";
import {StringViewer} from "../analysis_components/StringViewer";

const Analysis: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('code');

    const { hash } = useParams<{ hash: string }>();

    const renderPage = () => {
        switch (currentPage) {
            case 'code':
                return <CodeAnalysis/>;
            case 'files':
                return <FileViewer/>;
            case 'strings':
                return <StringViewer/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="p-8 flex flex-col items-center justify-center">
                <div className="flex-col items-center w-full">
                    <div className="bg-gray-200 p-4 w-full rounded-md mb-2">
                        <h1 className="text-xl">{hash}</h1>
                    </div>
                    <div className="mt-10 mb-0">
                        <button
                            onClick={() => setCurrentPage('code')}
                            className={`ml-5 mr-10 hover:text-blue-500 ${currentPage === 'code' ? 'text-blue-500' : ''}`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => setCurrentPage('files')}
                            className={`mr-10 hover:text-blue-500 ${currentPage === 'files' ? 'text-blue-500' : ''}`}
                        >
                            Files
                        </button>
                        <button
                            onClick={() => setCurrentPage('strings')}
                            className={`hover:text-blue-500 ${currentPage === 'strings' ? 'text-blue-500' : ''}`}
                        >
                            Strings
                        </button>
                    </div>
                    <div className="border-t border-gray-300 my-4 mt-1 mb-3"></div>
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export {Analysis};
