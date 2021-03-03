const playBut = document.querySelector(".playBut")
const playButImg = document.querySelector(".playButImg")
const locationBar = document.querySelector(".locationBar")
const locationBarZone = document.querySelector(".locationBarZone")
const locationBarZoneWidth = locationBarZone.offsetWidth
const songs = [
    new Audio('test.mp3')
]

const pauseImg = "https://han.gl/NXpK5";
const playImg = "https://han.gl/d8uDv";

let randomSong = songs[Math.floor(Math.random()*songs.length +0)]
let locationBarZonescroll = null;

window.addEventListener("load", function(){
    locationBarZone.scrollTo(locationBarZoneWidth, 0);
    playButImg.src = playImg;
})

playBut.addEventListener("click", function(){

    randomSong.volume = 1;
    randomSong.loop = false;

    if(playBut.name === "start"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;
        console.log(randomSong.duration)
    }else if(playBut.name === "play"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;
    }else if(playBut.name === "pause"){
        randomSong.pause();
        playBut.name = "play";
        playButImg.src = playImg;
    }else if(playBut.name === "ended"){
        randomSong.play();
        playBut.name = "pause";
        playButImg.src = pauseImg;
    }

    locationBarZonescroll=
    setInterval(function(){
        locationBarZone.scrollBy({
            left: -locationBarZoneWidth/randomSong.duration,
            behavior:"smooth"
        })
    }, 1000)

})

randomSong.addEventListener("ended", function(){
    playBut.name = "ended";
    console.log("ended");

    setTimeout(function(){
      clearInterval(locationBarZonescroll)
      locationBarZone.scrollTo(locationBarZoneWidth,0)
      playButImg.src = playImg;  
    },500)
    
})

/* 
문제점

pause를 눌러도 locationBar가 멈추지 않음, 
음악의 제목을 보여줘야함,
음악이 끝나면 어떻게 할 것인지 생각해야함


*/