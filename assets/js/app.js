const cl=console.log;

const userForm=document.getElementById("userForm");
const user=document.getElementById("user");
const userCard=document.getElementById("userCard");

const baseUrl=`https://api.github.com/users`

const repoUl=(arr)=>{
    let result=`<P>`
  for (let i = 0; i < 5; i++) {
        
        result +=`<a class="mr-3" href="${arr[i].html_url}">${arr[i].name}</a>`
    
  }
  result +=`</p>`
    return result
}
const makeApicall= async (url)=>{
    try{
        let res= await fetch(url)
       return res.json()
    }catch(err){
userCard.classList.remove("d-none")
userCard.innerHTML=`<h2 class="bg-dark text-white p-5">no profile with this username</h2>`
    }

}

userForm.addEventListener("submit",async (eve)=>{
    eve.preventDefault();
    let userUrl=`${baseUrl}/${user.value}`
    //cl(userUrl)
eve.target.reset()
    try {
        let res=await makeApicall(userUrl)
       // let data=JSON.parse(res)
        let repoUrl=res.repos_url;
        let repoList= await makeApicall(repoUrl)
        cl(repoList)
        
userCard.classList.remove("d-none")
userCard.innerHTML=` <img src="${res.avatar_url}alt="user">
<div class="card-body">
  <h5 class="card-title">${res.name}</h5>
  <h6 class="card-subtitle my-4 d-flex justify-content-between"><span>${res.followers} Followers </span><span>${ res.following} Following </span><span>${ res.public_repos} Repos</span></h6>
${repoUl(repoList)}
</div>`
    } catch (err) {
        
userCard.classList.remove("d-none")
userCard.innerHTML=`<h2 class="text-white p-5">No profile with this username</h2>`
    }

})