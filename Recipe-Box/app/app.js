var React = require('react');
var ReactDOM = require('react-dom');

var initialRecipe = {"recipe":{"Bread Pudding":{"ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt. 6 slices of bread","instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan., 3.Bake uncovered for 40 to 45 minutes " },"Bread Pudding2":{"ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt. 6 slices of bread","instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan., 3.Bake uncovered for 40 to 45 minutes " }}};
var temp="";

var App = React.createClass({
  getInitialState: function() {
    return { 
      "recipe":{},
      "selectRecipe":{}  
    };
  },
  componentWillMount: function(){
    this.setState(initialRecipe);
  },
  setSelectRecipe: function(recipe_index){
    this.setState({
      selectRecipe: {"ingredients":this.state.recipe[recipe_index].ingredients,
    "instructions":this.state.recipe[recipe_index].instructions}
    });
  },
  render : function() {
    return (
      <div>
        <center><h1>Recipe Box</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6">
            <table width="100%">
              <thead>
                <tr>
                  <th width="15%"><h2>Recipe</h2></th>
                </tr>
              </thead> 
                <RecipeList recipe={this.state.recipe} setSelectRecipe={this.setSelectRecipe}/>
            </table>
            
            
            {console.log(this.state)}
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    )
  }
});

var RecipeList = React.createClass({
  renderTableItem: function(name){//<stuck here, need to find how to get the key correctly
    return <RecipeItem key={name} name={name} itemRecipe={this.props.recipe[name]}/>
  },
  render: function() {
    return (
      <tbody>{Object.keys(this.props.recipe).map(this.renderTableItem)}</tbody>
    )
  }
});

var RecipeItem = React.createClass({
  setSelected: function(){
    this.setState({selectRecipe: this.props.itemRecipe});
    console.log(this.state)
  },
  render: function(){//<stuck here, need to find how to get the key correctly
    return (
          <tr key={this.props.name}>
            <td><h4>{this.props.name}</h4>
              <button type="button" className="btn btn-info" onClick={this.setSelected}>Recipe</button>{" "}
              <button type="button" className="btn btn-warning">Edit</button>{" "}
              <button type="button" className="btn btn-danger">Delete</button></td>
          </tr>
    );
  },

});



ReactDOM.render (<App />, document.getElementById("container"));