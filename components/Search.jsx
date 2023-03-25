import React, { useState } from 'react';
import { useRouter } from 'next/router';
 
const Search = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleQuery = (e) => {
        e.preventDefault(); 

        if(query !== '') {
            try {
                router.push(`/results/${query}`)
            } catch(error) {
                console.error(error);
            }
        }

        setQuery('');
    }

    return (
        <div className="w-1/2">
            <form onSubmit={handleQuery} className='flex bg-gray-800'>
                <input className="w-full py-2 px-3 rounded-l-sm outline-none bg-gray-800 border-b-2 border-b-gray-700 text-lg md:text-xl text-orange-400/90 font-light" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a cryptocurrency" />
                <button type="submit" className="py-2 px-4 rounded-r-sm bg-gray-700 text-lg md:text-xl">Search</button>
            </form>
        </div>
    );
}

export default Search;
