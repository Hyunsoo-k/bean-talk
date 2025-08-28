import { type JSX } from 'react';

import styles from './App.module.scss';

const App = (): JSX.Element => {
  return (
    <div className={styles['app-component']}>
      Hello world
    </div>
  );
};

export default App;