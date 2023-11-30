import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Int "mo:base/Int";
import List "mo:base/List";
actor {
  
  type Post = {
    id : Text;
    source : Text;
    fact : Text;
    count : Int;
  };

  type Facts = {
    fact : Text;
  };

  type User = {
    id : Int;
    username : { name : Text; id : Int };
    password : { pass : Text; id : Int };
    // facts : [Post];
    count : Int;
  };

  var users : [User] = [
    {
      id = 1;
      username = { name = "Gaurav"; id = 1 };
      password = { pass = "123"; id = 1 };
      count = 1;
    },
    {
      id = 2;
      username = { name = "Kapil"; id = 2 };
      password = { pass = "123"; id = 2 };
      // facts = [];
      count = 1;
    },
    {
      id = 3;
      username = { name = "Harshpreet"; id = 3 };
      password = { pass = "123"; id = 3 };
      facts = [];
      count = 1;
    }
  ];

  stable var likeCount : Int = 5;

  stable var idCount = 0;

  stable var posts : List.List<Post> = List.nil<Post>();

  public query func like(id : Text) : async Int {

    // var checkPost = List.find(
    //   posts,
    //   func(post : Post) : Bool {

    //   }
    // )
    return likeCount
  };

  public shared (msg) func authUser(usernameToFind : Text, pass : Text) : async Text {
    var checkUser = Array.find(
      users,
      func(user : User) : Bool {
        var checkPass = Array.find(
          users,
          func(user : User) : Bool {
            if (user.username.name == usernameToFind) {
              if (user.password.pass == pass and user.password.id == user.id) {
                return user.username.name == usernameToFind;
              } else {
                return false;
              };
            } else {
              return false;
            };
          },
        );
        if (checkPass == null) {
          return false;
        } else {
          return user.username.name == usernameToFind;
        };
      },
    );
    Debug.print(debug_show (checkUser));
    if (checkUser == null) {
      return "not Exists";
    } else {
      return "exists";
    };
    // return checkUser;
  };

  public shared({caller}) func addPost(factI : Text, sourceI : Text) {
    idCount := idCount + 1;
    var postNew : Post = {
       
      id = Int.toText(idCount);
      fact = factI;
      source = sourceI;
      count = likeCount;
    };
    posts := List.push(postNew, posts);
    Debug.print(debug_show (posts));
  };

  public  query func getPosts() : async [Post] {
    return List.toArray(posts);
  };

};
