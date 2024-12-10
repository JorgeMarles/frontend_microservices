import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism.css";

interface CodeViewProps {
    language: string;
    code: string;
}

const CodeView: React.FC<CodeViewProps> = ({ language, code }) => {
    useEffect(() => {
        Prism.highlightAll(); // Resalta el código al montar el componente
    }, []);
    

    return (
        <pre>
            <code className={`${language}`}>
                {code}
            </code>
        </pre>
    );
};

export default CodeView;
