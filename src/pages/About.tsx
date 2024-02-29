import React from "react";
import Navbar from "./page_components/Navbar";

const About: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="p-5">
                <h1 className="text-2xl">About</h1>
                <div className="border-t border-gray-300 my-4 mt-3 mb-3"></div>
                <p>
                    MC Mod Scanner is a simple tool for quickly scanning
                    <a className="pl-1 text-blue-600 underline pr-1" href="https://en.wikipedia.org/wiki/JAR_(file_format)">JAR</a>
                    files for malicious code.
                </p>
            </div>
        </div>
    );
};

export {About}
