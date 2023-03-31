const env = {
  // API_URL: 'http://localhost:3000/api'
  API_URL: 'https://backend.easyearn.co.in/api'
}


var plans = [];


function getPlans() {
  $.ajax({
    url: `${env.API_URL}/user/get-plans`,
    type: 'GET',
    dataType: 'json',
    success: function (data) {

      console.log('data', data);
      if (data && data?.result) {
        plans = data?.result;
        insertProductPlans(plans);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // The API call failed. Handle the error as needed.
      console.error('Error getting plans from API: ' + textStatus + ', ' + errorThrown);
    }
  });
}

function insertProductPlans(plans) {
  // Loop through each plan in the array
  for (var i = 0; i < plans.length; i++) {
    // Create a new div element for the product plan
    var plan = plans[i];
    // Add the plan's data to the div element

    var div1 = $("<div></div>").addClass("col-xl-3 col-lg-4 col-md-6 mb-30");
    var div2 = $("<div></div>").addClass("package-card text-center bg_img")
      // .attr("data-background", "assets/images/bg/bg-4.png");
      .css('background-image', function () {
        var bg = ('url(../assets/images/bg/bg-4.png)');
        return bg;
      });
    var h4 = $("<h4></h4>").addClass("package-card__title base--color mb-2").text(`${plan.plan_name}`);
    var ul = $("<ul></ul>").addClass("package-card__features mt-4");
    // var li1 = $("<li></li>").text("Return 0.2%");
    // var li2 = $("<li></li>").text("Every Day");
    var li3 = $("<li></li>").text("For Lifetime");
    var li4 = $("<li></li>").text("Lifetime Earning");
    var div3 = $("<div></div>").addClass("package-card__range mt-5 base--color").text(`₹ ${plan.amount}`);
    var a = $("<a></a>").addClass("cmn-btn btn-md mt-4").attr("href", `../app/#/dashboard/plans?planId=${plan.plan_id}`).text("Invest Now");

    // Append the elements to the DOM
    // li1, li2,
    ul.append(li3, li4);
    div2.append(h4, ul, div3, a);
    div1.append(div2);
    $("#plan-container").append(div1);
  }
}

getPlans();
