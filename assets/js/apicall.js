var eur_usd_ratio = 1;

function get(url, coin){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            demux(this.responseText, coin);
        }
        else {
            console.log(this.readyState);
            console.log(this.status);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }


function demux (data, coin){
   switch (coin) {
    case "eur": {
        eur(data);
        break;
    }
       case "clo": {
        update_clo(data);
        break;
    }
    case "eth": {
        update_eth(data);
        break;
    }
    case "etc": {
        update_etc(data);
        break;
    }
    case "ella": {
        update_ella(data);
        break;
    }    
    case "price_crcomp": {
        update_price_crcomp(data);
        break;
    }
    default:{
        console.log(data);
    }
   } 
}



function eur(data) {
    var obj_eur = JSON.parse(data);
    eur_usd_ratio = obj_eur.results.EUR_USD.val;
    console.log(eur_usd_ratio);  
}


function update_clo(data){
    var obj = JSON.parse(data);
    document.getElementById("clo_nethash").innerHTML=((obj.currentNethash)/1000000000000).toFixed(3) + " TH/s";
    document.getElementById("clo_block_time").innerHTML=obj.blockTime+"sec";
    document.getElementById("clo_block_rew").innerHTML=obj.blockReward+" CLO";
    document.getElementById("clo_block_height").innerHTML=obj.lastBlock;
    document.getElementById("clo_coin_mined").innerHTML=obj.totalSupply+" CLO";
    document.getElementById("clo_price_btc").innerHTML=(obj.price_btc).toFixed(8)+" &#8383";
    document.getElementById("clo_price_usd").innerHTML=obj.price_usd.toFixed(2)+" &#36;";
    document.getElementById("clo_price_eur").innerHTML=((obj.price_usd)/eur_usd_ratio).toFixed(2)+" &#8364;";
}


function update_eth(data){
    var obj = JSON.parse(data);
    document.getElementById("eth_nethash").innerHTML=((obj.currentNethash)/1000000000000).toFixed(3) + " TH/s";
    document.getElementById("eth_block_time").innerHTML=obj.blockTime+"sec";
    document.getElementById("eth_block_rew").innerHTML=obj.blockReward+" ETH";
    document.getElementById("eth_block_height").innerHTML=obj.lastBlock;
    document.getElementById("eth_coin_mined").innerHTML=obj.totalSupply+" ETH";
    document.getElementById("eth_price_btc").innerHTML=(obj.price_btc).toFixed(8)+" &#8383";
    document.getElementById("eth_price_usd").innerHTML=obj.price_usd.toFixed(2)+" &#36;";
    document.getElementById("eth_price_eur").innerHTML=((obj.price_usd)/eur_usd_ratio).toFixed(2)+" &#8364;";
}


function update_etc(data){
    var obj = JSON.parse(data);
    document.getElementById("etc_nethash").innerHTML=((obj.currentNethash)/1000000000000).toFixed(3) + " TH/s";
    document.getElementById("etc_block_time").innerHTML=obj.blockTime+"sec";
    document.getElementById("etc_block_rew").innerHTML=obj.blockReward+" ETC";
    document.getElementById("etc_block_height").innerHTML=obj.lastBlock;
    document.getElementById("etc_coin_mined").innerHTML=obj.totalSupply+" ETC";
    document.getElementById("etc_price_btc").innerHTML=(obj.price_btc).toFixed(8)+" &#8383";
    document.getElementById("etc_price_usd").innerHTML=obj.price_usd.toFixed(2)+" &#36;";
    document.getElementById("etc_price_eur").innerHTML=((obj.price_usd)/eur_usd_ratio).toFixed(2)+" &#8364;";
}


function update_ella(data){
    var obj = JSON.parse(data);
    document.getElementById("ella_nethash").innerHTML=((obj.currentNethash)/1000000000000).toFixed(3) + " TH/s";
    document.getElementById("ella_block_time").innerHTML=obj.blockTime+"sec";
    document.getElementById("ella_block_rew").innerHTML=obj.blockReward+" ELLA";
    document.getElementById("ella_block_height").innerHTML=obj.lastBlock;
    document.getElementById("ella_coin_mined").innerHTML=obj.totalSupply+" ELLA";
    document.getElementById("ella_price_btc").innerHTML=(obj.price_btc).toFixed(8)+" &#8383";
    document.getElementById("ella_price_usd").innerHTML=obj.price_usd.toFixed(2)+" &#36;";
    document.getElementById("ella_price_eur").innerHTML=((obj.price_usd)/eur_usd_ratio).toFixed(2)+" &#8364;";
}