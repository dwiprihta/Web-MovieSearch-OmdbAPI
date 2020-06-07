function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url:'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'dca61bcc',
            's' : $('#search-input').val()
        },

        success: function (result){
           if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-lg-4 mt-4 justify-content-center">
                    <div style="border-radius:20px;" class="card">
                        <img style="border-radius:20px;" src="` + data.Poster + `" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">` + data.Title + `</h5>
                        <p class="card-text">` + data.Year + `</p>
                        <a href="#" class="btn btn-sm btn-dark see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                    `)
                });

                $('#search-input').val('');
           }else{
               $('#movie-list').html(`
               <div class="col">
                <h1 class="text-center">` + result.Error + `</h1>
               </div>`)
           }
        }
    });
}

$('#search-button').on('click', function () {
   searchMovie();
});


$('#search-input').on('keyup', function(e){
    if (e.keyCode === 13){
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function(){
    $.ajax({
        url:'http://omdbapi.com',
        dataType:'Json',
        type:'get',
        data:{
            'apikey': 'dca61bcc',
            'i':$(this).data('id')
        },
            success:function(movie){
                if (movie.Response==="True"){
                    $('.modal-body').html(`
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <img src="` + movie.Poster + `" class="img-fluid">
                                </div>
                                <div class="col-md-8 ">
                                    <ul class="list-group">
                                        <li class="list-group-item">` + movie.Title + `</li>
                                        <li class="list-group-item">` + movie.Released + `</li>
                                        <li class="list-group-item">` + movie.Director + `</li>
                                        <li class="list-group-item">` + movie.Actors + `</li>
                                        <li class="list-group-item">` + movie.Genre + `</li>
                                        <li class="list-group-item">` + movie.Runtime + `</li>
                                        <li class="list-group-item">` + movie.Rated + `</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `);
                }
            }
    });
});