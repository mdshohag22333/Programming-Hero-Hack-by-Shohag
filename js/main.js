const milstonesData = JSON.parse(data).data;

// Load course milstones data
function loadMilstones(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = milstonesData.map(function (value){
    return `<div class="milestone border-b" id="${value._id}">
        <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${value._id})" /></div>
        <div onclick="openMilestone(this, ${value._id})">
            <p>
            ${value.name};
            <span><i class="fas fa-chevron-down"></i></span>
            </p>
        </div>
        </div>
        <div class="hidden_panel">
        ${value.modules.map(function(module){
        return `<div class="module border-b">
        <p>${module.name}</p>
      </div>`;
        }).join("")}
        </div>
    </div>`;
    }).join("");

}

function openMilestone(milestoneelement, id){
    const currentPanel = milestoneelement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector('.show');
    const active = document.querySelector(".active");

    //remove korci jodi konotay active class thake
    if(active && !milestoneelement.classList.contains("active")){
        active.classList.remove("active");
    }
    //toogle korci current cliked name
    milestoneelement.classList.toggle("active");

    //remove korci jodi konotay show class thake
    if(!currentPanel.classList.contains("show") && shownPanel){
        shownPanel.classList.remove("show");
    }
    //toggle current element
    currentPanel.classList.toggle("show");

    showMilestone(id);
}

function showMilestone(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const name = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milstonesData[id].image;
    name.innerText = milstonesData[id].name;
    details.innerText = milstonesData[id].description;
 
}

//listen for image load after change image (event)
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    this.style.opacity = "1";
};

function markMileStone(checkbox, id){
    const doneList = document.querySelector(".doneList");
    const milestoneList = document.querySelector('.milestones');
    const item = document.getElementById(id);

    if(checkbox.checked){
        //mark as done
        milestoneList.removeChild(item);
        doneList.appendChild(item);

    } else {
        //back to main list
        milestoneList.appendChild(item);
        doneList.removeChild(item);
        
    }


}

loadMilstones();

