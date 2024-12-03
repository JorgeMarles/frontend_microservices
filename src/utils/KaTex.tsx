import katex from 'katex';
import { useEffect, useRef } from "react";

function KaTeX({ texExpression, className }: { texExpression: string, className: string }) {
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    katex.render(texExpression, containerRef.current as HTMLInputElement);
  }, [texExpression]);

  return <div ref={containerRef} className={className} />;
}

export default KaTeX;