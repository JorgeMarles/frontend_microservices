import { FC } from 'react';
import { Problem } from '../utils/interfaces';

interface ProblemProps {
    data: Problem;
}

const ProblemView: FC<ProblemProps> = ({ data }) => {

    console.log("asdasd ", data);
    return (
        <div>
            <h1>
                {data.name}
            </h1>
        </div>
    );
};

export default ProblemView;
