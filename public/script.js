var getArticleInfo = function() {
  //var API_URL = "//pokeapi.co/api/v2"
  var URL = $("#article_URL").val();
  var URL = extractHostname(URL);
  console.log(URL)

  fetch('/similarweb?url='+URL).then(function(response){
    console.log(response)
    return response.json();
  }).then(function(json){
    console.log(json.global_rank[0].global_rank)
    var rank = json.global_rank[0].global_rank

    var html = ""
    html += "<h2>Rank of the webpage  " + rank.toString() + "</h2>"
    document.getElementById('container_news_details').innerHTML = html;
    var popularityScore = getPopularityScore(rank);
    var trustScore = getTrustScore(URL);
    
    var totalScore = 0;
    if (trustScore != -1) {
      totalScore = 0.3*popularityScore + 0.7*trustScore;
    }
    else {
      totalScore = popularityScore;
    }
    console.log(totalScore);
    
    scrapeURL()
  })

}

function getPopularityScore(rank) {
  var highest_rank = 4000000;
  if (rank >= highest_rank) {
    score = 0;
  }
  else {
    var score = 10*(-rank/highest_rank+1);
  }
  console.log(score);
  
  return score
}

function getTrustScore(url){
  for (let score of scores){
    //console.log(score)
    if(url.includes(score["url"])){
      return score["score"]*10
    }
  }
  
  return -1
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function scrapeURL() {
  const scraper = require('./src/scraper'); // HEADS UP! The url might change
  const options = {
    title: 'h1.title',
    subtitle: 'h2.subtitle',
    text: 'div.body'
  };
  const htmlText = '<html><head></head><body><h1 class="title">News title</h1><h2 class="subtitle">Subtitle would go here</h2><div class="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend dui eget cursus porttitor. Etiam a imperdiet nunc. Sed convallis luctus nulla, quis lobortis erat fringilla at. Morbi orci nisl, iaculis ac placerat eget, ultricies at ligula. Praesent congue mi eu fermentum maximus. Nam placerat metus vitae sapien scelerisque, ut bibendum eros efficitur.</div></body></html>';
  let result = scraper.processHtml(htmlText, options);
  // result will be an object with title, subtitle and body
}

const scores = [
  // Object literal. In Python we call it dictionary,
  // in Java we call it hashmap.
  {
    url: 'occupydemocrats.com',
    score: 0
  },
  {
    url: 'buzzfeed.com',
    score: 0.03125
  },
  {
    url: 'breitbart.com',
    score: 0.033
  },
  {
    url: 'www.infowars.com',
    score: 0.09
  },
  {
    url: 'yahoo.com',
    score: 0.12
  },
  {
    url: 'huffingtonpost.com',
    score: 0.2
  },
  {
    url: 'theblaze.com',
    score: 0.21
  },
  {
    url: 'foxnews.com',
    score: 0.23
  },
  {
    url: 'abcnews.go.com',
    score: 0.39
  },
  {
    url: 'msnbc.com',
    score: 0.4
  },
  {
    url: 'drudgereport.com',
    score: 0.42
  },
  {
    url: 'nbc.com',
    score: 0.429
  },
  {
    url: 'edition.cnn.com',
    score: 0.43
  },
  {
    url: 'cbsnews.com',
    score: 0.49
  },
  {
    url: 'theatlantic.com/news',
    score: 0.6
  },
  {
    url: 'usatoday.com',
    score: 0.65625
  },
  {
    url: 'nytimes.com',
    score: 0.755
  },
  {
    url: 'kansascity.com',
    score: 0.772
  },
  {
    url: 'seattletimes.com',
    score: 0.779
  },
  {
    url: 'time.com',
    score: 0.8125
  },
  {
    url: 'washingtonpost.com',
    score: 0.85
  },
  {
    url: 'denverpost.com',
    score: 0.86
  },
  {
    url: 'apnews.com',
    score: 0.875
  },
  {
    url: 'politico.com',
    score: 0.875
  },
  {
    url: 'dallasnews.com',
    score: 0.91
  },
  {
    url: 'latimes.com',
    score: 0.91
  },
  {
    url: 'wsj.com',
    score: 0.92
  },
  {
    url: 'theguardian.com',
    score: 0.9375
  },
  {
    url: 'npr.org',
    score: 0.96
  },
  {
    url: 'bbc.com',
    score: 0.98
  },
  {
    url: 'reuters.com',
    score: 0.98
  },
  {
    url: 'economist.com',
    score: 0.98
  }
  
 
  
];



