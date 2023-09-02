"use client"
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import "../../.css"
import SearchIcon from '@mui/icons-material/Search';



function MainPage() {

  const [upcoming, setupcoming] = useState([]);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
 

const filteredData = upcoming.filter((el) => {
  if (inputText === '') {
    return true; 
  } else {
    return el.title.toLowerCase().includes(inputText);
  }
});


  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=16242317f3764cb8c2c121692d453792")
      .then((res) => {
        setupcoming(res.data.results)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )
  },[])

  return (

    <div className='main w-100 h-100'>

      <div className='contain'>
        <div className="searchinp">
          <SearchIcon />
          <input type="text" placeholder="Search" onChange={inputHandler} />
        </div>
        <h3>Upcoming movies</h3>
        <div className='row'>
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
    </div>
  );
}

export default MainPage;
