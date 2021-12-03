import { Box, makeStyles } from '@material-ui/core';
import { Container } from "@material-ui/core";
import React, { useEffect, useState } from 'react'
import { url } from '../config'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import NewsCard from './NewsCard'
import './TechShorts.css'
function TechShorts() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`${url}api/v1/getShorts`).then((res) => {
      setData(res.data)
    });
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <div className="content">
        

          {/* First this */}
          {data.map((d) => (
            <NewsCard newsItem={d} />
          ))}

          {/* Then this */}
          {/* {loadMore <= newsResults && ( */}
            {/* <> */}
              <hr />
              <button
                className="loadMore"
                onClick={() => {}}
              >
                Load More
              </button>
            {/* </> */}
          {/* )} */}
        </div>
      </Container>


    </>
  );
}

export default TechShorts;