Images = new Mongo.Collection('images');

//setting up security on Image collection

Images.allow({
	insert:function(userId, doc){
		console.log("security testing");
		if(Meteor.user()){//if they are logged in
			console.log(userId);
			if (doc.createdBy!=userId) {// the user is messing around
				return false;
			}else{//original user
				return true;
			}
		}else{
			console.log("no user");
			return false;
		}
	},
	remove:function(userId, doc){
		console.log("item removed");
		return true;
	}
});
/*if (Meteor.isClient){
	

}


if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
	})
}*/