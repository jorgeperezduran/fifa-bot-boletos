import { ApiHelper } from "../../../helpers/axiosHelper";
const cheerio = require('cheerio');
const request = new ApiHelper();

async function searchTickets() {
  const contentResponsResale = await request.get('https://resale-intl.fwc22.tickets.fifa.com/secure/selection/event/date/product/101397570845/lang/en', {
    headers: {
        cookie: '_cc_id=73572bff6323b7c090a0019e2738e2cc; OptanonAlertBoxClosed=2022-01-25T15:30:49.691Z; o_ot_persist=%2C1%2C2%2C4%2C3%2C; _ga=GA1.2.482571816.1643124668; gLrbmfdr=A1J-3JF-AQAAJUdN1SYkzILm6RHDZdpZjkypVNjTew0yXlvrZniHiRMBqzUGAbuQuNyuci2nwH8AAOfvAAAAAA|1|1|be942496c0a1cdc6bc8ecb793a0a499674f501e7; _fbp=fb.1.1643845732932.2117423447; _scid=9ada1eed-a9c4-4e9f-afec-a7c4ba5b3391; di=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; dis=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; app_vi=100064940; _gcl_au=1.1.1414812120.1652742096; _sctr=1|1654232400000; AMCVS_2F2827E253DAF0E10A490D4E%40AdobeOrg=1; s_cc=true; o_ic_persist=; o_ec_persist=; o_sc_persist=; _ym_uid=1655690367428629277; _ym_d=1655690367; panoramaId=c31525cd58e2355dd18b33495ba44945a702b6ddf5442d1fba7359a322f7880e; _gid=GA1.2.1319930145.1659458072; lang=en; AcpAT-v3-05-FWC22-FCFS-PROD=p1pkpcontroller1e-9afa6b51f812314a7640fe21c46da3fe6fd83ba0fc92ce47ad81585791969d8a56a2a44e7bece788e7e62c94ca8a67daa024d815b72257839d21bc0949b0d559; stx_WR_FIFAT_FWC22FI=2022-08-06T02%3A20%3A20.473%2B02%3A00%7C2022-08-06T02%3A05%3A20.473%2B02%3A00; stx_contact_FIFAT_FWC22FI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659741640%22%2C%22expires%22%3A%222022-08-06T01%3A50%3A40.731%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22FI%22%2C%22guestSession%22%3Afalse%7D; SERVERID-BE-INTERNET1-9050=2ff76c751b4ec188909467c4906d26a3; panoramaId_expiry=1660519681794; __ecfp=d856c06bcd1117fadd4d6070c7c88ece; __ecbmchid=7zxbw6Hd9fGiz2pt7eCmHyeUjS+6YpU9Wx1xIkWozxd4RwPEESDNKhuT+bew2oZx9BYFI4Gi1zYh5W0lhbkSXtalny3zWSOsXWOG98Wh+9FQkWm2Uwdz+S9RyEUN0iynAS7i21PKSFFlXTuwa4Aa9LUmxtip1cBqnUqwn8K50qLFCNtRuRzOnWmuM8TaTcbvXYLTi0DZEyhlwiF7hmZJlAPJBU7KPJOyJClT2Kk9SiOo3ElnVwfGY2bF9Q; __eccha=171; AMCV_2F2827E253DAF0E10A490D4E%40AdobeOrg=-2121179033%7CMCIDTS%7C19213%7CMCMID%7C69064820239443932983605083512230584849%7CMCAAMLH-1660585393%7C6%7CMCAAMB-1660585393%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1659987793s%7CNONE%7CvVersion%7C5.3.0; _gat_UA-130584107-2=1; AcpAT-v3-06-FWC22-Resale-PROD=p1pkpcontroller1d-f626439ce3aa1ce10961ed8c7c4ef4755d880e5a767e975d348110b475f8107a0132884ff235bcd94460536b5834390976df3188c0eb88851d9436d8928cffcd0c0795e1a7e9d3e8e84a7f47c663a70c; STX_SESSION=MmVhZGFiMjQtZWRlZi00M2JmLTlhN2EtMDc1MDE3MTBjN2Y5; stx_WR_FIFAT_FWC22RI=2022-08-08T20%3A41%3A28.229%2B02%3A00%7C2022-08-08T20%3A26%3A28.229%2B02%3A00; adobeSessionCookie=6ncj8ldi3057jcmn08581659980604227; s_sq=%5B%5BB%5D%5D; stx_contact_FIFAT_FWC22RI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659980507%22%2C%22expires%22%3A%222022-08-08T20%3A11%3A47.400%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22RI%22%2C%22guestSession%22%3Afalse%7D; TEAL=v:517e91c94a282516571419191125955797915714924$t:1659982420020$sn:40$en:2$s:1659980592098%3Bexp-sess; _gat_UA-130584107-4=1; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Aug+08+2022+12%3A43%3A44+GMT-0500+(Central+Daylight+Time)&version=6.32.0&isIABGlobal=false&hosts=&consentId=8d0e624b-72c3-470f-9a65-d674f87ffb8a&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C4%3A1%2C3%3A1&geolocation=MX%3BJAL&AwaitingReconsent=false' },
    })

    //const $ = cheerio.load(contentResponseSupporter.data);
    let found = 1;
    const polandResponse = await request.get('https://api.telegram.org/8417363044:AAG6Bv1RhF4WFtTPzqXaxrEtdNCLvqHQFFw/sendMessage?chat_id=-4897663764&text=PrimerMensajeBotVamosPorBoletosDeMexico!');
  

    if(found > 0){
      const sound = require("sound-play");
      await sound.play(__dirname.concat('/sample-3s.mp3'));
    }

    console.log('<<-------------------------------------->>');
    console.log('<<-------------------------------------->>');
  }
  searchTickets();
  