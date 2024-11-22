import { useState, useCallback } from 'react';
import { Button } from 'antd';
import { sum } from '@';
import { Button as Button11 } from '@/button';

const App = () => {
  const [result, setResult] = useState(0);
  const clickHandler = useCallback(() => {
    setResult(sum(2, 2));
  }, []);

  return (
    <>
      {result}
      <Button onClick={clickHandler}>sum</Button>
      <Button11 />
    </>
  );
};

export default App;
