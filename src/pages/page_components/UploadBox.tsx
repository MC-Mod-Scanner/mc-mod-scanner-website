import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const UploadBox: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [customText, setCustomText] = useState<string>('Initial Text'); // Set an initial value

    const navigate = useNavigate();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        const files = fileInput.files;

        if (files && files.length > 0) {
            setFileName(files[0].name);
            console.log(files[0].name);
            setCustomText('Custom Text'); // Change the custom text when a file is selected
        } else {
            setFileName(null);
            setCustomText('Initial Text'); // Reset the custom text when no file is selected
        }

        if (files && files.length > 0) {
            try {
                const formData = new FormData();
                formData.append('file', files[0]);

                const apiURL= process.env.MCMODSCANNER_API_URL || 'https://mcmodscanner.online/api';

                const response = await fetch( apiURL + '/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (response.ok) {
                    const hashJson = await response.json();
                    if (hashJson.SHA256) {
                        navigate(`scanner/${hashJson.SHA256}`)
                    }
                } else {
                }
            } catch (error) {

            }
        }
    };

    return (
        <div className="flex items-center justify-center w-3/5">
            <label htmlFor="dropzone-file"
                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {fileName ? null : (
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                    )}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">

                        <span className="font-semibold">{fileName ? fileName : 'Click to upload'}</span>
                        {fileName ? '' : 'or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{fileName ? '' : 'JAR (MAX. 100MB)'}</p>
                </div>
                <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden"/>
            </label>
        </div>
    );
};
/*
<div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
    <div className="relative border-2 border-gray-400 bg-gray-100 p-6 rounded-md">
        <input type="file" id="fileInput" className="absolute inset-0 w-full h-full opacity-0"/>
        <div className="text-center">
            <p className="mt-1 text-sm text-gray-600">drag and drop or click to select a file</p>
            </div>
        </div>
    </div>
 */

export {UploadBox};