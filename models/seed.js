var mongoose = require("mongoose");
var Dorms = require("./dorms");
var Rooms   = require("./rooms");


var data = [
                {
    name:"lgs",
    image:"https://dsai.ca/wp-content/uploads/Centennial-Culinary-Residence-courtyard-02-hybrid-buildings-631x430.jpg",
    details:"better rooms available"
        },                {
    name:"mps",
    image:"https://images.adsttc.com/media/images/5014/9e7f/28ba/0d39/5000/095b/large_jpg/stringio.jpg?1414458439",
    details:"better rooms available"
        },
        {
    name:"bs13",
    image:"https://www.3ddesignbureau.com/wp-content/uploads/2017/01/news-3ddesignbureau.com-student-accommodation-viewpoint-cgi-2.jpg",
    details:"better rooms available"
        }

];
            
            
function seedDB(){
    Dorms.deleteMany({},function(err){ 
        if(err){console.log(err);}
        console.log("removed Dorms!");
        Rooms.deleteMany({},function(err){
            if(err){console.log(err)}
            console.log("removed rooms!");});
        });
        data.forEach(function(dorm){
            Dorms.create(dorm,function(err,addedDorm){
                if(err){console.log("ERROR!!");}
                else{console.log("dorm added");
                    Rooms.create(
                        {
                            roomnumber: 501,
                            roomtype: "Single",
                            roomcapacity: 1,
                            roomavailable: true,
                            roomimage: "https://twistedsifter.files.wordpress.com/2018/08/this-would-be-a-great-design-for-a-dorm-room.jpg?w=800&h=642" },
                    function(err,addedRoom){
                    if(err){console.log("ERROR!!")}
                    else{addedDorm.Room.push(addedRoom);
                        // addedDorm.save();
                        console.log("added new single room");
                    }
                    });
                    
                    Rooms.create(
                        {
                            roomnumber: 701,
                            roomtype: "Double",
                            roomcapacity: 2,
                            roomavailable: true,
                            roomimage: "https://upload.wikimedia.org/wikipedia/commons/5/5c/LoyolaMD_Dorm.JPG" },
                    function(err,addedRoom){
                    if(err){console.log("ERROR!!")}
                    else{addedDorm.Room.push(addedRoom);
                        addedDorm.save();
                        console.log("added new double room");
                    }
                    });
                    
                }
            });
        });
    }

// rooms.remove({}, function(err) { 
//   console.log('collection removed') 
// });

module.exports = seedDB; 