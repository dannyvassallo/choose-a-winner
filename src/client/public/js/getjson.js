var winners = [];

function fieldExists(fieldToCheck) {
  return winners.some(function(el) {
    return el[fieldToCheck] === fieldToCheck;
  });
}

function getRandomWinners(potentialWinners, data, fieldToCheck){
  var dataLength = data.length;
  winners = [];
  while (winners.length < potentialWinners) {
    var randomIndex = Math.floor((Math.random() * dataLength) + 1),
    selectedWinner = data[randomIndex];
    if(!fieldExists(fieldToCheck, selectedWinner[fieldToCheck])){
      winners.push(selectedWinner);
    } else {
      console.log("field exists, finding another winner");
    }
  }
  console.log(winners);
  return winners;
}

// Make AJAX Call
$('.getwinners').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();

  $('.winners-list').empty();

  $.ajax({url: '/csv', method: 'GET'}).done(function(data){
    data = JSON.parse(data);

    getRandomWinners(10, data, "Tour Dates");

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
});
