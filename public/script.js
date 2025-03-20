let mediaIndex=0;
let videoIndex=0;
let videoFiles=[];
let slideIndex=0;
let slideFiles=[];
let isVideoPlaying=true;

async function fetchMedia(type){
    try{
        const response=await fetch(`http://localhost:3000/media/${type}`);
        const files=await response.json();
        return Array.isArray(files)?files:[];
    }catch(error){
        console.error("Error fetching videos:",error);
        return[];
    }
}

//Function play videos
function playNextVideo(){
    if(videoFiles.length===0){
        showNextSlide();
        return;
    }
   const mediaConatiner=document.getElementById("media-container");
   mediaConatiner.innerHTML="";

    const videoElement=document.createElement("video");
    videoElement.src=videoFiles[mediaIndex];
    videoElement.autoplay=true;
    videoElement.muted=true;
    videoElement.style.width="100vw";
    videoElement.style.height="100vh";
    videoElement.style.objectFit="cover";
    videoElement.onended = () => {
        mediaIndex++;
        if(mediaIndex >= videoFiles.length){
            mediaIndex = 0;
            isVideoPlaying=false;
            showNextSlide();
        }
        else{
            playNextVideo();
        }
    };
    mediaConatiner.appendChild(videoElement);
}


//Function to play slide show
function showNextSlide(){
    if(slideFiles.length===0){
        playNextVideo();
        return;
    }
    const mediaConatiner=document.getElementById("media-container");
    mediaConatiner.innerHTML="";
   const imgElement=document.createElement("img");
   imgElement.src=slideFiles[mediaIndex];
   imgElement.style.width="100vw";
   imgElement.style.height="100vh";
   imgElement.style.objectFit="contain";
   mediaConatiner.appendChild(imgElement);
   mediaIndex++;
   if(mediaIndex >= slideFiles.length){
    mediaIndex=0;
    isVideoPlaying=true;
    setTimeout(playNextVideo,5000);
   }
   else {
    setTimeout(showNextSlide,5000);
   }
}

async function startMediaSlideShow(){
    videoFiles = await fetchMedia("videos");
    slideFiles=await fetchMedia("slides");

    if(videoFiles.length > 0){
        playNextVideo();
    }else if(slideFiles.length>0){
        showNextSlide();
    }
}

startMediaSlideShow();