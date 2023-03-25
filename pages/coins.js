import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { motion } from 'framer-motion';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchCoins = async () => {
            setLoading(true);
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true`);
            const data = await res.json();
            setCoins(data);
            setLoading(false);
        }

        return () => {
            fetchCoins();
        }

    }, []);

    if(loading) {
       return (
        <div className="h-screen w-full grid place-items-center">
            <p className="text-xl md:text-2xl">Loading ..</p>
        </div>
       )
    };

    return (
        <div className="py-24 md:py-32">
            <div className="mxw overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="min-w-full">
                    <tr>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Rank
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Name
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Price
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Market Cap
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        24h Change
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        7 day price
                        </th>
                        <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Action
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {coins?.map((coin) => (
                        <motion.tr initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0}} transition={{ delay: .15, duration: .5 }} key={coin?.id} className="text-md md:text-lg hover:bg-gray-100 group">
                        <td className="px-6 py-4 whitespace-nowrap">
                            # {coin?.market_cap_rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-5">
                            <Image height={90} width={90} className="w-10 h-10 md:h-12 md:w-12" src={coin?.image} alt="image" />
                            <div>
                                <small className="uppercase text-xs">{coin?.symbol}</small>
                                <h2>{coin?.name}</h2>
                            </div>
                        </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            ${coin?.current_price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            ${coin?.market_cap.toLocaleString()}
                            </td>
                            <td
                            className={`px-6 py-4 whitespace-nowrap ${
                                coin?.price_change_percentage_24h >= 0
                                ? 'text-green-500'
                                : 'text-rose-500'
                            }`}
                            >
                            {coin?.price_change_percentage_24h.toFixed(2)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <Sparklines data={coin?.sparkline_in_7d?.price} style={{ width: '150px'}}>
                                <SparklinesLine style={{ fill: 'none'}} color={coin?.price_change_percentage_24h < 0 ? 'red' : 'green'} />
                            </Sparklines>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link className="py-2 px-4 rounded-md bg-gray-200 group-hover:bg-gray-800 group-hover:text-gray-200 text-black" href={`/details/${coin?.id}`}>Details</Link>
                            </td>
                        </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Coins;
