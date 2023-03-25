import React, { useEffect, useState } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { useRouter } from 'next/router';

const details = () => {
    let router = useRouter();
    let { id } = router.query;

    const [coin, setCoin] = useState(null);

    useEffect(() => {

        const fetchDetails = async () => {
            try {

                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&sparkline=true`);
                const data = await res.json();
                setCoin(data);

            } catch(error) {
                console.log('error occured in fetching details for coin');
            }
        }

        return () => {
            fetchDetails();
        }

    }, [id])

    return (
        <div className='py-24 md:py-32'>
            <div className="mxw">
                <section className="flex items-center justify-between gap-6 md:gap-12">
                    <div className="flex items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-3">
                            <img className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover" src={coin?.image?.small} alt={`${id} symbol`} />
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800">{coin?.name}</h1>
                        </div>
                        <div>
                            <a target="_blank" rel="noreferrer" href={coin?.links?.homepage[0] || coin?.links?.blockchain_site[0]}>Visit Website</a>
                        </div>
                    </div>
                </section>
                <section className="py-12 gap-4 md:gap-8">
                    <div className="w-full flex flex-wrap items-start justify-start gap-2 md:gap-3">
                        <div className="border p-4 rounded-lg flex flex-col items-center justify-center">
                            <small>Market Cap Rank</small><br/>
                            # {coin?.market_cap_rank}
                        </div>
                        <div className="border p-4 rounded-lg flex flex-col items-center justify-center">
                            <small>Current Price</small><br/>
                            <span className="text-green-400">${coin?.market_data?.current_price?.usd.toLocaleString() || 'n/a'}</span>
                        </div>
                        {coin?.market_data?.low_24h?.USD ? (
                            <div className="border p-4 rounded-lg flex flex-col items-center justify-center">
                                <small>Low 24h</small><br/>
                                <span className="text-green-400">${coin?.market_data?.low_24h?.usd?.toLocaleString() || 'n/a'}</span>
                            </div>
                        ) : null}
                        {coin?.market_data?.high_24h?.USD ? (
                            <div className="border p-4 rounded-lg flex flex-col items-center justify-center">
                                <small>High 24h</small><br/>
                                <span className="text-green-400">${coin?.market_data?.high_24h?.usd?.toLocaleString() || 'n/a'}</span>
                            </div>
                        ) : null}
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>All Time High</small><br/>
                            $ {coin?.market_data?.ath?.usd?.toLocaleString() || 'n/a'}
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>All Time Low</small><br/>
                            $ {coin?.market_data?.atl?.usd?.toLocaleString() || 'n/a'}
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>Circulating Supply</small><br/>
                            {coin?.market_data?.circulating_supply?.toLocaleString() || 'n/a'}
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>Total Supply</small><br/>
                            {coin?.market_data?.total_supply?.toLocaleString() || 'n/a'}
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>Block Transaction Time</small><br/>
                            {coin?.block_time_in_minutes} min.
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center truncate">
                            <small>Contract Address</small><br/>
                            {coin?.contract_address}
                        </div>
                        <div className="border p-4 rounded-lg flex items-center flex-col justify-center">
                            <small>All Time High diff.</small><br/>
                            <span className={coin?.market_data?.ath_change_percentage?.usd < 0 ? "text-rose-500" : "text-sky-500"}>{coin?.market_data?.ath_change_percentage?.usd?.toFixed(2)}%</span>
                        </div>
                        <div className="border p-3 rounded-lg grid place-items-center">
                        <Sparklines data={coin?.market_data?.sparkline_7d?.price} style={{ width: '100%'}}>
                            <SparklinesLine color="orange" style={{ fill: 'none' }}/>
                            <SparklinesReferenceLine type="mean" />
                        </Sparklines>
                        </div>
                    </div>
                </section>
                {coin?.description?.en && (
                <section className="py-12 p-4 rounded-lg border">
                    <p className="text-lg md:text-xl">What is {id}</p><br/>
                    <p style={{ lineHeight: '1.5'}} className="text-lg md:text-xl">{coin?.description?.en.replace(/(<([^>]+)>)/ig, '')}</p>
                </section>
                )}
            </div>
        </div>
    );
}

export default details;
