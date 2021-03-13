const songTitle = document.querySelector(".songTitle")
const playBut = document.querySelector(".playBut")
const playButImg = document.querySelector(".playButImg")
const locationBar = document.querySelector(".locationBar")
const locationBarZone = document.querySelector(".locationBarZone")
const locationBarZoneWidth = locationBarZone.offsetWidth;

const songs = [
    new Audio('http://docs.google.com/uc?export=open&id=1G-tyVYLtzptKQpgOJmG4wn-e40sr6xw6'),
    new Audio('http://docs.google.com/uc?export=open&id=1SNNFlZ9sI9K4hIY1GAzv1H3I0rJwfPN4')
]
const songTitles = [
    "Logo Opener", "MEK_1"
]

const pauseImg = "https://han.gl/NXpK5";
const playImg = "https://han.gl/d8uDv";

let locationBarZonescroll = null;
let clickPlayButWait = null;
let pauseTime = null;

let randomNumber = null;

window.addEventListener("load", function(){
   setup();
})

playBut.addEventListener("click", function(){
    randomSongPlay();
})

//function

function setup(){
    playBut.name = "start";
    locationBarZone.scrollTo(locationBarZoneWidth, 0);
    playButImg.src = playImg;
}

function randomSongPlay(){
    if(playBut.name === "start"){
        randomNumber = Math.floor(Math.random()*songs.length +0)
        randomSong = songs[randomNumber];
        songTitle.innerHTML = songTitles[randomNumber];

        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;
        
        console.info(Math.round(randomSong.duration)+"s")

        locationBarZonescroll=
        setInterval(function(){
            locationBarZone.scrollBy({
                left: -locationBarZoneWidth/Math.floor(randomSong.duration),
                behavior:"smooth"
            })
        }, 1000)

    }else if(playBut.name === "play"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;

        console.error(Number(Math.ceil(pauseTime)-pauseTime))

        clickPlayButWait=
        setTimeout(function(){
            
            locationBarZone.scrollBy({
                left: -locationBarZoneWidth/Math.floor(randomSong.duration),
                behavior:"smooth"
            }) 

            locationBarZonescroll=
            setInterval(function(){
                locationBarZone.scrollBy({
                    left: -locationBarZoneWidth/Math.floor(randomSong.duration),
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

        console.info(pauseTime, Math.ceil(pauseTime), playBut.name )
    
    }

    randomSong.addEventListener("ended", function(){
        playBut.name = "start";
        
        console.info("ended");
    
        setTimeout(function(){
          clearInterval(locationBarZonescroll)
          clearTimeout(clickPlayButWait)
          playButImg.src = playImg;  
          songTitle.innerHTML = "";
          locationBarZone.scrollTo(locationBarZoneWidth,0)
        },1500)
        
    })
    
}

/* 
문제점

음악이 끝나면 어떻게 할 것인지 생각해야함


*/