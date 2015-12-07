/**
 * Created by alemjc on 12/2/15.
 */
$(document).ready(initializer);
var repoData;

function initializer(){
  console.log("here");
  $('li').on("click",jsonFiller);

  $('#github').off();
  $('#github').on("click",githubHandler);

}

function jsonFiller(e){
  console.log($(this));
  $(this).parent().find(".active").removeClass("active");
  $(this).addClass("active");
  var a = $(this).find("a");
  $.ajax({
    url:"package.json",
    dataType:"json",
    type:"GET",
    success: function( data, textStatus, jqXHR ) {
      $('#MyMainContent').empty();
      $('#MyMainContent').append(data[a.html()]);
    }
  })
}

function githubHandler(e){
  $(this).parent().find(".active").removeClass("active");
  $(this).addClass("active");
  $('#MyMainContent').empty();


  $.ajax({
    url:"https://api.github.com/users/alemjc/repos",
    dataType:"json",
    type:"GET",
    success: userReposHandler

  })
}

function userReposHandler(data){
  console.log(data);
  var row = $('<div class="row">');
  row.attr("id","tempRow");
  var col1 = $('<div class="col-md-6" id="repos">');
  var col2 = $('<div class="col-md-6" id="commits">');
  var ul = $('<ul class="list-group" id="unorderedList">');

  repoData = data;
  for(var i = 0; i < data.length; i++){
    var li = $('<li class="list-group-item">');
    var a = $('<a>'+data[i]["full_name"]+"</a>");
    a.attr("id",i+"");
    li.on("click",reposListHandler);

    li.append(a);
    ul.append(li);
  }

  col2.append($('<label for="par" class="control-label">'+"Commits"+'</label>'));
  col2.append($('<p id="par">'+"Click on any of the repositories to view!"+'</p>'));
  col1.append($('<label for="unorderedList" class="control-label">'+"Repositories"+'</label>'));
  col1.append(ul);
  row.append(col1);
  row.append(col2);
  $('#MyMainContent').append(row);


}

function reposListHandler(e){
  console.log($(e.target));

  var id = $(this).find("a").attr("id");
  console.log("id="+id);
  console.log("repoData=\n"+repoData);
  var tUrl = repoData[id]["commits_url"];
  tUrl = tUrl.substring(0,tUrl.indexOf("{"));
  $.ajax({
      url:tUrl,
      dataType:"json",
      type:"GET",
      success: userCommitsHandler
    }
  );

}

function userCommitsHandler(data){
  $('#commits').empty();
  var table = $('<table class="table table-hover" id="tbl">');
  var theader = $('<thead>');
  $('#commits').append($('<label for="tbl" class="control-label">'+"Commits"+'</label>'));

  theader.append($('<td>'+"Commit Message"+"</td>"));
  theader.append($('<td>'+"Author"+"</td>"));
  theader.append($('<td>'+"Date"+"</td>"));

  table.append(theader);

  for(var i = 0; i < data.length;i++){
    var tr = $('<tr>');
    var td = $('<td>');
    var a = $('<a>'+data[i]["commit"]["message"]+'</a>');
    a.attr("href",data[i]["html_url"]);
    a.attr("target","_blank");
    td.append(a);
    tr.append(td);
    td = $('<td>'+data[i]["commit"]["author"]["name"]+'</td>');
    tr.append(td);
    td = $('<td>'+data[i]["commit"]["author"]["date"]+'</td>');
    tr.append(td);

    table.append(tr);
  }

  $('#commits').append(table);

}