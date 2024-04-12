export const BalanceaBar = ({balance}) => {
    return (
          <div className="flex gap-4 px-4 py-8">
             <div className="font-bold">Your Balance</div>
             <div className="font-semibold">Rs {balance}</div>
          </div>
    )   ;
};