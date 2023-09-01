"use client"
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import "./page.css"
import SearchIcon from '@mui/icons-material/Search';



function MainPage() {

  const [topRated, settopRated] = useState([]);

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=16242317f3764cb8c2c121692d453792")
      .then((res) => {
        settopRated(res.data.results)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )
  },[])

  return (

    <div className='main w-100 h-100'>
      <div className='search bg-transparent p-4 '>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>

      <div className='topRated-movies'>
        <h3>Top Rated movies</h3>
        <div className='topRated'>
          {topRated && topRated.map((item) => {
            return (
              <Card style={{ width: '12vw', flexShrink: "0", height: "50vh", borderRadius: "10px" , overflowY: "hidden"}}>
                <Link href={`/${item.id}`} style={{ textDecoration: "none" }}  >
                  <Card.Img style={{ width: '100%', height: "80%" }} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "2vh" }}>{item.title}</Card.Title>
                    <Card.Text style={{ fontSize: "2vh" }}>{item.release_date}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
