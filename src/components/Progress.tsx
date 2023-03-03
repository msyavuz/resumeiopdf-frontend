import { ComponentProps, CSSProperties } from "react";
interface ProgressProps {
    value: number;
}
interface ProgressStyle extends CSSProperties {
    "--value"?: number;
}

function Progress({ value }: ProgressProps) {
    return (
        <div
            className="radial-progress bg-primary text-primary-content border-4 border-primary"
            style={{ "--value": value } as ProgressStyle}
        >
            {value}
        </div>
    );
}

export default Progress;
