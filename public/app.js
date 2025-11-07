const API_BASE_URL = 'http://localhost:3000/coins';  

async function fetchCoins() {
    try {
        const response = await fetch('/coins');
        const data = await response.json();
        console.log("Data received => " + data[0]);

        const list = document.getElementById('bitcoinList');
        list.innerHTML = '';

        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `BitCoin name: ${item.name}, symbol: ${item.symbol}, price: ${item.price}, marketCap: ${item.marketCap}, circulatingSupply: ${item.circulatingSupply}`;
            list.appendChild(li);
        });
    } catch (err) {
        console.error('Error loading data:', err);
    }
}

async function addCoin(event) {
    event.preventDefault();

    const name = document.getElementById('coinName').value;
    const symbol = document.getElementById('coinSymbol').value;
    const price = document.getElementById('coinPrice').value;
    const marketCap = document.getElementById('marketCap').value;
    const circulatingSupply = document.getElementById('circulatingSupply').value;
    const payload = {
        name,
        symbol,
        price: parseFloat(price),
        marketCap: parseFloat(marketCap),
        circulatingSupply: parseFloat(circulatingSupply)
    };
    console.log("Sending payload: ", payload);

    const res = await fetch('/coins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('Server response:', data);

    const messageEl = document.getElementById('message');

    if (res.ok && data.status === 'success') {
      messageEl.textContent = "Coin added successfully!";
      messageEl.style.color = "green";

      document.getElementById('coinForm').reset();
    } else {
      messageEl.textContent = "Failed to add coin: " + (data.message || 'Unknown error');
      messageEl.style.color = "red";
    }
}


async function deleteCoin() {

}

// Initial load
fetchCoins();