import { useState, useCallback } from 'react';
import { Button } from 'antd';
import { sum } from '@';

const App = () => {
  const [result, setResult] = useState(0);
  const clickHandler = useCallback(() => {
    setResult(sum(2, 2));
  }, []);

  return (
    <>
      {result}
      <Button onClick={clickHandler}>sum</Button>
    </>
  );
};

export default App;
