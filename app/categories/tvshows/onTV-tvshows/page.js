"use client"
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import "./page.css"
import SearchIcon from '@mui/icons-material/Search';



function MainPage() {

  const [onTV, setonTV] = useState([]);

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=16242317f3764cb8c2c121692d453792")
      .then((res) => {
        setonTV(res.data.results)
        console.log(res.data.results)
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

      <div className='onTV-tvshows'>
        <h3>Currently Airing TV Shows</h3>
        <div className='onTV'>
          {onTV && onTV.map((item) => {
            return (
              <Card style={{ width: '12vw', flexShrink: "0", height: "50vh", borderRadius: "10px" , overflowY: "hidden"}}>
                <Link href={`/tv/${item.id}`} style={{ textDecoration: "none" }}  >
                  <Card.Img style={{ width: '100%', height: "80%" }} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "2vh" }}>{item.name}</Card.Title>
                    <Card.Text style={{ fontSize: "2vh" }}>{item.first_air_date}</Card.Text>
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
