import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {LoadingCircle} from "./LoadingCircle";

interface FileNode {
    name: string,
    isDir: boolean,
    sha256: string,
    children?: Record<string, FileNode>
}

const folderSVG: React.ReactElement = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
            stroke="#000000" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
)

const fileSVG: React.ReactElement = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                stroke="#000000" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
        </g>
    </svg>
)

const FileViewer: React.FC = () => {
    const location = useLocation();
    const [fileStructure, setFileStructure] = useState<Record<string, FileNode> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiURL= process.env.MCMODSCANNER_API_URL || 'https://mcmodscanner.online/api';
                const response = await fetch(apiURL + location.pathname + "/structure");
                const data = await response.json();
                setFileStructure(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [location.pathname]);



    const renderFileStructure = (files: Record<string, FileNode>, level = 1) => {
        return (
            <ul style={{paddingLeft: `${level * 10}px`}}>
                {Object.keys(files).map((key) => (
                    <li key={key}>
                        <div className="flex items-center">
                            {files[key].isDir ? (
                                folderSVG
                            ) : (
                                fileSVG
                            )}
                            {files[key].name}
                            {files[key].isDir ? (
                                ' /'
                            ) : (
                                <a
                                    download={files[key].name}
                                    className="pl-4 text-blue-600 underline"
                                    href={"https://mcmodscanner.online/api" + location.pathname + "/file/" + files[key].sha256}
                                >
                                    download
                                </a>
                            )}
                        </div>
                        {files && files[key] && files[key].children && (
                            renderFileStructure(files[key].children!, level + 1)
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {fileStructure ? (
                <div className="p-5 bg-gray-100">
                    {renderFileStructure(fileStructure)}
                </div>
            ) : (
                <LoadingCircle/>
            )}
        </div>
    );
}

export default FileViewer;