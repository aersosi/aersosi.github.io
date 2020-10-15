async function getAvodaqOffices() {
    let response = await fetch("https://avodaq.com/locations");
    let data = await response;
    return data;
  }
  
  const hamburgOffice = getAvodaqOffices().find('hamburg_office')
  const thisUser = hamburgOffice.find('you')
  const thisToilet = hamburgOffice.querySelector('🚽')
  const thisTrash = thisToilet.findNeighbour('🗑')
  let paperTowels = ['towel','towel','towel','towel','towel']
  
  function use_towels_properly(user){
    let towelUsed = paperTowels.find('firstTowel').usedBy(user).throwAway()
    if(towelUsed === thisToilet){
      const pipes = thisToilet.getElement('drainPipe')
      const blockedPipes = pipes.blockAll(towelUsed)
      const randomTime = Math.random()
      const repair = () => {
        setTimeout(function(){
        let finishedRepair = blockedPipes.repair()
        if(finishedRepair === true) {
          let repairCosts = ['💵','💵','💵']
          return repairCosts;
        }
      }, randomTime)};
      return ['💩', repair,'💔', '😭'];
    } else if (towelUsed === thisTrash) {
      return ['👍', '🌈', '🆒', '😻']
    } else {
      const message = 'Have a nice day!';
      return message;
    }
  }
  
  thisToilet.addEventListener("washhands", use_towels_properly(thisUser))