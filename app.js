const cl=console.log;
const stdForm=document.getElementById('stdForm');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const contact=document.getElementById('contact');
const email=document.getElementById('email');
const submit=document.getElementById('submit');
const stdContainer=document.getElementById('stdContainer');
const alertmsg=document.getElementById('alertmsg');
const table=document.getElementById('table');
const updatestd=document.getElementById('updatestd');

let stdarr=localStorage.getItem('stdarr') ? JSON.parse(localStorage.getItem('stdarr')):[]
const openSnackBar=(msg,icon)=>{
    Swal.fire({
        title:msg,
        icon:icon,
        timer:3000

    })
}

const showalertmsg=(arr)=>{
    if(arr.length===0){
        alertmsg.classList.remove('d-none')
        table.classList.add('d-none')
    }
    else{
        alertmsg.classList.add('d-none')
        table.classList.remove('d-none')
    }
}
showalertmsg(stdarr)
const generateUuid=()=>{
    return(
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')).replace(/[xy]/g,(character)=>{
            const random=(Math.random()*16)|0;
            const value=character==="x" ? random : (random & 0x3)|0x8;
            return value.toString(16);
        })
};
const onEdit=(e)=>{
    let editid=e.closest('tr').id
    localStorage.setItem('editid',editid)
    let editobj=stdarr.find(std=>std.id===editid)
    fname.value=editobj.fname
    lname.value=editobj.lname
    contact.value=editobj.contact
    email.value=editobj.email
    submit.classList.add('d-none')
    updatestd.classList.remove('d-none')
}
const onUpdate=(e)=>{
    let editid=localStorage.getItem('editid')
    let updatedobj={
        fname:fname.value,
        lname:lname.value,
        contact:contact.value,
        email:email.value,
        id:editid
    }
    stdForm.reset()
    updatestd.classList.add('d-none')
    submit.classList.remove('d-none')
    let editindex=stdarr.findIndex(std=> std.id===editid)
    stdarr[editindex]=updatedobj;
    localStorage.setItem('stdarr',JSON.stringify(stdarr))
    const alltds=
    [...document.getElementById(editid).children]
    alltds[1].innerHTML=updatedobj.fname
    alltds[2].innerHTML=updatedobj.lname
    alltds[3].innerHTML=updatedobj.contact
    alltds[4].innerHTML=updatedobj.email
    openSnackBar(`New Student "${updatedobj.fname} ${updatedobj.lname}" Updated Successfully!`,'success')
}
const createtrs=(arr)=>{
    let result=stdarr.map((std,i)=>
        `<tr id="${std.id}">
    <td>${i+1}</td>
    <td>${std.fname}</td>
    <td>${std.lname}</td>
    <td>${std.contact}</td>
    <td>${std.email}</td>
    <td class="text-center"><i class="fas fa-edit fa-2x test-success" onclick="onEdit(this)"></i></td>
      <td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger" onclick="onRemove(this)"></i></td>
    </tr>
    `).join('')
    stdContainer.innerHTML=result;
}
createtrs(stdarr)

const onRemove=(e)=>{
    let getconfirm=confirm(`Are you sure want to remove? `)
    if(getconfirm){
        removeid=e.closest('tr').id
        let removeindex=stdarr.findIndex(std=>std.id===removeid)
        stdarr.splice(removeindex,1)
        localStorage.setItem('stdarr',JSON.stringify(stdarr))
        e.closest('tr').remove()
        let alltrs=[...document.querySelectorAll('#stdcontainer tr')]
        alltrs.forEach((tr,i)=>tr.firstElementChild.innerHTML=i+1)
        openSnackBar(`student removed successfully!`,'success')
        showalertmsg(stdarr)
    }
}
const onSubmit=(e)=>{
    e.preventDefault()
    let obj={
        fname:fname.value,
        lname:lname.value,
        contact:contact.value,
        email:email.value,
        id:generateUuid()
    }
    stdForm.reset()
    stdarr.push(obj)
    localStorage.setItem('stdarr',JSON.stringify(stdarr))
    let newtr=document.createElement('tr')
    newtr.id=obj.id
    newtr.innerHTML=`
    <td>${stdarr.length}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
    <td>${obj.contact}</td>
    <td>${obj.email}</td>
    <td class="text-center"><i class="fas fa-edit fa-2x test-success" onclick="onEdit(this)"></i></td>
      <td class="text-center"><i class="fas fa-trash-alt fa-2x text-danger" onclick="onRemove(this)"></i></td>
    </tr>`
    stdContainer.append(newtr)
    showalertmsg(stdarr)
    openSnackBar(`New Student "${obj.fname} ${obj.lname}" Added Successfully!`,'success')
}
stdForm.addEventListener('submit',onSubmit)
updatestd.addEventListener('click',onUpdate)
