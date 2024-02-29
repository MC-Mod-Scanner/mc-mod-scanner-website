import React from 'react';
import Navbar from "./page_components/Navbar";
import {UploadBox} from "./page_components/UploadBox";

const Home: React.FC = () => (
    <div>
        <Navbar/>
        <div className="bg-gray-200 p-8 flex flex-col items-center justify-center h-screen">
            <div className="text-center mb-8">
                <h2 className="text-lg font-semibold">Welcome to MC Mod Scanner</h2>
                <p className="text-sm">Upload any Minecraft mod jar to get a detailed analysis and safety report.</p>
            </div>

            <UploadBox/>
        </div>
        {/* Add your home page content here */}
    </div>
);


export {Home};