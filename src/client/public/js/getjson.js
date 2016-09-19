var winners = [];

function locationExists(location) {
  return winners.some(function(el) {
    return el["Tour Date"] === location;
  });
}

$.ajax({url: '/csv', method: 'GET'}).done(function(data){
  data = JSON.parse(data);
  var dataLength = data.length;

  var potentialWinners = 10;
  while (winners.length < potentialWinners) {
    var randomIndex = Math.floor((Math.random() * dataLength) + 1),
    selectedWinner = data[randomIndex];
    if(!locationExists(selectedWinner["Tour Date"])){
      winners.push(selectedWinner);
    } else {
      console.log("location exists, finding another winner");
    }
  }

  $.each(winners, function(i, v){
    var winner = v,
    firstName = winner["First Name"],
    lastName = winner["Last Name"],
    emailAddress = winner["Email Address"],
    tourDate = winner["Tour Date"],
    newLi = $('<li>');
    newLi.html("Name: "+firstName+" "+lastName+" | Email: "+emailAddress+" | Tour Date: "+tourDate);
    $('.winners-list').append(newLi);
  });

});
