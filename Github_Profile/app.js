const formElement = document.querySelector('.form')
const formInput = document.querySelector('.form__input')
const profileElement = document.querySelector('.profile')

const BASE_URL = `https://api.github.com/users/`

async function getGithubUser(searchValue) {
    try {
        const response = await fetch(BASE_URL + searchValue)
        const data = await response.json()
        if (response.ok) {                      // if the user exists then  
            renderUserProfile(data)             // render the user Profile Card
            getGithubUserRepos(data.repos_url)  // also fetch the user's Repo
        }
        else
            alert(`No user is available with name ${searchValue}`)
    } catch (error) {
        console.log(error)
    }
}


async function getGithubUserRepos(repoURL) {
    try {
        const response = await fetch(repoURL)
        data = await response.json()
        if (response.ok) {          // if the response was ok 
            renderUserRepos(data)   // render the User Repo cards
        }
    } catch (error) {
        console.log(error)
    }
}


function renderUserProfile(userProfile) {
    let profileElementInnerHTML = `
    <div class="profile__image">
        <img src="${userProfile.avatar_url}"
            alt="">
    </div>
    <div class="profile__info">
        <h2 class="profile__infoName">${userProfile.login}</h2>
        <h5 class="profile__infoLogin">${userProfile.name ? userProfile.name : ''}</h5>
        <p class="profile__infoBio">${userProfile.bio ? userProfile.bio : ''}</p>
        <div class="profile__infoStats">
            <span class="profile__infoStatsObj">
            ${userProfile.public_repos} <small class="profile__infoStats__Small">Repos</small>
            </span>

            <span class="profile__infoStatsObj">
            ${userProfile.followers} <small class="profile__infoStats__Small">Followers</small>
            </span>

            <span class="profile__infoStatsObj">
            ${userProfile.following} <small class="profile__infoStats__Small">Following</small>
            </span>            
        </div>
        <div class="profile__infoRepos"> </div>
        <a href="${userProfile.html_url}" target='_blank' class="profile__infoGitHubLink">Visit Github</a>
    `
    profileElement.innerHTML = profileElementInnerHTML
}


function renderUserRepos(userRepos) {
    if (userRepos.length > 0) {
        for (let i = 0; i < userRepos.length; i++) {
            for (let j = 0; j < userRepos.length - i - 1; j++) {
                const isFirstDateGreator = new Date(userRepos[j].updated_at.substring(0, 10)) < new Date(userRepos[j + 1].updated_at.substring(0, 10))
                if (isFirstDateGreator) {
                    [userRepos[j], userRepos[j + 1]] = [userRepos[j + 1], userRepos[j]]
                }
            }
        }

        let profileInfoReposInnerHTML = ''
        // take the first five repos
        userRepos.slice(0, 5).forEach(repo => {
            profileInfoReposInnerHTML += `
                <a href="${repo.html_url}" class="profile__infoReposLink" target="_blank">${repo.name}</a>
            `
        })

        const profileInfoReposElement = profileElement.querySelector('.profile__infoRepos')
        profileInfoReposElement.innerHTML = profileInfoReposInnerHTML

    } else
        console.log('no repos')

}


function handleFormSubmit(event) {
    event.preventDefault()                  // prevent the event from submitting
    const searchValue = formInput.value

    getGithubUser(searchValue)

    formInput.value = ''
}


formElement.addEventListener('submit', handleFormSubmit)
window.onload = getGithubUser('mani-barathi')             // Once when the page loads fetch my Github Profile