// currency converter page
import { useState } from 'react';

export default function CurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('100');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // popular travel currencies
    const currencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'KRW', name: 'South Korean Won' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'SGD', name: 'Singapore Dollar' },
        { code: 'NZD', name: 'New Zealand Dollar' },
        { code: 'ZAR', name: 'South African Rand' }
    ];

    const convertCurrency = async () => {
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:3003/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Conversion failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#0081A7' }}>
                Currency Converter
            </h1>

            {/* Description */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', borderColor: '#F07167' }}>
                <p className="text-sm" style={{ color: '#0081A7' }}>
                    Convert currencies for travel planning and client budget discussions. Get real-time exchange rates for popular travel destinations.
                </p>
            </div>

            {/* Converter Form */}
            <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="100"
                            min="0"
                            step="0.01"
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        />
                    </div>

                    {/* From Currency */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            From
                        </label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        >
                            {currencies.map(currency => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex items-end">
                        <button
                            onClick={swapCurrencies}
                            className="w-full p-3 rounded-md border font-medium"
                            style={{ borderColor: '#00AFB9', color: '#00AFB9' }}
                        >
                            ⇄ Swap
                        </button>
                    </div>

                    {/* To Currency */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0081A7' }}>
                            To
                        </label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full p-3 rounded-md border"
                            style={{ borderColor: '#00AFB9' }}
                        >
                            {currencies.map(currency => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Convert Button */}
                <div className="mt-4">
                    <button
                        onClick={convertCurrency}
                        disabled={loading}
                        className="px-6 py-2 rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#00AFB9' }}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Converting...
                            </>
                        ) : (
                            'Convert Currency'
                        )}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FED9B7', border: '1px solid #F07167' }}>
                    <p style={{ color: '#0081A7' }}>
                        {error}
                    </p>
                </div>
            )}

            {/* Result Display */}
            {result && (
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDFCDC' }}>
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#0081A7' }}>
                        Conversion Result
                    </h3>
                    
                    <div className="p-4 rounded-lg text-center" style={{ backgroundColor: '#FED9B7', border: '1px solid #00AFB9' }}>
                        <div className="text-3xl font-bold mb-3" style={{ color: '#0081A7' }}>
                            {result.inputAmount} {result.from} = {result.outputAmount} {result.to}
                        </div>
                        <div className="text-lg mb-2" style={{ color: '#0081A7' }}>
                            Exchange Rate: 1 {result.from} = {result.exchangeRate} {result.to}
                        </div>
                        <div className="text-sm" style={{ color: '#F07167' }}>
                            Updated: {result.dateTime}
                        </div>
                    </div>
                </div>
            )}

            {/* Getting Started */}
            {!result && !loading && !error && (
                <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#FDFCDC' }}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#0081A7' }}>
                        Convert Travel Currencies
                    </h3>
                    <p style={{ color: '#F07167' }}>
                        Enter an amount and select currencies to get real-time exchange rates. Perfect for travel planning and client budget discussions.
                    </p>
                </div>
            )}
        </div>
    );
}