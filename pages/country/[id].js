import { useEffect, useState } from 'react';
import Layout from '../../src/components/Layout/Layout';

import styles from './Country.module.css';

const getCountry = async (id) => {
    try{
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
        const country = await res.json();

        return country;
    }
    catch(e){
        console.error(e);
        return ;
    }
}

const Country = ({country}) => {
    
    const[borders, setBorders] = useState([]);

    const getBorders = async () =>{

        const borders = await Promise.all(
            country.borders.map( border => getCountry(border) )
        );

        setBorders(borders);
    }

    useEffect(( ) => {
        getBorders();
    }, []);

    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name}></img>

                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>
                    
                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{country.population}</div>
                            <div className={styles.overview_label}>Population</div>
                        </div>
                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{country.area}</div>
                            <div className={styles.overview_label}>Area (km<sup>2</sup>)</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <div className={styles.details_heading}>Details</div>
                    <DetailsRow label={"Capital"} value={country.capital}/>
                    <DetailsRow label={"Subregion"} value={country.subregion}/>
                    <DetailsRow label={"Languages"} value={country.languages.map(({name}) => name).join(", ")}/>
                    <DetailsRow label={"Currenceies"} value={country.currencies.map(({name}) => name).join(", ")}/>
                    <DetailsRow label={"Native Name"} value={country.nativeName}/>
                    <DetailsRow label={"Gini"} value={country.gini + "%"}/>
                
                    <div className={styles.details_borders}>
                        <div className={styles.details_borders_heading}>Neighboring countries</div>
                        <div className={styles.details_borders_container}>
                            {borders.map( ({flag, name, alpha3Code}) => {
                                return (<div key={alpha3Code}>
                                    <img className={styles.details_borders_country_flag} src={flag} alt={name}/>
                                    <div className={styles.details_borders_country_name}>{name}</div>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Layout>;
}

const DetailsRow = ({label, value}) =>{
    return (<div className={styles.details_row}>
        <div className={styles.details_row_label}>{label}</div>    
        <div className={styles.details_row_value}>{value}</div>    
    </div>);
}

export default Country;

export const getStaticPaths = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();
    
    const paths = countries.map(country => ({
            params: {id: country.alpha3Code}
        })
    )
    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}) => {
    const country = await getCountry(params.id);

    return {
        props:{
            country
        }
    }
   
}