export default async function converter(from: string, to: string, amount: number) {
    const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.rates || !data.rates[to]) {
            throw new Error(`Conversion rate from ${from} to ${to} not found`);
        }

        const rate = data.rates[to];
        const convertedAmount = amount * rate;

        return convertedAmount;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
