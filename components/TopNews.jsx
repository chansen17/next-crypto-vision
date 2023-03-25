import React from 'react';

const TopNews = ({ news, loading }) => {
    let articles = news;
    console.log('articles: ', articles);

    if(loading) {
        return <div className="h-screen w-full grid place-items-center">
            <p className="text-xl md:text-2xl">Loading..</p>
        </div>
    }
    
    return (
        <div className="py-12">
            <div className="mxw">

            </div>
        </div>
    );
}

export default TopNews;
