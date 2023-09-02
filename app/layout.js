"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import"./globals.css"




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar bg="dark" data-bs-theme="dark" style={{ position: "fixed" , zIndex: 99999999, width: "100%" }}>
          <Container>
            <Navbar.Brand style={{ marginRight: "4vw"}}>TMDB</Navbar.Brand>
            <Nav className="me-auto">

              <Nav.Link style={{ marginRight: "2vw"}} href='../../'>Home</Nav.Link>

              <Dropdown style={{ marginRight: "2vw"}}>
                <Dropdown.Toggle variant='dark' id="dropdown-basic" >Movies</Dropdown.Toggle> 
                <Dropdown.Menu>
                  <Dropdown.Item href="/categories/movies/popular-movies">Popular</Dropdown.Item>
                  <Dropdown.Item href="/categories/movies/now-playing-movies">Now Playing</Dropdown.Item>
                  <Dropdown.Item href="/categories/movies/upcoming-movies">Upcoming</Dropdown.Item>
                  <Dropdown.Item href="/categories/movies/top-rated-movies">Top Rated</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown style={{ marginRight: "2vw"}}>
                <Dropdown.Toggle variant='dark' id="dropdown-basic" >TV Shows</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/categories/tvshows/popular-tvshows">Popular</Dropdown.Item>
                  <Dropdown.Item href="/categories/tvshows/airing-tvshows">Airing</Dropdown.Item>
                  <Dropdown.Item href="/categories/tvshows/onTV-tvshows">On-TV</Dropdown.Item>
                  <Dropdown.Item href="/categories/tvshows/top-rated-tvshows">Top Rated</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link style={{ marginRight: "2vw"}}>People</Nav.Link>
              <Nav.Link>More</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        {children}</body>
    </html>
  )
}
