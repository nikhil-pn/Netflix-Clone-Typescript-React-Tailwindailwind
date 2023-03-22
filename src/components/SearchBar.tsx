// import React, { useRef, useState } from 'react'
// import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon"

// export default function SearchBar() {
//     const [open, setopen] = useState(false)
//     const strokeWidth = {strokeWidth : ".2rem"}

//     const inputRef = useRef<HTMLInputElement>(null)
//     function toggleSearch() {
//         if(!open){
//             inputRef.current?.focus()
//         }
//         setopen(!open)
//     }

//   return (
//    <section className='flex items-center w-[300px] overflow-hidden'>
//     <button className={`h-8 ${!open ? "w-8": "w-0"}`}>
//         <SearchIcon style={strokeWidth} onClick={toggleSearch}></SearchIcon>
//     </button>
//     <section className={`${open ? "w-full border border-white": "w-0"} flex items-center gap-2 bg-dark ml-2`}>
//         <button className='h-8 w-8 ml-2'>
//             <SearchIcon style={strokeWidth}></SearchIcon>
//         </button>
//         <input ref={inputRef} className='w-full bg-dark outline-none' type="text" name='searchbar' id='seerchbar' />
//     </section>
//    </section>
//   )
// }

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  searchThrem: string;
  setSearchTerm: any;
};

function Search({ setSearchTerm, searchThrem }: Props) {
  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-transparent hover:bg-gray-900 px-4 rounded-xl items-center text-center flex">
        <input
          value={searchThrem}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Movie"
          className="bg-transparent text-lg font-medium hover:bg-gray-900 w-[400px] h-[50px] px-4 py-2 rounded-xl placeholder:text-lg font-md text-white outline-none  focus:bg-gray-900"
        />
        <button className="px-2.5">
          <AiOutlineSearch className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default Search;