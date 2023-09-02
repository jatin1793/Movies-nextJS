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

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  const filteredData = trend.filter((el) => {
    if (inputText === '') {
      return true;
    } else {
      return el.title.toLowerCase().includes(inputText);
    }
  });





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
    <div className='main'>
      <div className='search'>
        <h2>Welcome. <br/> Millions of movies, TV shows and people to discover. Explore now.</h2>
        <div className="searchinp">
          <SearchIcon />
          <input type="text" placeholder="Search" onChange={inputHandler}/>
        </div>
      </div>

      <div className="contents">
        <div className='trendingg'>
          <h3>Trending Movies</h3>
          <div className='trending'>
            {filteredData && filteredData.map((item) => {
              return (
                <Card style={{ width: '15vw',backgroundColor:"#212529" ,flexShrink: "0", height: "50vh", borderRadius: "10px", overflowY: "hidden" }}>
                  <Link href={`/${item.id}`} style={{ textDecoration: "none" }}  >
                    <Card.Img style={{ width: '100%', height: "40vh" }} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "2vh", color:"white" }}>{item.title}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })
            }

          </div>
        </div>

        <div className='trendingg'>
          <h3>Trending TV shows</h3>
          <div className='trending'>
            {tv && tv.map((item) => {
              return (
                <Card style={{ width: '15vw',backgroundColor:"#212529" ,flexShrink: "0", height: "50vh", borderRadius: "10px", overflowY: "hidden" }}>
                  <Link href={`/tv/${item.id}`} style={{ textDecoration: "none" }}  >
                    <Card.Img style={{ width: '100%', height: "40vh" }} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "2vh", color:"white" }}>{item.original_name}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })
            }
          </div>
        </div>

        <div className='trendingg' style={{marginBottom:"10vh"}}>
          <h3>Popular People</h3>
          <div className='trending'>
            {directors && directors.map((per) => {
              return (
                <div style={{ flexShrink: "0"}}>
                  <div className='person' style={{marginRight:"2vh", alignItems: "center", display: "flex", flexDirection: "column", gap: "1vh"}} >
                    <img style={{ width: '10vw', height: "10vw", borderRadius: "50%", flexShrink: "0" }} src={`https://image.tmdb.org/t/p/w500${per.profile_path}`} />
                    <h6 style={{color:"white"}}>{per.name}</h6>
                  </div>
                </div>
              )
            })
            }
          </div>


        </div>
      </div>

      <div className='end' >
        <div className="center">
          <div className="credit">
            <h2>TMDB</h2>
            <p>© 2023 TMDB</p>
          </div>
          <div className="credit">
            <h5>THE BASICS</h5>
            <h6>About TMDB</h6>
            <h6>Contact Us</h6>
            <h6>Support Forums</h6>
            <h6>API</h6>
            <h6>System Status</h6>
          </div>
          <div className="credit">
            <h5>GET INVOLVED</h5>
            <h6>Contribution</h6>
            <h6>Add New Movie</h6>
            <h6>Add New TV show</h6>
          </div>
          <div className="credit">
            <h5>COMMUNITY</h5>
            <h6>Guidelines</h6>
            <h6>Discussions</h6>
            <h6>Leaderboard</h6>
            <h6>Twitter</h6>
          </div>
          
        
        </div>

      </div>


    </div>
  );
}

export default MainPage;
