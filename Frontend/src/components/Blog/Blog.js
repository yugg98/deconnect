import React, { useEffect,useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Navbar from '../Navbar/Navbar'
import './Blog.css'
function Blog() {
    const [a, setA] = useState([]);
    const [c, setC] = useState(0);
    // useEffect(() => {
    //     fetch('https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=1c9eeb57bc51415b8c075bd6e10878ef', {
    //         method: 'GET', // or 'PUT'
    //     }).then(response => response.json())
    //         .then(data => {
    //             console.log( JSON.stringify(data.articles));
    //             setA(data.articles)
    //             console.log(data.articles[0].title)
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // // console.log(a)
    // }, [])
    
    return (
        <>
        <Navbar/>
        <p style={{textAlign:"center"}}>No blogs</p>
        </>
    )
}

export default Blog
