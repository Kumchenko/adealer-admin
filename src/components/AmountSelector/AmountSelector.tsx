import { useMemo } from 'react'
import { AmountSelectorProps } from './interfaces'

const AmountSelector = ({ amount, amounts, changeAmount }: AmountSelectorProps) => {
    const options = useMemo(
        () =>
            amounts.map(amount => (
                <option key={amount} value={amount}>
                    {amount}
                </option>
            )),
        [amounts],
    )
    return (
        <div className="flex items-center rounded-3xl border bg-violet-white px-3 py-1">
            <span className="mr-2 text-lg">Items:</span>
            <select className="bg-transparent" value={amount} onChange={e => changeAmount(parseInt(e.target.value))}>
                {options}
            </select>
        </div>
    )
}

export default AmountSelector
