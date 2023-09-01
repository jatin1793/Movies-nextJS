"use client"
import Card from 'react-bootstrap/Card';
import SearchIcon from '@mui/icons-material/Search';
import "./page.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'


function MainPage() {

  const [trend, settrend] = useState([]);
  const [directors, setdirectors] = useState([]);
  const [tv, settv] = useState("")

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=16242317f3764cb8c2c121692d453792")
      .then((res) => {
        settrend(res.data.results)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )

      axios.get("https://api.themoviedb.org/3/tv/popular?api_key=16242317f3764cb8c2c121692d453792")
      .then((res) => {
        settv(res.data.results)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )

      axios.get("https://api.themoviedb.org/3/person/popular?api_key=16242317f3764cb8c2c121692d453792")
      .then((per) => {
        setdirectors(per.data.results)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )

  },[])

  return (
    <div className='main w-100 h-100'>
      
      <div className='search bg-transparent p-6 '>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>

      <div className='trending-movies'>
        <h3>Trending Movies</h3>
        <div className='trending position-absolute d-flex'>
          {trend && trend.map((item) => {
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

      <div className='trending-movies'>
        <h3>Trending TV shows</h3>
        <div className='trending position-absolute d-flex'>
          {tv && tv.map((item) => {
            return (
              <Card style={{ width: '12vw', flexShrink: "0", height: "50vh", borderRadius: "10px" , overflowY: "hidden"}}>
                <Link href={`/tv/${item.id}`} style={{ textDecoration: "none" }}  >
                  <Card.Img style={{ width: '100%', height: "80%" }} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "2vh" }}>{item.original_name}</Card.Title>
                    <Card.Text style={{ fontSize: "2vh" }}>{item.first_air_date}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            )
          })
          }
        </div>
      </div>
      

      <div className='directors'>
        <h3>Directors</h3>
        <div className='trending d-flex'>
          {directors && directors.map((per) => {
            return (
              <Card style={{ flexShrink : "0" }}>
                  <Card.Img style={{ width: '10vw', height: "10vw", borderRadius: "50%" , flexShrink : "0" }} src={`https://image.tmdb.org/t/p/w500${per.profile_path}`} />
                  <Card.Text>{per.name}</Card.Text>
              </Card>
            )
          })
          }
        </div>


      </div>

      <div className='end' >
        <div className="center">
          <h3>TMDB</h3>
          <p>© 2021 TMDB</p>
        
        </div>

      </div>


    </div>
  );
}

export default MainPage;
