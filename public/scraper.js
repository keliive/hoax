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