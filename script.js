const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable Button
 function toggleButton() {
    button.disabled = !button.disabled
 }
// Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'e463c2dd76f0433ab541e89e6bd010f1',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from Joke api
async function getJokes(){
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else{
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellMe(joke)
        // Disable Button
        toggleButton();
    } catch(err){
        console.log(err, 'error');
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);
