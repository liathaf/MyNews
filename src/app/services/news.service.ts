import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs'

// interfaces
import { News } from '../interfaces/news.interface'
import { Article } from '../interfaces/article.interface'



@Injectable()

export class NewsService {

    private fakeNews: Article[] = [{
        "source": {
            "id": null,
            "name": "Slashdot.org"
        },
        "author": "msmash",
        "title": "First Bitcoin ETF Could Be Coming Soon as Court Rules in Favor of Grayscale Over SEC",
        "description": "The U.S. Court of Appeals for the D.C. Circuit has paved the way for bitcoin exchange-traded funds. From a report: On Tuesday, the court sided with Grayscale in a lawsuit against the Securities and Exchange Commission which had denied the company's applicatio…",
        "url": "https://slashdot.org/story/23/08/29/1816233/first-bitcoin-etf-could-be-coming-soon-as-court-rules-in-favor-of-grayscale-over-sec",
        "urlToImage": "https://a.fsdn.com/sd/topics/bitcoin_64.png",
        "publishedAt": "2023-08-29T19:20:00Z",
        "content": "On Tuesday, the court sided with Grayscale in a lawsuit against the Securities and Exchange Commission which had denied the company's application to convert the Grayscale Bitcoin Trust to an ETF. The… [+1393 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Phil Rosen",
        "title": "'You made it through winter': Anthony Scaramucci shares 3 reasons why he's still bullish on bitcoin",
        "description": "\"Every single Wall Street firm is going to have a bitcoin ETF in their arsenal,\" the Skybridge Capital founder told attendees at Messari Mainnet.",
        "url": "https://markets.businessinsider.com/news/currencies/anthony-scaramucci-bitcoin-outlook-skybridge-capital-crypto-messari-mainnet-conference-2023-9",
        "urlToImage": "https://i.insider.com/650b62ed12dc4f001a176ecb?width=1200&format=jpeg",
        "publishedAt": "2023-09-21T14:05:00Z",
        "content": "Anthony Scaramucci at Messari Mainnet, 2023.Phil Rosen/Insider\r\n<ul>\n<li>Anthony Scaramucci believes the next decade will be \"remarkably bullish\" for bitcoin.</li>\n<li>At the Messari Mainnet conferen… [+2015 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Phil Rosen",
        "title": "Bitcoin just had its 2nd-straight losing month as crypto sold off in August along with stocks and bonds",
        "description": "The world's biggest cryptocurrency failed to eke out a gain in August even as crypto investors cheered Grayscale's win over the SEC.",
        "url": "https://markets.businessinsider.com/news/currencies/bitcoin-price-crypto-token-august-stocks-bonds-equities-markets-investors-2023-9",
        "urlToImage": "https://i.insider.com/64f217441e6afd00196a380f?width=1200&format=jpeg",
        "publishedAt": "2023-09-01T17:42:25Z",
        "content": "bitcoin cryptocurrency digital currencyEdward Smith/Getty Images\r\n<ul>\n<li>Bitcoin finished August about 10% lower, its second consecutive losing month. </li>\n<li>Crypto was caught up in a tough sell… [+2148 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Zahra Tayeb",
        "title": "About 200 million people trade bitcoin – but only 6 are billionaires",
        "description": "The findings from the Henley & Partners' Crypto Wealth Report come as bitcoin struggles to maintain its 2023 rally.",
        "url": "https://markets.businessinsider.com/news/currencies/crypto-wealth-six-bitcoin-billionaires-globally-2023-9",
        "urlToImage": "https://i.insider.com/6418595ffa3bcb001907f72c?width=1200&format=jpeg",
        "publishedAt": "2023-09-07T08:11:22Z",
        "content": "Bitcoin is up about 55% this year.Getty Images\r\n<ul>\n<li>Of about 200 people globally who trade bitcoin, just six are billionaires, Henley & Partners found.</li>\n<li>Meanwhile, 22 people worldwide ha… [+1504 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Filip De Mott",
        "title": "MicroStrategy purchased another $150 million in bitcoin since August as prices tumbled",
        "description": "Based on current market prices, MicroStrategy's stockpile of 158,245 bitcoins is equal to over $4.1 billion.",
        "url": "https://markets.businessinsider.com/news/currencies/microstrategy-150-million-bitcoin-purchases-cryptocurrency-market-selloff-michael-saylor-2023-9",
        "urlToImage": "https://i.insider.com/631133643fe7c40019e4f2fd?width=1200&format=jpeg",
        "publishedAt": "2023-09-26T14:48:34Z",
        "content": "Michael Saylor is facing a $100 million lawsuit for tax evasionMarco Bello/Getty Images\r\n<ul>\n<li>MicroStrategy added 5,455 bitcoins between August 1 and September 24, an SEC filing shows.</li>\n<li>S… [+1842 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Zahra Tayeb",
        "title": "Cathie Wood's ARK and 21Shares plan America's first ether ETF as race to open spot bitcoin funds heats up",
        "description": "The joint SEC filing comes as the race to launch the first exchange-traded fund backed by bitcoin gathers pace.",
        "url": "https://markets.businessinsider.com/news/etf/cathie-wood-ark-21shares-file-first-ether-etf-bitcoin-race-2023-9",
        "urlToImage": "https://i.insider.com/633c32e96427060019ef2f65?width=1200&format=jpeg",
        "publishedAt": "2023-09-07T10:33:27Z",
        "content": "Cathie Wood controls ARK.Rebecca Blackwell/AP\r\n<ul>\n<li>Cathie Wood's Ark fund and 21Shares are planning America's first spot ether ETF. </li>\n<li>They filed an SEC application Wednesday as a race to… [+1827 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "ReadWrite"
        },
        "author": "Alan Draper",
        "title": "15 Best Bitcoin Casinos for 2023 – Compare Crypto Casino Sites",
        "description": "Bitcoin casinos offer many advantages that cannot be rivaled by regular gambling sites. This includes huge welcome packages, instant payouts, […]\nThe post 15 Best Bitcoin Casinos for 2023 – Compare Crypto Casino Sites appeared first on ReadWrite.",
        "url": "https://readwrite.com/cryptocurrency/best-crypto-casinos/",
        "urlToImage": "https://readwrite.com/wp-content/uploads/2023/08/dice-5012425_1280.jpg",
        "publishedAt": "2023-08-30T10:28:43Z",
        "content": "Bitcoin casinos offer many advantages that cannot be rivaled by regular gambling sites. This includes huge welcome packages, instant payouts, 24/7 customer support, and an anonymous gambling experien… [+47670 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Zahra Tayeb",
        "title": "Bitcoin has plunged almost 20% since Standard Chartered predicted the crypto could surge to $120,000",
        "description": "The world's largest cryptocurrency has had a weak August, finishing 10% lower for the second month in a row amid a broader sell-off in stocks and bonds.",
        "url": "https://markets.businessinsider.com/news/currencies/bitcoin-plunges-almost-20-percent-since-standard-chartered-predicted-120000-2023-9",
        "urlToImage": "https://i.insider.com/63d9258f0a08ae0018a62696?width=1200&format=jpeg",
        "publishedAt": "2023-09-05T13:38:23Z",
        "content": "Namthip Muanthongthae/Getty Images\r\n<ul>\n<li>Bitcoin has plunged almost 20% since the second week of July, when Standard Chartered predicted it could surge to $120,000. </li>\n<li>The cryptocurrency h… [+1768 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Phil Rosen",
        "title": "CHART OF THE DAY: Investors have yanked nearly $500 million from crypto funds this summer",
        "description": "The half a billion dollars in outflows have come amid recent legal victories in the crypto space and growing hopes for a bitcoin ETF.",
        "url": "https://markets.businessinsider.com/news/funds/crypto-market-outlook-investors-outflows-funds-coinshares-assets-finance-currency-2023-9",
        "urlToImage": "https://i.insider.com/650894d5cd637c0019c730bb?width=1200&format=jpeg",
        "publishedAt": "2023-09-18T19:21:36Z",
        "content": "Crypto asset fund flows have declined since 2021's peak.CoinShares\r\n<ul>\n<li>Over the last nine weeks, outflows from crypto funds have totalled $455 million, according to CoinShares. </li>\n<li>Bitcoi… [+2093 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Slashdot.org"
        },
        "author": "BeauHD",
        "title": "Texas Cryptomining Outfit Earns More From Idling Rigs Than Digging Bitcoin",
        "description": "Bitcoin mining outfit Riot Platforms earned $31.7 million from Texas power authorities last month for curtailing operations -- far more than the value of the Bitcoin it mined in the same period. The Register reports: In a press release yesterday, Riot said it…",
        "url": "https://slashdot.org/story/23/09/08/0556225/texas-cryptomining-outfit-earns-more-from-idling-rigs-than-digging-bitcoin",
        "urlToImage": "https://a.fsdn.com/sd/topics/bitcoin_64.png",
        "publishedAt": "2023-09-08T10:00:00Z",
        "content": "In a press release yesterday, Riot said it produced 333 Bitcoin at its mining operations in Rockdale, Texas, which would have been worth just shy of $9 million on August 31. All the cash earned from … [+1055 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "ReadWrite"
        },
        "author": "Michael Graw",
        "title": "10 Best Bitcoin Casinos with Instant Withdrawals & Payouts 2023",
        "description": "A smooth and efficient payment system is the foundation of every successful gaming website. That’s even more important when you’re […]\nThe post 10 Best Bitcoin Casinos with Instant Withdrawals & Payouts 2023 appeared first on ReadWrite.",
        "url": "https://readwrite.com/cryptocurrency/instant-withdrawal-bitcoin-casinos/",
        "urlToImage": "https://readwrite.com/wp-content/uploads/2023/08/instant-withdrawal-crypto-casinos.png",
        "publishedAt": "2023-08-31T14:47:28Z",
        "content": "A smooth and efficient payment system is the foundation of every successful gaming website. Thats even more important when youre gaming with Bitcoin. Besides security, casino players opt for this cry… [+27569 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "ReadWrite"
        },
        "author": "Alan Draper",
        "title": "15 Best Bitcoin Gambling Sites in 2023 – Compare Crypto Gambling Sites",
        "description": "Crypto gambling sites are becoming increasingly popular. Some of the offered perks include instant deposits and withdrawals, anonymous accounts, and […]\nThe post 15 Best Bitcoin Gambling Sites in 2023 – Compare Crypto Gambling Sites appeared first on ReadWrit…",
        "url": "https://readwrite.com/cryptocurrency/best-bitcoin-gambling-sites/",
        "urlToImage": "https://readwrite.com/wp-content/uploads/2023/08/image17-2-900x504.png",
        "publishedAt": "2023-08-31T09:59:50Z",
        "content": "Crypto gambling sites are becoming increasingly popular. Some of the offered perks include instant deposits and withdrawals, anonymous accounts, and huge welcome packages for new players. But sifting… [+45916 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Xataka.com"
        },
        "author": "Enrique Pérez",
        "title": "La victoria legal de Grayscale es una alegría para el Bitcoin. Y ya se está notando en el precio",
        "description": "El mundo cripto aplaude la decisión de los tribunales con Grayscale. La Comisión de Bolsa y Valores de los Estados Unidos (SEC) ha perdido su batalla contra la firma de inversiones Grayscale. En juego estaba si los ETF de Bitcoin eran legales. Y la Corte de D…",
        "url": "https://www.xataka.com/criptomonedas/victoria-legal-grayscale-alegria-para-bitcoin-se-esta-notando-precio",
        "urlToImage": "https://i.blogs.es/2c3785/grayscale/840_560.jpeg",
        "publishedAt": "2023-08-30T09:01:27Z",
        "content": "El mundo cripto aplaude la decisión de los tribunales con Grayscale. La Comisión de Bolsa y Valores de los Estados Unidos (SEC) ha perdido su batalla contra la firma de inversiones Grayscale. En jueg… [+3031 chars]"
    },
    {
        "source": {
            "id": "business-insider",
            "name": "Business Insider"
        },
        "author": "Matthew Fox",
        "title": "US stocks surge after jobs data takes pressure off of interest rates",
        "description": "A decline in job openings means wage pressures should ease, which would give the Federal Reserve some breathing room in its interest rate plans.",
        "url": "https://markets.businessinsider.com/news/stocks/stock-market-news-today-jolts-job-data-interest-rates-fall-2023-8",
        "urlToImage": "https://i.insider.com/626ff9cb86fa90001905fcd2?width=1200&format=jpeg",
        "publishedAt": "2023-08-29T20:16:18Z",
        "content": "Traders work on the floor at the opening bell of the Dow Industrial Average at the New York Stock Exchange on March 18, 2020 in New York.Bryan R. Smith/AFP/Getty Images\r\n<ul><li>US stocks surged on T… [+2780 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Slashdot.org"
        },
        "author": "msmash",
        "title": "LSE Group Draws Up Plans for Blockchain-based Digital Assets Business",
        "description": "The London Stock Exchange Group has drawn up plans for a new digital markets business, saying this will make it the first major exchange to offer extensive trading of traditional financial assets on the blockchain technology best known for powering cryptocurr…",
        "url": "https://tech.slashdot.org/story/23/09/04/154248/lse-group-draws-up-plans-for-blockchain-based-digital-assets-business",
        "urlToImage": "https://a.fsdn.com/sd/topics/technology_64.png",
        "publishedAt": "2023-09-04T15:05:00Z",
        "content": "Murray Roos, head of capital's markets at the LSE Group, told the Financial Times that the company had been examining the potential for a blockchain-powered trading venue for about a year, and had re… [+743 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Texas Monthly"
        },
        "author": "Dan Solomon",
        "title": "Texas pays Bitcoin miner to not mine",
        "description": "Paying Bitcoin companies to turn off their energy-gobbling computers is apparently our best plan to keep the power on for the rest of us.",
        "url": "https://www.texasmonthly.com/news-politics/texas-bitcoin-miner-riot-31-million-energy-credits/",
        "urlToImage": "https://img.texasmonthly.com/2023/09/ercot-bitcoin-miners.jpg?auto=compress&crop=faces&fit=fit&fm=pjpg&ixlib=php-3.3.1&q=45",
        "publishedAt": "2023-09-16T00:54:00Z",
        "content": "After the deadly statewide power outage in 2021, academics, experts, and politicians floated a lot of blue-sky ideas about how to keep the Texas power grid running in all kinds of weather. Some were … [+5106 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "CNET"
        },
        "author": "Gael Fashingbauer Cooper",
        "title": "Verizon Makes It Easier for You to Stop Getting Spam Texts - CNET",
        "description": "You can now block all of those text messages that appear to come from random email addresses.",
        "url": "https://www.cnet.com/tech/mobile/verizon-makes-it-easier-for-you-to-stop-getting-spam-texts/",
        "urlToImage": "https://www.cnet.com/a/img/resize/43683c31fdcf15b86407d3efb1c5b4a4f132f65f/hub/2023/08/29/06d03640-84be-4172-bfb2-4ee91d29fff3/email-to-text-spam-1230x690.jpg?auto=webp&fit=crop&height=675&width=1200",
        "publishedAt": "2023-08-29T19:27:00Z",
        "content": "Text messaging can be a helpful and effective way to communicate -- if only your phone wasn't cluttered with creepy spam texts hyping Bitcoin, or trying to romance you into sharing your bank password… [+1299 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "heise online"
        },
        "author": "Michael Plura, Daniel AJ Sokolov",
        "title": "Bitcoin-Fonds: Grayscale erringt Teilsieg gegen SEC",
        "description": "Grayscale gewinnt vor Gericht und kommt der Umwandlung seines Bitcoin Trust (GBTC) in einen Spot-ETF einen Schritt näher.​",
        "url": "https://www.heise.de/news/Bitcoin-Fonds-Grayscale-erringt-Teilsieg-gegen-SEC-9288886.html",
        "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/2/9/4/0/0/2/shutterstock_1937129161-91f75b37827ffe38.jpg",
        "publishedAt": "2023-08-30T03:20:00Z",
        "content": "Die US-Kapitalmarktbehörde SEC (Securities Exchange Commission) hätte den Antrag von Grayscale Investments auf Zulassung eines börsengehandelten Bitcoin-Spot-Fonds genehmigen müssen. Das hat ein US-B… [+3318 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Slashdot.org"
        },
        "author": "BeauHD",
        "title": "Hackers Steal $53 Million Worth of Cryptocurrency From CoinEx",
        "description": "Global cryptocurrency exchange CoinEX announced that someone hacked its hot wallets and stole large amounts of digital assets that were used to support the platform's operations. BleepingComputer reports: The incident occurred on September 12 and preliminary …",
        "url": "https://slashdot.org/story/23/09/14/2136201/hackers-steal-53-million-worth-of-cryptocurrency-from-coinex",
        "urlToImage": "https://a.fsdn.com/sd/topics/bitcoin_64.png",
        "publishedAt": "2023-09-14T23:10:00Z",
        "content": "The incident occurred on September 12 and preliminary results of the investigation show that the unauthorized transactions involved Ethereum ($ETH), Tron ($TRON), and Polygon ($MATIC) cryptocurrency.… [+1072 chars]"
    }]

    private _articles = new BehaviorSubject<Article[]>([])
    public articles$ = this._articles.asObservable()

    private NEWS_API_KEY = environment.NEWS_API_KEY
    private NEWS_API_URL = `https://newsapi.org/v2/everything`

    constructor(private http: HttpClient) {
    }

    // public loadNews(filterBy: string = 'bitcoin'): Observable<void> {
    public loadNews(filterBy: string = 'bitcoin') {
        this._articles.next(this.fakeNews)
        // return this.http.get<News>(`${this.NEWS_API_URL}?q=${filterBy}&apiKey=${this.NEWS_API_KEY}`)
        //     .pipe(map((news) => {
        //         this._articles.next(news.articles)
        //         return 
        //     }),
        //         catchError((err) => throwError(() => err)))

    }

}
