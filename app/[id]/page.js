"use client"
import React, { useEffect, useState, CSSProperties } from 'react'
import axios from 'axios'
import Link from "next/link"
import "../globals.css";
import YouTube, { YouTubeProps } from 'react-youtube';
import ClipLoader from "react-spinners/ClipLoader";


const style = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};
  
const page =  ({ params }) => {

    const [details, setdetails] = useState("")
    const [trailer, settrailer] = useState("")
    const [genres, setgenres] = useState("")

    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 500)
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=16242317f3764cb8c2c121692d453792`)
            .then((res) => {
                const pr = JSON.stringify(res.data);
                const dets = JSON.parse(pr)
                setdetails(dets)
                console.log(dets)
                const gen = dets.genres.map((e) => e.name);
                setgenres(gen)
            }
            )
            .catch((err) => {
                console.log(err)
            }
            )

            axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=16242317f3764cb8c2c121692d453792`)
            .then((res) => {
                const y = res.data.results;
                const yt = y.filter((x) => x.type === "Trailer" || x.type === "Teaser")
                const pr = JSON.stringify(yt[0]);
                const dets = JSON.parse(pr)
                settrailer(dets.key)
            }
            )
            .catch((err) => {
                console.log(err)
            }
            )
    }, [])

    const onPlayerReady = function (event) {
        event.target.pauseVideo();
    };

    const opts = {
        height: '270',
        width: '430',
        playerVars: {
              autoplay: 1,
        },
    };

    return (
        <div className='page' >
            {
                loading?
                    <div style={style}>
                        <ClipLoader
                            color={'#212529'}
                            loading={loading}
                            size={150}
                        />
                    </div>
                    :
                    <div >

                        <div className='drop'>
                            <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`} />
                            <div className='overlay'></div>
                        </div>

                        <div className='full'>
                            <img src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} />
                            <div className="dets">
                                <div className="box">
                                    <h3>{details.title}</h3>
                                </div>
                                <h6 style={{ color: "grey", fontWeight: "bold" }}>{details.tagline}</h6>
                                <div className="text_box_genres">
                                    <h6>{genres[0]}</h6>
                                    <h6>{genres[1]}</h6>
                                    <h6>{genres[2]}</h6>
                                </div>
                                <div className="text_box">
                                    <h6>{details.overview}</h6>
                                </div>

                                <Link href={`${details.homepage}`}
                                    style={{ textDecoration: "none", marginTop: "5vh" }}>
                                    Click to see more ...
                                </Link>
                            </div>
                        </div>

                        <div className='trailer'>
                            {trailer ? (
                                <YouTube
                                    videoId={`${trailer}`}
                                    opts={opts}
                                    onReady={onPlayerReady}
                                />
                            ) : (
                                <p style={{ color: "red" }}>No trailer available !!</p>
                            )}
                        </div>
                    </div>
            }


        </div>
    );
};
export default page