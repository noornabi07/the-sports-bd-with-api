const findAllInfo = (id) =>{
    const inputText = document.getElementById('search-input');
    const inputValue = inputText.value;
    inputText.value = '';
    document.getElementById('spinner').classList.remove('d-none')
    document.getElementById('showSingleInfo').innerHTML = '';
    document.getElementById('male').classList.add('d-none');
    document.getElementById('female').classList.add('d-none')

    const searchId = id || inputValue;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('spinner').classList.add('d-none');
        showDataPlayer (data.player)
    });
}

const showDataPlayer = informs =>{
    const playersContainer = document.getElementById('player-container');
    playersContainer.innerHTML = '';
    informs.forEach(inform =>{

        const {strThumb, strNationality, strPlayer, idPlayer} = inform;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
          <img src="${strThumb ? strThumb : 'https://picsum.photos/seed/picsum/500/500'}" class="card-img-top" alt="...">
         <div class="card-body text-center">
          <h5 class="card-title text-danger">${strPlayer}</h5>
          <p class="card-text">Nationality: ${strNationality}</p>
         </div>
        
         <div class="d-flex gap-2">
             <button onclick="getPlayerInfo('${idPlayer}')" type="button" class="btn btn-outline-success w-50 mx-auto">Details</button>
            <button onclick ="deleteInfo()" type="button" class="btn btn-outline-danger w-50 mx-auto">Delete</button>
         </div>

        </div>
        `;
        playersContainer.appendChild(div)
        // console.log(inform)
    })
}

const getPlayerInfo = (idPlayer) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPlayerInfo(data.players[0]))
}

const showPlayerInfo = playersInfo =>{
    const singleInfoContainer = document.getElementById('showSingleInfo');
    singleInfoContainer.innerHTML = '';
    const {strThumb, strTeam, strDescriptionEN, strGender} = playersInfo;
    const div = document.createElement('div');
    if(strGender === "Male"){
        const male = document.getElementById('male');
        male.classList.remove('d-none');
    }else{
        const female = document.getElementById('female');
        female.classList.remove('d-none');
    }
    div.innerHTML = `
    <div id="finish" class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title text-success">${strTeam}</h5>
          <p class="card-text">${strDescriptionEN.slice(0, 100)}...</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `;
    singleInfoContainer.appendChild(div);
    console.log(playersInfo);
}

const deleteInfo = () =>{
    const finis = document.getElementById('finish');
    finis.classList.add('d-none');
    document.getElementById('male').classList.add('d-none');
    document.getElementById('female').classList.add('d-none')

}
findAllInfo('messi');