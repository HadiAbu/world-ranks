import {useState} from 'react';
import styles from './CountriesTable.module.css';
import Utils from "../../Utils/Utils";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';

import Link from 'next/link';

const SortArrow = ({dir}) =>{
    if(!dir){
        return <></>;
    }
    if(dir === "asc"){
        return (<div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color="inherit"/>
        </div>);
    }
    else{
        return (<div className={styles.heading_arrow}>
            <KeyboardArrowUpRounded color="inherit"/>
        </div>);
    }
}

const CountriesTable = ({countries}) => {
    const[direction, setDirection] = useState("desc");
    const[value, setValue] = useState("population");

    const switchDirection = () => {
        if(!direction){
            setDirection("asc");
        }
        else if(direction === "asc"){
            setDirection("desc");
        }
        else if(direction === "desc"){
            setDirection("asc");
        }
        else{
            setDirection("null");
        }
    }
    const setKeywordAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    const orderedCountries = Utils.orderBy(countries, value, direction);
    return (<div>
        <div className={styles.heading}>
            <div className={styles.heading_flag}>
            </div>
            <button className={styles.heading_name} onClick={()=>setKeywordAndDirection('name')}>
                <div>Name</div>
                {value === 'name' && <SortArrow dir={direction} /> }
            </button>
            <button className={styles.heading_population} onClick={()=>setKeywordAndDirection('population')}>
                <div>Population</div>
                {value === 'population' && <SortArrow dir={direction} /> }
            </button>
            <button className={styles.heading_area} onClick={()=>setKeywordAndDirection('area')}>
                <div>Area (km<sup style={{fontSize: '0.5rem'}}>2</sup>)</div>
                {value === 'area' && <SortArrow dir={direction} /> }
            </button>
            <button className={styles.heading_gini} onClick={()=>setKeywordAndDirection('gini')}>
                <div>Gini</div>
                {value === 'gini' && <SortArrow dir={direction} /> }
            </button>
        </div>
            {
                orderedCountries.map( country => {
                    return (<Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}><div className={styles.row}>
                        <div className={styles.flag}>
                            <img src={country.flag} alt={country.name}/>
                        </div>
                        <div className={styles.name}>{country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                        <div className={styles.area}>{country.area || 0}</div>
                        <div className={styles.gini}>{country.gini || 0}%</div>
                    </div></Link>)
                })
            }
    </div>);
}

export default CountriesTable;