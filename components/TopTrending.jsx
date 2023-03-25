import Link from 'next/link';
import Image from 'next/image';


const TopTrending = ({ trending, loading }) => {

    if(loading) {
        return <p className="w-full text-center text-xl md:text-2xl">Loading..</p>
    }

    return (
        <div className='py-12'>
            <div className="w-full flex flex-col">
                {trending && trending.map((coin) => (
                <Link href={`/details/${coin?.item?.id}`} key={coin?.item?.id} className="p-3 border border-slate-800 rounded-lg shadow-lg flex items-center gap-3 odd:bg-sky-50">
                    <div>
                        <Image width={90} height={90}  className="h-14 w-14 rounded-full object-cover" src={coin?.item?.large} alt="coin symbol" />
                    </div>
                    <div>
                        <small>#{coin?.item?.market_cap_rank}</small>
                        <h2 className="text-xl font-bold">{coin?.item?.name}</h2>
                        <p className="uppercase mt-2">{coin?.item?.symbol}</p>
                        <p className="text-2xl font-bold mt-4">{coin?.item?.price}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    );
}

export default TopTrending;
