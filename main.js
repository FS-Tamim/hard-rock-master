const form=document.querySelector(".form");
const search=document.querySelector(".search");
const result=document.querySelector(".result");
const singleLyrics=document.querySelector(".single-lyrics");
const message=document.querySelector(".message");


const apiurl='https://api.lyrics.ovh';
// const apiurl='https://private-anon-9071ac0825-lyricsovh.apiary-mock.com';

//search by song or artist
async function searchSongs(term){

    const res=await fetch(`${apiurl}/suggest/${term}`);
    const data=await res.json();
     console.log(data);
    showData(data);
    
}

//show song and artist in dom

function showData(data){
    let output='';
    let count=0;

    data.data.forEach(song=>{
        count++;
        if(count<=10){
            output+=` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </div>
        </div>`
        }else{
            return 0;
        }

    });
    result.innerHTML=`${output}`;
}

async function  getLyrics(artist,songTitle){
    const res= await fetch(`${apiurl}/v1/${artist}/${songTitle}`);
    const data=await res.json();

    const lyrics=data.lyrics;
    // replace(/(\r\n|\r|\n)/g,'<br>');
   

    if(lyrics!=undefined){
        singleLyrics.innerHTML=`<h2 class="text-success mb-4"><strong>${songTitle}</strong></h2>
        <h2 class="text-success mb-4">${artist}</h2>
        <pre class="lyric text-white">
             ${lyrics}
        </pre>`;
        message.innerHTML="";

    }else{
        message.innerHTML="<h1 class='text-center'>Sorry! we can't find any lyrics</h1>";
        singleLyrics.innerHTML="";

    }
  
}

//subit eventlistener
form.addEventListener("submit",e=>{

    e.preventDefault();

    const searchTerm=search.value.trim();
    singleLyrics.innerHTML="";

    if(!searchTerm){
        result.innerHTML="";
        message.innerHTML='<h1 class="text-center">Please type in the search box</h1>';
    }else{
        searchSongs(searchTerm);
        search.value="";

    }
});

//get lyrics

result.addEventListener("click",e=>{

    const clickedEl=e.target;

    if(clickedEl.tagName==="BUTTON"){
        
        const artist=clickedEl.getAttribute('data-artist');
        const songTitle=clickedEl.getAttribute('data-songtitle');
        console.log(artist);
        console.log(songTitle);

        getLyrics(artist,songTitle);
    }
})