import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search = () => {
    const [term, setTerm] = useState('')
    const [results, setResults] = useState([])
    
    useEffect(() =>{
        //another expression:    
            //  (async () => {
            //  await axios.get('')
            //  })();
        const searchWiki = async() =>{ 
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:term,
                },
            })
            //set results after query 
            setResults(data.query.search)
        }
        //call searchWiki to get data,
        //but the first rendered term is empty string, so use if statement to prevent default search
        // if(term){       
        //     searchWiki()
        // }
        if(term && !results.length){
            searchWiki()
        } else{
            const timeoutId = setTimeout(() =>{
                if(term){
                    searchWiki()
                }
            },500)
    
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [term])

    const renderedResults = results.map((result)=>{ 
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                <a className="ui button" href={`https:en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    {result.snippet}
                </div>
            </div>
        )
    })


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input className="input" 
                        value={term}
                        onChange={e=>setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}

export default Search