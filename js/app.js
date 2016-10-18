var userInfo = document.querySelector('.usrInfo')
var userRepos = document.querySelector('.usrRepos')
var searchBar = document.querySelector('.srchBar')
var theTitle = document.querySelector('.topTitle')
var gitUser = 'vicula'
var apiLink = 'https://api.github.com/users/' + gitUser + '?' + myApiSecret
var apiLinkRepo = 'https://api.github.com/users/' + gitUser + '/repos?per_page=100&' + myApiSecret







if(typeof myApiSecret === 'undefined'){
   var myApiSecret = ''
}



var hashChangeHandler = function(){
   var usr = window.location.hash.slice(1)
   gitUser = usr
   apiLink = 'https://api.github.com/users/' + gitUser + '?' + myApiSecret
   apiLinkRepo = 'https://api.github.com/users/' + gitUser + '/repos?' + myApiSecret

   userInfo.innerHTML = ''
   userRepos.innerHTML = ''
   searchBar.value = ''

   $.getJSON(apiLink, function(usrData){

      fillUsrContent(usrData)

   })

   $.getJSON(apiLinkRepo, function(repoData){
      fillRepoContent(repoData)
   })



}

$.getJSON(apiLink, function(usrData){

   fillUsrContent(usrData)

})

$.getJSON(apiLinkRepo, function(repoData){
   fillRepoContent(repoData)
})



var fillUsrContent = function (data){
   var usrPic = document.createElement('img')
      usrPic.src = data.avatar_url
      userInfo.appendChild(usrPic)
   var usrNames = document.createElement('div')
      userInfo.appendChild(usrNames)
      var unNameLink = document.createElement('a')
         unNameLink.href = data.html_url
         usrNames.appendChild(unNameLink)
         var unName = document.createElement('h2')
            unName.textContent = data.name
            unNameLink.appendChild(unName)
      var unLogin = document.createElement('p')
         unLogin.textContent = data.login
         usrNames.appendChild(unLogin)
   var usrBio = document.createElement('div')
      userInfo.appendChild(usrBio)
      var ubBio = document.createElement('p')
         ubBio.textContent = data.bio
         usrBio.appendChild(ubBio)
      var ubLink = document.createElement('p')
         ubLink.textContent = data.html_url
         usrBio.appendChild(ubLink)
   var usrExtInfo = document.createElement('div')
      userInfo.appendChild(usrExtInfo)
      var ueiCompany = document.createElement('p')
         ueiCompany.innerHTML = '<i class="fa fa-users" aria-hidden="true"></i>' + '   ' + data.company
         usrExtInfo.appendChild(ueiCompany)
      var ueiBlog = document.createElement('p')
         ueiBlog.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>' + '   ' + data.blog
         usrExtInfo.appendChild(ueiBlog)
      var ueiLocation = document.createElement('p')
         ueiLocation.innerHTML = '<i class="fa fa-compass" aria-hidden="true"></i>' + '   ' + data.location
         usrExtInfo.appendChild(ueiLocation)
      var ueiEmail = document.createElement('p')
         ueiEmail.innerHTML = '<i class="fa fa-envelope-o" aria-hidden="true"></i>' + '   ' + data.email
         usrExtInfo.appendChild(ueiEmail)

         theTitle.textContent = 'Git.' + data.login


}

var fillRepoContent = function (data){

   for(var repo in data){
      var repoRow = document.createElement('div')
         repoRow.classList = 'repoRow'
         userRepos.appendChild(repoRow)
         var repoDesc = document.createElement('div')
            repoDesc.classList = 'col-sm-8'
            repoRow.appendChild(repoDesc)
            var rdNameLink = document.createElement('a')
               rdNameLink.href = data.html_url
               repoDesc.appendChild(rdNameLink)
            var rdName = document.createElement('h3')
               rdName.textContent = data[repo].name
               rdNameLink.appendChild(rdName)
            var rdDesc = document.createElement('p')
               rdDesc.textContent = data[repo].description
               repoDesc.appendChild(rdDesc)
         var repoStats = document.createElement('div')
            repoStats.classList = 'col-sm-4 repoStat'
            repoRow.appendChild(repoStats)
            var rsLang = document.createElement('p')
               rsLang.innerHTML = '<i class="fa fa-code" aria-hidden="true"></i>' + data[repo].language
               repoStats.appendChild(rsLang)
            var rsStars = document.createElement('p')
               rsStars.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>' + data[repo].stargazers_count
               repoStats.appendChild(rsStars)
      var repoHardRule = document.createElement('hr')
         userRepos.appendChild(repoHardRule)
   }
}



var changeHash = function(evt){

   if(evt.keyCode === 13){
      window.location.hash = searchBar.value

   }
}


window.addEventListener('hashchange', hashChangeHandler)
searchBar.addEventListener('keydown', changeHash)
