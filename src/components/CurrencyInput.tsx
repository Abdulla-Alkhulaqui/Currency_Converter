"use client";

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { currencies } from "@/lib/currencyList";


export default function CurrencyInput({ val, setVal }: any) {
    const [open, setOpen] = useState(false);

    const getFullNameWithFlag = () => {
        if (val) {
            const curr = currencies.find((currency) => currency.name === val);
            return curr?.flag + " " + curr?.name + " — " + curr?.fullName;
        }
        return "Select currency..."
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[270px] justify-between"
                >
                    {getFullNameWithFlag()}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[270px] p-0">
                <Command>
                    <CommandInput placeholder="Search currency..." className="h-9" />
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {currencies.map((currency) => (
                                <CommandItem
                                    key={currency.fullName}
                                    value={currency.name}
                                    onSelect={(currentValue) => {
                                        setVal(currentValue === val ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {currency.flag} {currency.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            val === currency.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
