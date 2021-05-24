import {useState} from 'react';
import styles from '../styles/Home.module.css';

import Layout from '../src/components/Layout/Layout';
import SearchInput from '../src/components/SearchInput/SearchInput';
import CountriesTable from '../src/components/CountriesTable/CountriesTable';

export default function Home({countries}) {
  const[keyword, setKeyword] = useState("");

  const filterBy = (key) => {
    return countries.filter( country => 
      country['name'].toLowerCase().includes(key) ||
      country['region'].toString().includes(key) || 
      country['subregion'].toLowerCase().includes(key) 
    )
  }

  const onInputChange = (e) =>{
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return (<Layout>
    <div className={styles.inputContainer}>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <div className={styles.input}>
        <SearchInput placeholder="Filer by name, region or sub region" onChange={onInputChange}/>
      </div>
    </div>
    <CountriesTable countries={filterBy(keyword)}/>
  </Layout>);
}

export const getStaticProps = async() =>{
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();
  return({
    props:{
      countries
    }
  });
};
