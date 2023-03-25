import Link from 'next/link';
import Image from 'next/image';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { motion } from 'framer-motion';

const TopCoins = ({ topCoins, loading }) => {
    console.log('topCoins: ', topCoins);

    if(loading) {
        return <p className="w-full text-center text-xl md:text-2xl">Loading..</p>
    }

    return (
        <div className="py-24 md:py-32">
            <div className="mxw">
                <div className="overflow-x-auto">
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
                        {topCoins?.map((coin) => (
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
        </div>
    );
}

export default TopCoins;
