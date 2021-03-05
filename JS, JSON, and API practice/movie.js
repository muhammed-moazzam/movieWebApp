let movieJSON = {};

function init(){
  let movieID = document.getElementById("movie-id");
  let getMovie = document.getElementById("get_movie");

  getMovie.addEventListener("click", function() {
    if(movieID != ""){

      let reviews = document.getElementById("new-reviews");
      reviews.querySelectorAll('*').forEach(n => n.remove());
      let revHeader = document.createElement("h1");
      let br1 = document.createElement("br");
      let br2 = document.createElement("br");
      revHeader.innerHTML = "Reviews";
      reviews.appendChild(revHeader);
      reviews.appendChild(br1);
      reviews.appendChild(br1);

      loadMovie(movieID.value);
    }else{
      alert("Invalid ID");
    }
  });

  let name = document.getElementById("rName");
  let rating = document.getElementById("rRating");
  let review = document.getElementById("rReview");
  let addReview = document.getElementById("add-review");
  addReview.addEventListener("click", function() {
    if(name.value != "" && rating.value >= 1 && rating.value <= 10 && review.value != ""){
      addReviewHandler(name.value, rating.value, review.value);
      name.value = "";
      rating.value = "";
      review.value = "";
    }else{
      alert("Invalid Review!!");
    }
  });
}

function loadMovie(mID){

  let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			movieJSON = JSON.parse(xhttp.responseText);
			render();
		}
	};

	xhttp.open("GET", 'http://www.omdbapi.com/?i=' + mID + '&apikey=2a102c58', true);
	xhttp.send();
}

function render(){
	let movie_title = document.getElementById("movie-title");
  let movie_year = document.getElementById("movie-year");
  let movie_runtime = document.getElementById("movie-runtime");
  let cast = [];
  let movie_cast = document.getElementById("movie-cast");

  movie_title.innerHTML = "Movie Title: " + movieJSON.Title;
  movie_year.innerHTML = "Release Year: " + movieJSON.Year;
  movie_runtime.innerHTML = "Runtime: " + movieJSON.Runtime;
  cast = movieJSON.Actors.split(',');

  let content = "Cast: ";
  cast.forEach(cast => {
    content += cast + ", "
  })

  content += " ...";

  movie_cast.innerHTML = content;
}

function addReviewHandler(name, rating, review){
  let reviewsDiv = document.getElementById("new-reviews");
  let newDiv = document.createElement("div");
  newDiv.className = "new-review";

  let nameTag = document.createElement("p");
  nameTag.innerHTML = "Name: ";
  let ratingTag = document.createElement("p");
  ratingTag.innerHTML = "Rating: ";
  let reviewTag = document.createElement("p");
  reviewTag.innerHTML = "Review: ";

  let nameVal = document.createElement("p");
  nameVal.innerHTML = name;
  let ratingVal = document.createElement("p");
  ratingVal.innerHTML = rating + " (1 - 10)";
  let reviewVal = document.createElement("p");
  reviewVal.innerHTML = review;

  let br1 = document.createElement("br");
  let br2 = document.createElement("br");
  let br3 = document.createElement("br");


  newDiv.appendChild(nameTag);
  newDiv.appendChild(nameVal);
  newDiv.appendChild(br1);

  newDiv.appendChild(ratingTag);
  newDiv.appendChild(ratingVal);
  newDiv.appendChild(br2);

  newDiv.appendChild(reviewTag);
  newDiv.appendChild(reviewVal);
  newDiv.appendChild(br3);

  reviewsDiv.appendChild(newDiv);
}
