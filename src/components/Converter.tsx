"use client"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import CurrencyInput from "./CurrencyInput";
import { Button } from "./ui/button";
import converter from "@/lib/convert";
import { useState, useEffect, useCallback } from "react";

export default function Converter() {
    const [fromValue, setFromValue] = useState("EUR");
    const [toValue, setToValue] = useState("USD");
    const [amount, setAmount] = useState<number | "">(1);
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const swapCurrencies = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    };

    const convert = useCallback(async () => {
        if (amount === "" || amount <= 0) return;

        setLoading(true);
        setError(null);
        try {
            const result = await converter(fromValue, toValue, Number(amount));
            setConvertedAmount(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Conversion failed");
            setConvertedAmount(null);
        } finally {
            setLoading(false);
        }
    }, [fromValue, toValue, amount]);

    useEffect(() => {
        convert();
    }, [convert]);


    function formatMoney(amount: string | number) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="flex justify-center items-center flex-wrap">
            <div className="flex flex-col justify-center items-center flex-wrap space-y-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                        className="w-full"
                        id="amount"
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                        onKeyDown={(e) => e.key === "Enter" && convert()}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1 flex flex-col space-y-2 my-10">
                        <Label htmlFor="from">From</Label>
                        <CurrencyInput val={fromValue} setVal={setFromValue} />
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={swapCurrencies}
                        className="rounded-full mt-5"
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" className="w-10 h-7 p-2 ">
                            <path fill="currentColor" fillRule="evenodd" d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-.94-.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z" clipRule="evenodd" />
                        </svg>
                    </Button>

                    <div className="flex-1 flex flex-col space-y-2">
                        <Label htmlFor="to">To</Label>
                        <CurrencyInput val={toValue} setVal={setToValue} />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-center mt-4">
                        Error: {error}
                    </div>
                )}

                {convertedAmount !== null && !error && (
                    <div className="text-center mt-4 p-4 bg-secondary rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            {formatMoney(amount)} {fromValue} =
                        </p>
                        <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mt-2">
                            {formatMoney(convertedAmount.toFixed(2))} {toValue}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}