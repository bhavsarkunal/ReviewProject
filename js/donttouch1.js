const btn = document.getElementById('btn');
const paginationwrapper = document.querySelector(".pagination");
const postlistwrapper = document.querySelector(".bigcontainer");
const perpagecount = 3;

btn.addEventListener('click', () => {


    const getcontent = async (start, end) => {

        const product_id = document.getElementById('product_id').value;
        const viewer_id = document.getElementById('viewer_id').value;


        const url = `http://www.i2ce.in/reviews/20/4`
        const response = await fetch(url);
        const data = await response.json();
        const arraydata = [data];
        // console.log(arraydata);
        var reviews = arraydata[0].reviews;
        console.log(reviews)

        const totalcount = reviews.length;
        const countpaginationnumber = Math.ceil(totalcount / perpagecount);

        renderpostlist(reviews.slice(start, end));
        renderpegination(countpaginationnumber);


    }
    getcontent(0, 3)
    const renderpostlist = (postlist) => {
        postlistwrapper.innerHTML = ""

        for (let k = 0; k < postlist.length; k++) {


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

            pageItem.addEventListener("click", (e) => {

                const end = count * perpagecount;
                const start = end - perpagecount;
                console.log(start, end)
                getcontent(start, end);
            })

            pageItem.appendChild(anchor);

            paginationwrapper.appendChild(pageItem);
        }
    }
});