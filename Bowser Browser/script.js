function search() {
    const searchInput = document.getElementById("searchInput").value;
    const apiKey = "yout_api_key"; 
    const cx = "yout_cx";  


    fetch(`https://www.googleapis.com/customsearch/v1?q=${searchInput}&key=${apiKey}&cx=${cx}`)

        .then(response => response.json())
        .then(data => {
            const results = data.items;
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; 


            if (results.length === 0) {
                resultsDiv.innerHTML = "No Result.";
            } 
            else {
                results.forEach(result => {
                    const title = result.title;
                    const link = result.link;
                    const snippet = result.snippet;
                    const resultDiv = document.createElement("div");

                    resultDiv.innerHTML = `
                        <h2><a class="result-link" target="_blank">${title}</a></h2>
                        <p>${snippet}</p>
                    `;

                    resultDiv.style.border = "1px solid black";
                    resultDiv.style.padding = "10px";
                    resultDiv.style.margin = "20px";
                    resultDiv.style.borderRadius='15px';
                    resultDiv.style.cursor= 'pointer';
                    resultDiv.style.alignItems='center';
                    resultDiv.addEventListener('mouseover',()=>{resultDiv.style.backgroundColor='azure'});
                    resultDiv.addEventListener('mouseout',()=>{resultDiv.style.backgroundColor='white'});

                    resultDiv.addEventListener("click",()=> {
                        window.open(link, "_blank");
                    });
                    resultsDiv.appendChild(resultDiv);
                });
            }
       })
}


const icon = document.getElementById('searchButton');
icon.addEventListener('click',()=>{
    search();
    icon.classList.add('active');

    setTimeout(() => {
        icon.classList.remove('active');
    }, 1000);
});


const entryArea = document.getElementById("entry-area");
const searchArea = document.getElementById("search-area");
const clockC =document.getElementById('clock');
const aT = document.querySelector('.at');
const aT2 = document.querySelector('.at2');
let isFixed = false;

window.addEventListener("scroll", function () {
    if (window.scrollY > searchArea.offsetHeight) {
        if (!isFixed) {
            isFixed = true;
            entryArea.style.position = "fixed";
            entryArea.style.top = "0";
            entryArea.style.left = "0";
            entryArea.style.width = "100%";
            entryArea.style.backgroundColor = "rgba(0, 66, 107, .7)";
            entryArea.style.backdropFilter = "blur(10px)";
            entryArea.style.boxShadow='0 5px 20px';
            clockC.style.color='black';
            clockC.style.borderBottom='3px solid black'
            aT.style.color='black';
            aT2.style.color='black';
            aT.addEventListener('mouseover',()=>{aT.style.color='azure';});
            aT.addEventListener('mouseout',()=>{aT.style.color='black';});
            aT.style.transition='color .15s linear';

            aT2.addEventListener('mouseover',()=>{aT2.style.color='azure';});
            aT2.addEventListener('mouseout',()=>{aT2.style.color='black';});
            aT2.style.transition='color .15s linear';

        }
    } 
    else {
        if (isFixed) {
            isFixed = false;
            entryArea.style.position = "static";
            entryArea.style.width = "auto";
            entryArea.style.backgroundColor = 'initial';
            entryArea.style.backdropFilter = 'initial'; 
            entryArea.style.boxShadow='initial';
            clockC.style.color='azure';
            clockC.style.borderBottom='3px solid azure'
            aT.style.color='azure';
            aT2.style.color='azure';
            aT.addEventListener('mouseover',()=>{aT.style.color='black';});
            aT.addEventListener('mouseout',()=>{aT.style.color='azure';});
            aT.style.transition=' color .15s linear';

            aT2.addEventListener('mouseover',()=>{aT2.style.color='black';});
            aT2.addEventListener('mouseout',()=>{aT2.style.color='azure';});
            aT2.style.transition='color .15s linear';
        }
    }
    
});


const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
        icon.classList.add('active');

        setTimeout(() => {
            icon.classList.remove('active');
        }, 1000);
    }
});


function updateClock() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const dayName = daysOfWeek[now.getDay()];
    const day = now.getDate().toString().padStart(2, "0");
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    document.getElementById("dayName").textContent = dayName;
    document.getElementById("day").textContent = day;
    document.getElementById("monthName").textContent = monthName;
    document.getElementById("year").textContent = year;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
}
setInterval(updateClock, 1000);


const digit=document.querySelector('.digital-clock');
digit.addEventListener('mouseover',()=>{
    digit.style.cursor='pointer';
    digit.style.transform = 'scale(1.2) translateX(-20px)';
    digit.style.transition = 'transform 0.3s ease';
});
digit.addEventListener('mouseout',()=>{
    digit.style.cursor='pointer';
    digit.style.transform = 'scale(1) translateX(0)';
    digit.style.transition = 'transform 0.3s ease';
});

