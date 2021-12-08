const puppeteer = require('puppeteer');
module.exports = app => {
  app.get('/search', async (req, res) => { 
    var search = req.query.s;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/finance/');
    await page.click("#yDmH0d > c-wiz > div > div.zZnjCf.EZ7S7c > div.e1AOyf > div > div > div > div.d1dlne > input.Ax4B8.ZAGvjd")
    if (search) {
      await page.type('#yDmH0d > c-wiz > div > div.zZnjCf.EZ7S7c > div.e1AOyf > div > div > div > div.d1dlne > input.Ax4B8.ZAGvjd', search);
    }
    setTimeout(async () => {
      var stocks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".onRPD")).map((element) => {
          let data = element.innerHTML.split(/<[^>]*>?/gm).filter(e => e)
          if (data.length > 5) {
            return {
              asset: data[0] + data[1],
              ticker: data[2],
              market: data[3],
              price: data[4],
              variation: data[5]  
            }
          }
          return {
            asset: data[0],
            ticker: data[1],
            market: data[2],
            price: data[3],
            variation: data[4]
          }
        })
        console.log(document.querySelector("#sdgBod > span.gb_Zd.gb_Vc"), 'test');
        return document.querySelectorAll(".onRPD")
      });
      res.json(stocks);
      await browser.close();
    }, 1000)
  });
};