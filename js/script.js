const currencies = document.querySelector('#currencies'),
    selectedCurrency = currencies.options,
    currencyValue = document.querySelector('#currencyValue'),
    output = document.querySelector('#output'),
    api = `https://blockchain.info/tobtc?`;

currencyValue.addEventListener('keyup', convert)
currencies.addEventListener('change', convert)
document.addEventListener('DOMContentLoaded', fillDropdownList)

async function fillDropdownList() {
    const getCurrencyName = 'https://blockchain.info/ticker',
        response = await fetch(getCurrencyName),
        data = await response.json();
    Object.keys(data).forEach(currency => {
        let option = document.createElement('option');
        option.append(currency)
        currencies.appendChild(option)
    })
}

async function convert() {
    if (currencyValue.value === '') output.innerText = 0
    else {
        const response = await fetch(`${api}currency=${selectedCurrency[currencies.selectedIndex].text}&value=${currencyValue.value}`),
            data = await response.json();
        output.innerText = `btc ${data.toFixed(2)}`
    }
}