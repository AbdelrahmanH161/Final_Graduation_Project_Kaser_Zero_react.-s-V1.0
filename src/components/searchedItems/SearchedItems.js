import React,{useEffect} from 'react'
import Side from '../Side'
import SearchedContent from './SearchedContent'

function SearchedItems() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
        <div className="container mt-4" style={{overflow:'hidden'}}>
          <h3 className="mb-3">Searched Items</h3>
          <SearchedContent></SearchedContent>
        </div>
    </>
  )
}

export default SearchedItems