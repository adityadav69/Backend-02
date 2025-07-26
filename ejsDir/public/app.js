const btn=document.querySelectorAll('button')
for(let b of btn){
    b.addEventListener('click',()=>{
        alert('Button is clicked')
    })
}