"use client"
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import "./page.css"
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className='search bg-transparent p-4 '>
        <SearchIcon />
        <input type="text" placeholder="Search" />
      </div>
  )
}

export default Search