const puppeteer = require('puppeteer');
const fs = require('fs');

const run = async function(){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    page.setViewport({width:1024,height:768})
    await page.goto('https://www.ifood.com.br/delivery/maceio-al/cozinha/acai');
    //await page.screenshot({path:'exemple.png'}) 
    //await page.pdf({path:'exemple.pdf',format:'A4'});

    const request1 = await page.evaluate(()=>{
        
        const restaurantes = document.querySelectorAll('a.restaurant-card')
        //const nomesRestaurantes = document.querySelectorAll('span.restaurant-name')

        const resultadoBusca = Array.from(restaurantes).map((restaurante)=>{
            return{
                nome: restaurante.querySelector('span.restaurant-name').innerText,
                imagem: restaurante.querySelector('img.restaurant-card__img-logo').src,
                rating: restaurante.querySelector('span.restaurant-rating').innerText,
                tempoEstimado: restaurante.querySelector('div.restaurant-card__footer').innerText,
                uri:restaurante.href
            } 
        })

        return resultadoBusca;
         
    });

    async function lerItens(dados){

        //await page.goto( dados[2].uri );

        // dados.forEach(async item =>  {
        //     const page2 = await browser.newPage() ;
        //     await page2.goto(item.uri);
        //     await browser.close();
        //     // const requestItem = await page.evaluate(()=>{
        //     //     const prods = document.querySelectorAll('a.dish-card');
        //     //     Array.from(prods).map((prod)=>{
        //     //         console.log(prod.querySelector('span.dish-card__price').innerText);
        //     //     })
        //     // })
    
        // });

    }

    //lerItens(request1);

    await page.goto('https://www.globoesporte.com');
    

    //fs.writeFileSync("./dados.json" , JSON.stringify( dimensions, null , 2 ) );

    //console.log(`Dimensões:`,dimensions );

    await browser.close()
}

run();