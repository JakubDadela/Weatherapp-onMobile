let opacity=document.getElementById('glowna');
opacity.hidden=true;
let pog=document.getElementById('pogoda');
pogoda.hidden=true;

window.addEventListener('load',function(){
setTimeout(function(){
let destroy=this.document.getElementById('loading_screen');
this.document.body.removeChild(destroy);
opacity.hidden=false;
},3000)
})
const endpoint='https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities=[];
fetch(endpoint)
 .then(res=>res.json())
 .then(data=>cities.push(...data));
 //console.log(cities);

 function find(word,cities){
     return cities.filter(p=>{
         const re=new RegExp(`^${word}`,'gi');
         return p.city.match(re) || p.state.match(re);
     })
 }
 let list=document.getElementById('completion');
 function display_city(){
     list.hidden=false;
     const fArray=find(this.value,cities);
     let i=0;
     const merge=fArray.map((p)=>{
         i++;
     
     if(i<5)
     return  `<li><span class="card card-body mb-1 name id=navig">${p.city}</span> </li>`;
     }).join('');
     list.innerHTML=merge;
     let temp=document.getElementById('miasto');
     if(!(/[a-zA-Z]/.test(temp.value))) {
        list.innerHTML="";
        list.hidden=true;
      }else{
        if(document.getElementById('completion').children[0]==undefined) list.hidden=true;
          for(let i=0; i<=4; i++)
          {
              if(document.getElementById('completion').children[i]!=undefined)
              document.getElementById('completion').children[i].addEventListener('click',()=>{temp.value=document.getElementById('completion').children[i].innerText});
    
          }
        }
      }
      
    function nonelist(){
        list.hidden=true;
    }
    
    let omen=document.getElementById('miasto');
    miasto.addEventListener('change',display_city);
    miasto.addEventListener('keyup',display_city);
    let cp=document.getElementById('glowna');
function przejscie(){
let sr= document.getElementById('miasto').value; 
Weather(sr);
}
pk.addEventListener('click',przejscie);
cp.addEventListener('click',nonelist);
let apId='d1d4c94418079ad39b6302c3f44abbae';
let jed='metric';

function Weather(city){
  console.log(city);
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apId}&units=${jed}`).then(result=>{
  if(result.status!=404 && result.status!=400){
  result.json().then(result2=>{
  init(result2);
  console.log(result2);
   })
  }else{
    result.json().catch(console.log("ERROR"));
  }

   })
}
let tym = document.getElementById('miasto').value;
function init(sResult){
  console.log(sResult.main.temp);
  document.getElementById('glowna').hidden=true;      
  pog.hidden=false;
  let ms=document.querySelector('.prowincja');
  ms.innerText=sResult.name;
  let t=document.querySelector('.temp');
  t.innerText="Temperatura : " + sResult.main.temp +"C";
  let tx=document.querySelector('.tempmax');
  tx.innerText="Temperatura max: " + sResult.main.temp_max+"C";
  let tm=document.querySelector('.tempmin');
  tm.innerText="Temperatura min: " + sResult.main.temp_min+"C";
  let pr=document.querySelector('.cisnienie');
  pr.innerText="Cisnienie : " + sResult.main.pressure+"HpA";
  let wi=document.querySelector('.wiatr');
  wi.innerText="Prędkosc wiatru: " + sResult.wind.speed+"m/s";
  
  // let ra=document.querySelector('.opady');
  // ra.innerText="Opady: " + sResult.rain._1h +"mm/h";
  
}
function powrot(){
  pog.hidden=true;
  document.getElementById('glowna').hidden=false;

}
let ch=document.querySelector('.zmien')
ch.addEventListener('click',powrot);

function odliczanie(){
let dzisiaj=new Date();
let dzien=dzisiaj.getDate();
if(dzien<10) dzien="0" + dzien;
let miesiac=dzisiaj.getMonth()+1;
if(miesiac<10) miesiac="0" + miesiac;
let rok=dzisiaj.getFullYear();
let godzina=dzisiaj.getHours();
if(godzina<10) godzina="0" + godzina;
let minuta=dzisiaj.getMinutes();
if(minuta<10) minuta="0" + minuta;
let sekunda=dzisiaj.getSeconds();
if(sekunda<10) sekunda="0" + sekunda;
document.querySelector('.Data').innerHTML=dzien+'/'+miesiac+'/'+rok+' '+godzina+':'+minuta+':'+sekunda;
setTimeout("odliczanie()",1000);
}

