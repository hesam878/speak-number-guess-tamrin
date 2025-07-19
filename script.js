const msgEl = $('#msg');
const randomNum = getRandomNumber();
console.log('عدد:', randomNum);
window.SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.start();
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}
function toEnglishDigits(str) {
  return str.replace(/[۰-۹]/g, d => '0123456789'[d.charCodeAt(0) - 1776]);
}
function toPersianDigits(num) {
  return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

function writeMessage(msg) {
  msgEl.html( `
    <div>عدد شما: </div>
    <span class="box">${msg}</span>
  `);
}
function checkNumber(msg) {
  const englishMsg = toEnglishDigits(msg);
  const num = +englishMsg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.append('<div>شماره شما معتبر نیست</div>');
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.append('<div>شماره باید بین 1 تا 100 باشد</div>');
    return;
  }

  // Check number
  if (num === randomNum) {
    $('body').html( `
      <h2>تبریک! شما عدد را حدس زدید!<br><br>
      عدد ${toPersianDigits(num)}</h2>
      <button class="play-again" id="play-again">بازی مجدد</button>
    `);
  } else if (num > randomNum) {
    msgEl.append('<div>عدد پایین تر است</div>');
  } else {
    msgEl.append('<div>عدد بالا تر است</div>');
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);


// End SR service
recognition.addEventListener('end', () => recognition.start());

$('body').on('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});