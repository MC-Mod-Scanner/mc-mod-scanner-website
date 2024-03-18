import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {LoadingCircle} from "./LoadingCircle";

export interface JarStrings {
    classPath: string;
    strings: string[];
    nullByteCount: number;
}

const StringViewer: React.FC = () => {
    const [jarStrings, setJarStrings] = useState<JarStrings[] | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            console.log(location.pathname)
            try {
                const apiURL= process.env.MCMODSCANNER_API_URL || 'https://mcmodscanner.online/api';
                const response = await fetch(apiURL + location.pathname + "/strings"); // Replace with your actual API endpoint
                const data = await response.json();
                setJarStrings(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(r => {});
    }, [location.pathname]);

    return (
        <div>
            {jarStrings ? (
                (jarStrings.length !== 0 ? (
                    jarStrings.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 w-full ${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                            }`}
                        >
                            <h2 className="text-sm font-bold">{item.classPath}</h2>
                            <h2 className="text-sm font-bold pb-2">Null Character Count: {item.nullByteCount}</h2>
                            <ul>
                                {item.strings.map((warning, index) => (
                                    <li key={index}>
                                        {warning}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center h-screen">
                        <h1 className="pt-20 text-xl">No strings found.</h1>
                    </div>
                ))
            ) : (
                <LoadingCircle />
            )}
        </div>
    );
}

export {StringViewer};
