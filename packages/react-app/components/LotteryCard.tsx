import { ethers } from 'ethers'
import { timestampToDate, lotteryElapsed, truncate } from '../utils'
import { useAccount } from 'wagmi'

interface LotteryCardProps {
  id: number;
  owner: string;
  title: string;
  price: number;
  participants: number;
  winner: string;
  endTime: any;
  ended: boolean;
  enterLotteryHandler: (id: number, price: number) => void;
  endLotteryHandler: (id: number) => void;
}



const LotteryCard: React.FC<LotteryCardProps> = ({
     id,
     owner,
     title,
     price,
     participants,
     winner,
     endTime,
     ended,
     enterLotteryHandler,
     endLotteryHandler
   }) => {

  const { address } = useAccount()


  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="mb-4 font-bold">{title} <br/>
        <span className="font-light">{ethers.utils.formatEther(price)} CELO</span></h2>
        <div className="flex justify-between">
          <div className="mr-4">
            <p>Participants</p>
            <span>{participants}</span>
          </div>
          <div>
            <p>End Date</p>
            <span>{timestampToDate(endTime.toNumber())}</span>
          </div>
        </div>
        <div>
          {!ended && !lotteryElapsed(endTime) && (owner !== address) && <button onClick={() => enterLotteryHandler(id, price)} className="mt-3 bg-slate-300 w-28 rounded">
            Buy
          </button>}
          {!ended && lotteryElapsed(endTime) && <button onClick={() => endLotteryHandler(id)} className="mt-3 bg-slate-300 w-28 rounded">
            End Lottery {ended}
          </button>}
          {ended && <div><button disabled className="mt-3 bg-slate-200 w-28 rounded">
            Lottery Ended
          </button>
          <br/>
          <small>Winner: {truncate(winner)}</small>
          </div>}
        </div>
      </div>
  );
};

export default LotteryCard
