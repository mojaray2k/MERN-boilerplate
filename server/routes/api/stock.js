const request = require('superagent');

module.exports = (app) => {
    app.post('/api/stock/portfolio', (req, res, next) => {
        const apiKey = 'demo';
        // Assuming look up of user
        // Retrieve ticker symbols in their portfolio
        const tickers = ['MSFT'];

        //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
        let completed = 0;
        const results = [];
        
        for(let i = 0; i < tickers.length; i += 1){
            const ticker = tickers[i];
            request
                .get('https://www.alphavantage.co/query')
                .query({ "function": 'TIME_SERIES_DAILY' })
                .query({ symbol: ticker })
                .query({ apikey: apiKey })
                .then((response) => {
                    completed += 1;
                    //console.log('res', res);
                    results.push(response.body);
                    if(completed === tickers.length){
                        // All tickers are completed

                        console.log('completed');
                        res.send({
                            success: true,
                            message: 'Ticker Info',
                            results: results
                        })
                    }                    
            });
        }
        
    })
};