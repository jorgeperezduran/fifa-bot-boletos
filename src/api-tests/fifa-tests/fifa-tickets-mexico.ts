import { ApiHelper } from "../../../helpers/axiosHelper";
const cheerio = require('cheerio');
const request = new ApiHelper();

async function searchTickets() {
    /*const contentResponseSupporter = await request.get('https://fcfs-intl.fwc22.tickets.fifa.com/secure/selection/event/date/product/101397570845/contact-advantages/101545775629/lang/en', {
        headers: {
            cookie: 'AMCVS_2F2827E253DAF0E10A490D4E%40AdobeOrg=1; s_cc=true; _scid=5933cc7c-e685-4db1-9d05-cc9171e8da53; _gcl_au=1.1.1197143727.1657043385; OptanonAlertBoxClosed=2022-07-05T17:49:46.884Z; _cc_id=2e1f3ff620e78014f08f7abf5e1b5d47; panoramaId=c31525cd58e2355dd18b33495ba44945a702b6ddf5442d1fba7359a322f7880e; SERVERID-BE-INTERNET1-9050=5c1acd4a868aa56017b65ba913f84117; o_ic_persist=; o_ec_persist=; o_sc_persist=; o_ot_persist=%2C1%2C2%2C4%2C3%2C; _ga=GA1.2.1905609017.1657043394; _gid=GA1.2.1809867948.1657043394; gLrbmfdr=A9S3D9GBAQAAmj6zvyHBrwjtoF2z5q37WXMZQ9XPPpKHFFzUU4jAE6IUlh4-AbuQrouuci7ywH8AAOfvAAAAAA|1|1|47fd0e27788e28f09fb6141d96bfa3f336efe0ca; lang=en; AMCV_2F2827E253DAF0E10A490D4E%40AdobeOrg=-2121179033%7CMCIDTS%7C19181%7CMCMID%7C61496556078884170444042286642268069002%7CMCAAMLH-1657818253%7C9%7CMCAAMB-1657818253%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1657220653s%7CNONE%7CvVersion%7C5.3.0; AcpAT-v3-05-FWC22-FCFS-PROD=p1pkpcontroller1c-5cf66855cc66284b4f34c531bded0e9a70e1cf87e5e5824ac465b69ffb3b63ef2682cc78d31e9aff19df5997e1047943a3c12e41b910b67d8cbb86e6d251ba17e78a0e4abab09c70153db7a2159e3585; STX_SESSION=MTU3NGRlMGMtODU1NC00YjI5LThhYTctYTA5MzVhMTkyYzBh; stx_contact_FIFAT_FWC22FI_v1=%7B%22individualTitle%22%3A%22OTHER%22%2C%22individualFirstName%22%3A%22Adrian%22%2C%22individualLastname%22%3A%22Romero%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221657213486%22%2C%22expires%22%3A%222022-07-07T20%3A11%3A30.175%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22FI%22%2C%22guestSession%22%3Afalse%7D; _gat_UA-130584107-1=1; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+07+2022+13%3A06%3A31+GMT-0500+(Central+Daylight+Time)&version=6.32.0&isIABGlobal=false&hosts=&consentId=eae0dd04-4e00-4908-a4db-19eb08217806&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2'
        },
    })*/

    const contentResponseRegular = await request.get('https://fcfs-intl.fwc22.tickets.fifa.com/secure/selection/event/date/product/101397570845/lang/en', {
      headers: {
          cookie: 'AMCVS_2F2827E253DAF0E10A490D4E%40AdobeOrg=1; s_cc=true; _scid=5933cc7c-e685-4db1-9d05-cc9171e8da53; _gcl_au=1.1.1197143727.1657043385; OptanonAlertBoxClosed=2022-07-05T17:49:46.884Z; _cc_id=2e1f3ff620e78014f08f7abf5e1b5d47; panoramaId=c31525cd58e2355dd18b33495ba44945a702b6ddf5442d1fba7359a322f7880e; SERVERID-BE-INTERNET1-9050=5c1acd4a868aa56017b65ba913f84117; o_ic_persist=; o_ec_persist=; o_sc_persist=; o_ot_persist=%2C1%2C2%2C4%2C3%2C; _ga=GA1.2.1905609017.1657043394; _gid=GA1.2.1809867948.1657043394; gLrbmfdr=A9S3D9GBAQAAmj6zvyHBrwjtoF2z5q37WXMZQ9XPPpKHFFzUU4jAE6IUlh4-AbuQrouuci7ywH8AAOfvAAAAAA|1|1|47fd0e27788e28f09fb6141d96bfa3f336efe0ca; lang=en; AMCV_2F2827E253DAF0E10A490D4E%40AdobeOrg=-2121179033%7CMCIDTS%7C19181%7CMCMID%7C61496556078884170444042286642268069002%7CMCAAMLH-1657818253%7C9%7CMCAAMB-1657818253%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1657220653s%7CNONE%7CvVersion%7C5.3.0; AcpAT-v3-05-FWC22-FCFS-PROD=p1pkpcontroller1c-5cf66855cc66284b4f34c531bded0e9a70e1cf87e5e5824ac465b69ffb3b63ef2682cc78d31e9aff19df5997e1047943a3c12e41b910b67d8cbb86e6d251ba17e78a0e4abab09c70153db7a2159e3585; STX_SESSION=MTU3NGRlMGMtODU1NC00YjI5LThhYTctYTA5MzVhMTkyYzBh; stx_contact_FIFAT_FWC22FI_v1=%7B%22individualTitle%22%3A%22OTHER%22%2C%22individualFirstName%22%3A%22Adrian%22%2C%22individualLastname%22%3A%22Romero%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221657213486%22%2C%22expires%22%3A%222022-07-07T20%3A11%3A30.175%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22FI%22%2C%22guestSession%22%3Afalse%7D; _gat_UA-130584107-1=1; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+07+2022+13%3A06%3A31+GMT-0500+(Central+Daylight+Time)&version=6.32.0&isIABGlobal=false&hosts=&consentId=eae0dd04-4e00-4908-a4db-19eb08217806&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2'
      },
  })
  
  /*const contentResponsResale = await request.get('https://resale-intl.fwc22.tickets.fifa.com/secure/selection/event/date/product/101397570845/lang/en', {
      headers: {
          cookie: '_cc_id=73572bff6323b7c090a0019e2738e2cc; OptanonAlertBoxClosed=2022-01-25T15:30:49.691Z; o_ot_persist=%2C1%2C2%2C4%2C3%2C; _ga=GA1.2.482571816.1643124668; gLrbmfdr=A1J-3JF-AQAAJUdN1SYkzILm6RHDZdpZjkypVNjTew0yXlvrZniHiRMBqzUGAbuQuNyuci2nwH8AAOfvAAAAAA|1|1|be942496c0a1cdc6bc8ecb793a0a499674f501e7; _fbp=fb.1.1643845732932.2117423447; _scid=9ada1eed-a9c4-4e9f-afec-a7c4ba5b3391; di=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; dis=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; app_vi=100064940; _gcl_au=1.1.1414812120.1652742096; _sctr=1|1654232400000; AMCVS_2F2827E253DAF0E10A490D4E%40AdobeOrg=1; s_cc=true; o_ic_persist=; o_ec_persist=; o_sc_persist=; _ym_uid=1655690367428629277; _ym_d=1655690367; panoramaId=c31525cd58e2355dd18b33495ba44945a702b6ddf5442d1fba7359a322f7880e; _gid=GA1.2.1319930145.1659458072; AcpAT-v3-05-FWC22-FCFS-PROD=p1pkpcontroller1e-46ce63ac18bdd8d34a09364a39afd6829a78cf07ba5b1efc548919c326c23a1073e04c7638f886963610477dd945db4027994da28629f37bebe2f48f1c895febe981b1a2609f06e7a67fc9586d358f4d; stx_WR_FIFAT_FWC22FI=2022-08-02T19%3A34%3A36.044%2B02%3A00%7C2022-08-02T19%3A19%3A36.044%2B02%3A00; stx_contact_FIFAT_FWC22FI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659458095%22%2C%22expires%22%3A%222022-08-02T19%3A04%3A55.446%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22FI%22%2C%22guestSession%22%3Afalse%7D; lang=en; AMCV_2F2827E253DAF0E10A490D4E%40AdobeOrg=-2121179033%7CMCIDTS%7C19207%7CMCMID%7C69064820239443932983605083512230584849%7CMCAAMLH-1660130713%7C7%7CMCAAMB-1660130713%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1659533113s%7CNONE%7CvVersion%7C5.3.0; STX_SESSION=YjA4ZWIyNGEtNWQ2NS00YjNkLWFhOTAtY2YyNDUyMmQ1NGNl; SERVERID-BE-INTERNET1-9050=cf54d64b66268ad12565b28350da396b; AcpAT-v3-06-FWC22-Resale-PROD=p1pkpcontroller1e-7eb50c40d8e13ed0aa6fa6c478e8faa447035bb55ac19d725d37c79b28945ca4f563ef212967a9003552aa31e6c653fbd230e3bbee8eb1cc7974d027cad84ec6c3856f90a821d75a355cbb9f55348ef1; stx_WR_FIFAT_FWC22RI=2022-08-03T14%3A29%3A01.692%2B02%3A00%7C2022-08-03T14%3A14%3A01.692%2B02%3A00; adobeSessionCookie=gd2mdi5llm0mhce6k7hi1659526145116; _gat_UA-130584107-4=1; stx_contact_FIFAT_FWC22RI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659526162%22%2C%22expires%22%3A%222022-08-03T13%3A59%3A41.600%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22RI%22%2C%22guestSession%22%3Afalse%7D; TEAL=v:517e91c94a282516571419191125955797915714924$t:1659527987025$sn:21$en:6$s:1659525913307%3Bexp-sess; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Aug+03+2022+06%3A29%3A47+GMT-0500+(Central+Daylight+Time)&version=6.32.0&isIABGlobal=false&hosts=&consentId=8d0e624b-72c3-470f-9a65-d674f87ffb8a&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C4%3A1%2C3%3A1&geolocation=MX%3BJAL&AwaitingReconsent=false; panoramaId_expiry=1660130987983; s_sq=fifaprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dworldcup%25253Aqatar2022%25253Atickets%25253Aresale-intl%25253Aselection-date%25253Aproduct%25253Amicrosite%2526link%253DSELECT%2526region%253Davailability_M30%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dworldcup%25253Aqatar2022%25253Atickets%25253Aresale-intl%25253Aselection-date%25253Aproduct%25253Amicrosite%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fresale-intl.fwc22.tickets.fifa.com%25252Fsecure%25252Fselection%25252Fevent%25252Fdate%25252Fproduct%25252F101397570845%25252Flang%25252Fen%252523%2526ot%253DA'
      },
  })*/

  const contentResponsResale = await request.get('https://resale-intl.fwc22.tickets.fifa.com/secure/selection/event/date/product/101397570845/lang/en', {
    headers: {
        cookie: '_cc_id=73572bff6323b7c090a0019e2738e2cc; OptanonAlertBoxClosed=2022-01-25T15:30:49.691Z; o_ot_persist=%2C1%2C2%2C4%2C3%2C; _ga=GA1.2.482571816.1643124668; gLrbmfdr=A1J-3JF-AQAAJUdN1SYkzILm6RHDZdpZjkypVNjTew0yXlvrZniHiRMBqzUGAbuQuNyuci2nwH8AAOfvAAAAAA|1|1|be942496c0a1cdc6bc8ecb793a0a499674f501e7; _fbp=fb.1.1643845732932.2117423447; _scid=9ada1eed-a9c4-4e9f-afec-a7c4ba5b3391; di=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; dis=GhJssGbKXhx-PYTRmUNXdQAAAX6810-E; app_vi=100064940; _gcl_au=1.1.1414812120.1652742096; _sctr=1|1654232400000; AMCVS_2F2827E253DAF0E10A490D4E%40AdobeOrg=1; s_cc=true; o_ic_persist=; o_ec_persist=; o_sc_persist=; _ym_uid=1655690367428629277; _ym_d=1655690367; panoramaId=c31525cd58e2355dd18b33495ba44945a702b6ddf5442d1fba7359a322f7880e; _gid=GA1.2.1319930145.1659458072; lang=en; AcpAT-v3-05-FWC22-FCFS-PROD=p1pkpcontroller1e-9afa6b51f812314a7640fe21c46da3fe6fd83ba0fc92ce47ad81585791969d8a56a2a44e7bece788e7e62c94ca8a67daa024d815b72257839d21bc0949b0d559; stx_WR_FIFAT_FWC22FI=2022-08-06T02%3A20%3A20.473%2B02%3A00%7C2022-08-06T02%3A05%3A20.473%2B02%3A00; stx_contact_FIFAT_FWC22FI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659741640%22%2C%22expires%22%3A%222022-08-06T01%3A50%3A40.731%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22FI%22%2C%22guestSession%22%3Afalse%7D; SERVERID-BE-INTERNET1-9050=2ff76c751b4ec188909467c4906d26a3; panoramaId_expiry=1660519681794; __ecfp=d856c06bcd1117fadd4d6070c7c88ece; __ecbmchid=7zxbw6Hd9fGiz2pt7eCmHyeUjS+6YpU9Wx1xIkWozxd4RwPEESDNKhuT+bew2oZx9BYFI4Gi1zYh5W0lhbkSXtalny3zWSOsXWOG98Wh+9FQkWm2Uwdz+S9RyEUN0iynAS7i21PKSFFlXTuwa4Aa9LUmxtip1cBqnUqwn8K50qLFCNtRuRzOnWmuM8TaTcbvXYLTi0DZEyhlwiF7hmZJlAPJBU7KPJOyJClT2Kk9SiOo3ElnVwfGY2bF9Q; __eccha=171; AMCV_2F2827E253DAF0E10A490D4E%40AdobeOrg=-2121179033%7CMCIDTS%7C19213%7CMCMID%7C69064820239443932983605083512230584849%7CMCAAMLH-1660585393%7C6%7CMCAAMB-1660585393%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1659987793s%7CNONE%7CvVersion%7C5.3.0; _gat_UA-130584107-2=1; AcpAT-v3-06-FWC22-Resale-PROD=p1pkpcontroller1d-f626439ce3aa1ce10961ed8c7c4ef4755d880e5a767e975d348110b475f8107a0132884ff235bcd94460536b5834390976df3188c0eb88851d9436d8928cffcd0c0795e1a7e9d3e8e84a7f47c663a70c; STX_SESSION=MmVhZGFiMjQtZWRlZi00M2JmLTlhN2EtMDc1MDE3MTBjN2Y5; stx_WR_FIFAT_FWC22RI=2022-08-08T20%3A41%3A28.229%2B02%3A00%7C2022-08-08T20%3A26%3A28.229%2B02%3A00; adobeSessionCookie=6ncj8ldi3057jcmn08581659980604227; s_sq=%5B%5BB%5D%5D; stx_contact_FIFAT_FWC22RI_v1=%7B%22individualTitle%22%3A%22MR%22%2C%22individualFirstName%22%3A%22Jorge%22%2C%22individualLastname%22%3A%22Perez%22%2C%22nickname%22%3A%22%22%2C%22structureOfficialName%22%3A%22%22%2C%22lang%22%3A%22en%22%2C%22currentLang%22%3A%22en%22%2C%22timestamp%22%3A%221659980507%22%2C%22expires%22%3A%222022-08-08T20%3A11%3A47.400%2B02%3A00%22%2C%22additionalData%22%3Anull%2C%22pointOfSalesCode%22%3A%22FWC22RI%22%2C%22guestSession%22%3Afalse%7D; TEAL=v:517e91c94a282516571419191125955797915714924$t:1659982420020$sn:40$en:2$s:1659980592098%3Bexp-sess; _gat_UA-130584107-4=1; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Aug+08+2022+12%3A43%3A44+GMT-0500+(Central+Daylight+Time)&version=6.32.0&isIABGlobal=false&hosts=&consentId=8d0e624b-72c3-470f-9a65-d674f87ffb8a&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C4%3A1%2C3%3A1&geolocation=MX%3BJAL&AwaitingReconsent=false' },
})

    //const $ = cheerio.load(contentResponseSupporter.data);
    let found = 0;
    const $2 = cheerio.load(contentResponseRegular.data);
    const $3 = cheerio.load(contentResponsResale.data);

    //const polandSupporter = $("#101437163861").toString();
    const polandRegular = $2("#101437163861").toString();
    const polandResale = $3("#101437163861").toString();
    console.log("Time: ",new Date().toLocaleString());

    console.log('---RESALE STATUS---', contentResponsResale.status);
    if(contentResponsResale.status != 202){
    if(polandRegular.includes("sold_out")){
      console.log('POLAND REGULAR NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! POLAND REGULAR AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const polandResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+Polonia+Regular+Disponibles+https://fcfs-intl.fwc22.tickets.fifa.com/secure/selection/event/seat/performance/101437163861/lang/en');
    }

    
    if(polandResale.includes("sold_out")){
      console.log('POLAND RESALE NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! POLAND RESALE AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const polandResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+Polonia+Reventa+Disponibles+https://resale-intl.fwc22.tickets.fifa.com/secure/selection/resale/item?performanceId=101437163861&lang=en');
    
    }

    //const argentinaSupporter = $("#101437163878").toString();
    const argentinaRegular = $2("#101437163878").toString();
    const argentinaResale = $3("#101437163878").toString();

    if(argentinaRegular.includes("sold_out")){
      console.log('ARGENTINA REGULAR NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! ARGENTINA REGULAR AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const argentinaResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+ARGENTINA+Regular+Disponibles+https://fcfs-intl.fwc22.tickets.fifa.com/secure/selection/event/seat/performance/101437163878/lang/en');
    }


    if(argentinaResale.includes("sold_out")){
      console.log('ARGENTINA RESALE NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! ARGENTINA RESALE AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const polandResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+Argentina+Reventa+Disponibles+https://resale-intl.fwc22.tickets.fifa.com/secure/selection/resale/item?performanceId=101437163878&lang=en');
    }

    //const arabiaSupporter = $("#101437163894").toString();
    const arabiaRegular = $2("#101437163894").toString();
    const arabiaResale = $3("#101437163894").toString();
    if(arabiaRegular.includes("sold_out")){
      console.log('SAUDI ARABIA REGULAR NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! SAUDI ARABIA REGULAR AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const argentinaResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+Arabia+Regular+Disponibles+https://fcfs-intl.fwc22.tickets.fifa.com/secure/selection/event/seat/performance/101437163894/lang/en');
    }

    if(arabiaResale.includes("sold_out")){
      console.log('ARABIA RESALE NOT AVAILABLE');
    }else{
      found = found + 1;
      console.log('yes!!!! ARABIA RESALE AVAILABLE');
      //const sound = require("sound-play");
      //await sound.play(__dirname.concat('/sample-3s.mp3'));
      const polandResponse = await request.get('https://api.telegram.org/bot5508181787:AAGSNq5vR1LmZ67nQUuT1mwHyNFTZnMeXBU/sendMessage?chat_id=-658435217&text=Boletos+Mexico+VS+Arabia+Reventa+Disponibles+https://resale-intl.fwc22.tickets.fifa.com/secure/selection/resale/item?performanceId=101437163894&lang=en');
    }
    if(found > 0){
      const sound = require("sound-play");
      await sound.play(__dirname.concat('/sample-3s.mp3'));
    }

    console.log('<<-------------------------------------->>');
    console.log('<<-------------------------------------->>');
  }
  }
  searchTickets();
  