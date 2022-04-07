import {FC, memo} from 'react';

import './error-block-style.scss';

interface IErrorBlock {
  error: String
}

const ErrorBlock: FC<IErrorBlock> = ({error}) => {
  if (!error) {
    return null;
  }

  return (
    <div className="error-block mt-5px mb-5px text-center">
      {error}
    </div>
  )
}

export default memo(ErrorBlock);
