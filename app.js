const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //time display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  //get length of svg outline circle
  const outlineLength = outline.getTotalLength();
  //duration 
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds
  sounds.forEach(sound =>{
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });
  //play sound
  play.addEventListener('click', () =>{
    checkPlaying(song);
  });

  //select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    })
  });

  //create function to stop and play sounds and change icon. 'songs' with an 's' is a just a parameter name 
  const checkPlaying = songs =>{
    if(songs.paused){
      songs.play();
      video.play();
      play.src = '/svg/pause.svg';
    } else{
      songs.pause();
      video.pause();
      play.src = '/svg/play.svg'; 
    }
  };

  //animate circle and check time 

  //song.ontimeupdate will get the current time of the song being played will stop updating once song time is over.
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    //below it converts 60 seconds into a number 1-10 accordingly 
    let seconds = Math.floor(elapsed  % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate the circle AKA M A G I C 
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration){
      song.pause();
      song.currentTime = 0;
      play.src = '/svg/play.svg';
    }
  };
};


app();