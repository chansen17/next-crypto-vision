import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

const results = () => {
    const router = useRouter();
    let { id } = router.query;
    const [coins, setCoins] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${id}`);
            const data = await res.json();
            setCoins(data?.coins);
            console.log('searxh results: ', data);
            setLoading(false);
        }
        
        return () => {
            fetchCoins();
        }

    }, [id])

    if(loading) {
        return <div className="h-screen w-full grid place-items-center text-black">
            <span className="text-2xl">Loading</span>
        </div>
    }

    return (
        <motion.div initial={{ opacity: 0, x: -10}} animate={{ opacity: 1, x: 0}} transition={{ delay: .15, duration: 1}}>
        <div className="py-24 md:py-32 w-full">
            <div className="mxw grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                  {coins?.map((coin) => (
                    <Link key={coin?.id} href={`/details/${coin?.id}`} className="w-full h-full rounded-lg border border-blue-500 hover:border-slate-600 p-3 flex items-center gap-2 md:gap-4 hover:-translate-y duration-200 cursor-pointer">
                        <div>
                            <img className="h-9 w-9 md:h-12 md:w-12 rounded-full object-cover" src={coin?.large} alt="" />
                        </div>
                        <div>
                            <small>{coin?.symbol}</small>
                            <h2>{coin?.name}</h2>
                        </div>
                    </Link>
                  ))}
            </div>
        </div>
        </motion.div>
    );
}

export default results;
