// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Search } from './components/search/Search';

export function App() {

  const handleOnSearchChange = (searchData: any) => {
    console.log(searchData)
  }

  return (
    <div className={styles.container}>
      <Search onSearchChange={handleOnSearchChange} searchData={null} />
    </div>
  );
}

export default App;
