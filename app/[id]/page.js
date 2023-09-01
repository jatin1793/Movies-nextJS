"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from "next/link"
import "../[id]/page.css"
import YouTube, { YouTubeProps } from 'react-youtube';

const page =  ({ params }) => {

    const [details, setdetails] = useState("")
    const [trailer, settrailer] = useState("")
    const [genres, setgenres] = useState("")

    useEffect(() => {
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
            //   autoplay: 1,
        },
    };

    return (

        <div className='page' >
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

                    <YouTube videoId={`${trailer}`}
                        opts={opts}
                        onReady={onPlayerReady}
                        style={{ marginLeft: '35vw', marginTop: "-28vh", position: "absolute" }}
                    />
                </div>
            </div>
        </div>
    );
};
export default page