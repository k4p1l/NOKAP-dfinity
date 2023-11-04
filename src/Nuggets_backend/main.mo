import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Int "mo:base/Int";
import List "mo:base/List" ;
actor {


  type Post = {
    id: Text;
       source : Text ; 
       fact : Text ; 
     
  };




  stable var idCount = 0;



  stable var posts: List.List<Post> = List.nil<Post>();

  public func addPost( factI : Text, sourceI : Text) {
    idCount := idCount + 1;
    
    var postNew : Post = {

      
      id = Int.toText(idCount);
      fact = factI;
      source = sourceI;

    };
    posts := List.push(postNew, posts);
    Debug.print(debug_show (posts))
  };
  
  


  public query func getPosts() : async [Post] {
    return List.toArray(posts);
  };

}