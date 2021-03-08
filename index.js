const playBut = document.querySelector(".playBut")
const playButImg = document.querySelector(".playButImg")
const locationBar = document.querySelector(".locationBar")
const locationBarZone = document.querySelector(".locationBarZone")
const locationBarZoneWidth = locationBarZone.offsetWidth;
const songs = [
    new Audio('test.mp3'), new Audio('test2.mp3')
]

const pauseImg = "https://han.gl/NXpK5";
const playImg = "https://han.gl/d8uDv";

let locationBarZonescroll = null;
let clickPlayButWait = null;
let pauseTime = null;
let randomSong = songs[Math.floor(Math.random()*songs.length +0)];

const songT = Math.floor(randomSong.currentTime);

window.addEventListener("load", function(){
   setup();
})

playBut.addEventListener("click", function(){
    randomSongPlay();
})

function setup(){
    playBut.name = "start";
    locationBarZone.scrollTo(locationBarZoneWidth, 0);
    playButImg.src = playImg;
}

function randomSongPlay(){
    if(playBut.name === "start"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;
        console.log(Math.round(randomSong.duration))

        locationBarZonescroll=
        setInterval(function(){
            locationBarZone.scrollBy({
                left: -locationBarZoneWidth/randomSong.duration,
                behavior:"smooth"
            })
        }, 1000)

    }else if(playBut.name === "play"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;

        console.error(Number(Math.ceil(pauseTime)-pauseTime)*1000)

        clickPlayButWait=
        setTimeout(function(){
            locationBarZone.scrollBy({
                left: -locationBarZoneWidth/randomSong.duration,
                behavior:"smooth"
            })  
            locationBarZonescroll=
            setInterval(function(){
                locationBarZone.scrollBy({
                    left: -locationBarZoneWidth/randomSong.duration,
                    behavior:"smooth"
                })  
            },1000)
        },Number(Math.ceil(pauseTime)-pauseTime)*1000)
        // pauseTime을 올림한 것에서 pauseTime을 빼고 1000을 곱한 후 그 값만큼 기다린다.
    }else if(playBut.name === "pause"){
        randomSong.pause();
        playBut.name = "play";
        playButImg.src = playImg;

        pauseTime = randomSong.currentTime;
        clearInterval(locationBarZonescroll)
        clearTimeout(clickPlayButWait)
        console.log(Math.ceil(pauseTime), pauseTime, playBut.name )
    
    }

    randomSong.addEventListener("ended", function(){
        playBut.name = "start";

        console.log("ended");
    
        setTimeout(function(){
          clearInterval(locationBarZonescroll)
          playButImg.src = playImg;  
          locationBarZone.scrollTo(locationBarZoneWidth,0)
        },2000)
        
    })
    
}

/* 
문제점
 
음악의 제목을 보여줘야함,
음악이 끝나면 어떻게 할 것인지 생각해야함


*/