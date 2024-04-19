"use client"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import CurrencyInput from "./CurrencyInput";
import { Button } from "./ui/button";
import converter from "@/lib/convert";
import { useState } from "react";

export default function Converter() {
    const [fromValue, setFromValue] = useState("EUR");
    const [toValue, setToValue] = useState("USD");
    const [amount, setAmount] = useState(1);

    const getConversion = async () => {
        try {
            const res = await converter(fromValue, toValue, 4);
            console.log("red", res);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input className="w-full md:w-300" id="amount" type="number" />
                </div>

                <div className="flex flex-col space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div id="from" className="flex items-center">
                        <CurrencyInput val={fromValue} setVal={setFromValue} />
                    </div>
                </div>

                <Button className="rounded-3xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 17" aria-hidden="true" className="w-4"><path fill="currentColor" fillRule="evenodd" d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z" clipRule="evenodd"></path></svg>
                </Button>

                <div className="flex flex-col space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div id="to">
                        <CurrencyInput val={toValue} setVal={setToValue} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-col md:items-center md:justify-center md:space-x-4 mt-10">
                <p className="text-slate-600">1.00 US Dollar =</p>
                <h1 className="font-sans text-4xl mt-3 font-extrabold text-[#02c862]">1.00 US Dollar</h1>
            </div>
        </div>
    );
}
