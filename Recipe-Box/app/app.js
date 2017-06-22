var React = require('react');
var ReactDOM = require('react-dom');

var initialRecipe = {"recipe":{"Bread Pudding":{"ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt. 6 slices of bread","instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan., 3.Bake uncovered for 40 to 45 minutes " },"Bread Pudding2":{"ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt. 6 slices of bread","instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan., 3.Bake uncovered for 40 to 45 minutes " }}}

var App = React.createClass({
  getInitialState: function() {
    return { 
      "recipe":{}   
    };
  },
  componentWillMount: function(){
    this.setState(initialRecipe);
  },
  render : function() {
    return (
      <div>
        <center><h1>Recipe Box</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6">
            <RecipeList recipe={this.state.recipe}/>
            <button type="button" id="myButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off">
                Loading state
</button>
            {console.log(this.state)}
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    )
  }
});

var RecipeList = React.createClass({
  render: function() {
    return (
      <p>{Object.keys(this.props.recipe)}</p>
    )
  }
});

ReactDOM.render (<App />, document.getElementById("container"));