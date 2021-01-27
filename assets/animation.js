var flashShow = {};
flashShow.opacityIn = [0,1];
flashShow.scaleIn = [0.2, 1];
flashShow.scaleOut = 3;
flashShow.durationIn = 800;
flashShow.durationOut = 600;
flashShow.delay = 500;

anime.timeline({loop: true})
  .add({
    targets: '.flashShow .letters-1',
    opacity: flashShow.opacityIn,
    scale: flashShow.scaleIn,
    duration: flashShow.durationIn
  }).add({
    targets: '.flashShow .letters-1',
    opacity: 0,
    scale: flashShow.scaleOut,
    duration: flashShow.durationOut,
    easing: "easeInExpo",
    delay: flashShow.delay
  }).add({
    targets: '.flashShow .letters-2',
    opacity: flashShow.opacityIn,
    scale: flashShow.scaleIn,
    duration: flashShow.durationIn
  }).add({
    targets: '.flashShow .letters-2',
    opacity: 0,
    scale: flashShow.scaleOut,
    duration: flashShow.durationOut,
    easing: "easeInExpo",
    delay: flashShow.delay
  }).add({
    targets: '.flashShow .letters-3',
    opacity: flashShow.opacityIn,
    scale: flashShow.scaleIn,
    duration: flashShow.durationIn
  }).add({
    targets: '.flashShow .letters-3',
    opacity: 0,
    scale: flashShow.scaleOut,
    duration: flashShow.durationOut,
    easing: "easeInExpo",
    delay: flashShow.delay
  }).add({
    targets: '.flashShow',
    opacity: 0,
    duration: 500,
    delay: 500
  });