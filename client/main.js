//routing................
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
	this.render('welcome', {to:"main"});
});

Router.route('/images', function () {
	this.render('navbar', {to: "navbar"});
  	this.render('images', {to: "main"});
});

Router.route('/image/:_id', function () {
	this.render('navbar', {to: "navbar"});
  	this.render('image', {to: "main", data: function(){
  		return Images.findOne({_id:this.params._id});
  	}});
});
//.......................


Accounts.ui.config({
		passwordSignupFields:"USERNAME_AND_EMAIL"
	});

	Template.images.helpers({
		image:function(){
			if (Session.get("userFilter")) {
				return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn:-1, rating:-1}});
			}else{
				return Images.find({},{sort:{createdOn:-1, rating:-1}});	
			}
			
		},
		getUser:function(user_id){
			var user = Meteor.users.findOne({_id:user_id});

			if (user) {return user.username;}
			else {return "anonomus";}
		}

	});
/*			var image_id = this._id;
   console.log(image_id);
   
   $("#"+image_id).hide('slow', function(){
    Images.remove({"_id":image_id});
   })  */
	
	Template.images.events({
	  'click .delete':function(event) {
	  		console.log("Item "+this._id+" removed");
	  		var image_id = this._id;	  		
	  		$("#"+image_id).hide('slow', function(){ 
	  			Images.remove({"_id":image_id});
	  		});

	   	},
	   'click .rate-image':function(event){
	   		var rating = $(event.currentTarget).data("userrating");
	   		var image_id= this.id;
	   		console.log(image_id); 
	   		Images.update({'_id':image_id}, {$set:{rating:rating}});
	   },
	   'click .js-set-image-filter':function(event){
	   		Session.set('userFilter', this.createdBy);
	   }



	});

	Template.imgUpload.events({
		'submit .imageUpload':function(event){
			event.preventDefault();
			var imgURl = event.target.uploadURL.value;
			console.log(imgURl);

			if (Meteor.user()) {
				Images.insert({
					img_src:imgURl,
					createdOn: new Date(),
					createdBy: Meteor.user()._id
				});	
			}
			

			event.target.uploadURL.value="";
		
		}
	});

	Template.body.helpers({
		username:function(){
			if (Meteor.user()) {
				return Meteor.user().username;
			}else{
				return "undefined";
			}
		}
	});