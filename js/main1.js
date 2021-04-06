const btn = document.getElementById('btn');
const paginationwrapper = document.querySelector(".pagination");
const postlistwrapper = document.querySelector(".bigcontainer");
const perpagecount = 3;
btn.addEventListener('click',  async () => {
    
    
    

        const product_id = document.getElementById('product_id').value;
        const viewer_id = document.getElementById('viewer_id').value;
        console.log('You have pressed the button');
        
        const url = `http://www.i2ce.in/reviews/${product_id}/${viewer_id}`
        const response = await fetch(url);
        const data = await response.json();
        const arraydata = [data];
        // console.log(arraydata);
        
        // console.log(arraydata[0].product_id);
        
        
        // console.log(reviews);
        // console.log(reviews[0]);
        // console.log(reviews[0].like);
        
        // console.log(reviews[0].ratings);
        // console.log(reviews[0].ratings.Overall);
        
        var productid = arraydata[0].product_id;
        const reviews = arraydata[0].reviews;
        var reviewid = arraydata[0].review_id;
        
    

    // console.log(reviews[0].reviewer.name)

    // for pegination and dislaying data
    const totalcount = reviews.length;
    
    const countpaginationnumber = Math.floor(totalcount / perpagecount);

    renderpegination(countpaginationnumber);
    renderpostlist(reviews);

});

const renderpostlist = (postlist) => {
    postlistwrapper.innerHTML = ""

   
    for (let k = 0; k < 3; k++) {


        const postlistdiv = document.createElement('div');
        postlistdiv.classList.add("showdata");

        // const para = document.createElement("p")
        // var title = postlist[0].title;
        // var like = postlist[0].like
        postlistdiv.innerHTML = `<p><span style="font-weight: bold">Title</span> : ${postlist[k].title}</p>
                                    <p><span style="font-weight: bold">Comment</span> : ${postlist[k].comment}</p>
                                    <p><span style="font-weight: bold">Usefulness</span> : ${postlist[k].usefulness}</p>`

        if (postlist[k].friend === true) {
            postlistdiv.innerHTML += `<p><span style="font-weight: bold">Name</span> : ${postlist[k].reviewer.name}</p>`
        }
        // postlistdiv.appendChild(para);
        postlistwrapper.appendChild(postlistdiv);
    }
}

const renderpegination = (countpaginationnumber) => {
    paginationwrapper.innerHTML = "";

    for (let i = 0; i < countpaginationnumber; i++) {

        const anchor = document.createElement("a");
        anchor.classList.add('page-link');
        anchor.setAttribute("href", "#");
        const count = i + 1;
        anchor.innerHTML = count;

        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");

        

        pageItem.appendChild(anchor);

        paginationwrapper.appendChild(pageItem);
    }
}