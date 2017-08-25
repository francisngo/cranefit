angular.module('sparrowFit')
.controller('AddGoalCtrl', function(goalService, store) {

    var profile = store.get('profile');
    this.userId = store.get('profile')['user_id'];

  this.insertGoal = function(){

    //fetch and create goal to be inserted
    var dynamicGoal = {}
    dynamicGoal.user_id = this.userId // to implement
    dynamicGoal.number = this.number;
    dynamicGoal.timeFrame = this.timeframe;
    dynamicGoal.name = this.name;
    dynamicGoal.emailAlert = this.hasEmailAlert;

    dynamicGoal = JSON.stringify(dynamicGoal);
    console.log('in insertGoal() in AddGoalCtrl = ');
    goalService.addGoal(dynamicGoal,function(goalInserted){
      console.log('mocked up the insertion this new goal',goalInserted);
    }); // implement a proper callBAck when real datas
  }

  this.format = 'yyyy/MM/dd';
  this.date = new Date();

})
.component('addGoal', {
  controller: 'AddGoalCtrl',
  templateUrl: 'client/components/goal-component/addGoal/addGoal.html'
});

// [
//   {
//     "id":"0",
//     "user_id" : "2",
//     "number":"3",
//     "timeFrame" : "week",
//     "creationDate" : "08-15-2017",
//     "name" : "weekly exercice",
//     "emailAlert" : "false"
//   },
//   {
//     "id" : "0",
//     "user_id" : "1",
//     "number" : "3",
//     "timeFrame" : "week",
//     "creationDate" : "08-15-2017",
//     "name" : "weekly exercice",
//     "emailAlert" : "false"
//   }
// ]
