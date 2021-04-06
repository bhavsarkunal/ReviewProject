const btn = document.getElementById('btn');
const paginationwrapper = document.querySelector(".pagination");
const postlistwrapper = document.querySelector(".bigcontainer");
const perpagecount = 3;

btn.addEventListener('click', () => {


    const getcontent = async (start, end) => {

        const product_id = document.getElementById('product_id').value;
        const viewer_id = document.getElementById('viewer_id').value;

        if (product_id < 21 && viewer_id < 11) {

            const url = `http://www.i2ce.in/reviews/${product_id}/${viewer_id}`;
            const response = await fetch(url);
            const data = await response.json();
            const arraydata = [data];
            var reviews = arraydata[0].reviews;

            const totalcount = reviews.length;
            const countpaginationnumber = Math.ceil(totalcount / perpagecount);

            renderpostlist(reviews.slice(start, end));
            renderpegination(countpaginationnumber);

        }

        else if (product_id === "" || viewer_id === "") {
            alert("Error!! Enter Product Id and Viewer Id")
        }
        else {
            alert("Enter Correct Product Id and Viewer Id");
        };


    };
    getcontent(0, 3);
    const renderpostlist = (postlist) => {
        postlistwrapper.innerHTML = "";

        for (let k = 0; k < postlist.length; k++) {


            const postlistdiv = document.createElement('div');
            postlistdiv.classList.add("showdata");

            postlistdiv.innerHTML = `<p><span style="font-weight: bold">Title</span> : ${postlist[k].title}</p>
                                    <p><span style="font-weight: bold">Comment</span> : ${postlist[k].comment}</p>
                                    <p><span style="font-weight: bold">Usefulness</span> : ${postlist[k].usefulness}</p>`;

            if (postlist[k].friend === true) {
                postlistdiv.innerHTML += `<p><span style="font-weight: bold">Name</span> : ${postlist[k].reviewer.name}</p>`;
            }
            postlistdiv.innerHTML += `<p><span style="font-weight: bold">Ratings</span> : ${postlist[k].ratings.Overall}</p>`;

            const button = document.createElement("button");
            button.innerHTML = "Show More Ratings";
            button.classList.add("showmorebtn");
            postlistdiv.appendChild(button);

            button.addEventListener("click", (e) => {
                postlistdiv.innerHTML += `<p><span style="font-weight: bold">Delivery Time</span> : ${postlist[k].ratings.delivery_time}</p>
                <p><span style="font-weight: bold">Discounts and Offers</span> : ${postlist[k].ratings.discounts_and_offers}</p>
                <p><span style="font-weight: bold">Matches Discription</span> : ${postlist[k].ratings.matches_description}</p>
                <p><span style="font-weight: bold">Matches Photo</span> : ${postlist[k].ratings.matches_photo}</p>
                <p><span style="font-weight: bold">Packaging</span> : ${postlist[k].ratings.packaging}</p>
                <p><span style="font-weight: bold">Price</span> : ${postlist[k].ratings.price}</p>`;
            });



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
                getcontent(start, end);
            });

            pageItem.appendChild(anchor);

            paginationwrapper.appendChild(pageItem);
        };
    };
});