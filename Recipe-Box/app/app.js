var React = require('react');
var ReactDOM = require('react-dom');

var initialRecipe = {"recipe":{"Bread Pudding":{"ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt. 6 slices of bread","instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan. 3.Bake uncovered for 40 to 45 minutes " },"Mac and cheese":{"ingredients":"4 cups/1L full cream milk, 2 cups macaroni, 2 cups cheddar cheese","instructions": "1.Place milk into a small saucepan and bring to the boil over a medium heat. 2.Add the pasta and return to the boil, reduce heat to simmer for 8 minutes. 3. Stir through cheese and leave to sit for 2 minutes." }}};
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
      selectRecipe: {"name": recipe_index,
        "ingredients":this.state.recipe[recipe_index].ingredients,
    "instructions":this.state.recipe[recipe_index].instructions}
    });
  },
  render : function() {
    return (
      <div>
        <center><h1>Recipe Box</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6 col-xs-6">
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
          <div className="col-md-6 col-xs-6">          
            <RecipeDetailPane selectRecipe={this.state.selectRecipe}/>
          </div>
        </div>
      </div>
    )
  }
});

var RecipeList = React.createClass({
  renderTableItem: function(name){//<stuck here, need to find how to get the key correctly
    return <RecipeItem key={name} name={name} itemRecipe={this.props.recipe[name]} setSelectRecipe={this.props.setSelectRecipe}/>
  },
  render: function() {
    return (
      <tbody>{Object.keys(this.props.recipe).map(this.renderTableItem)}</tbody>
    )
  }
});

var RecipeItem = React.createClass({
  setSelected: function(){
    this.props.setSelectRecipe(this.props.name);
    console.log(this.state);
  },
  render: function(){
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

var RecipeDetailPane = React.createClass({
  render: function(){
    return (
      <table width="100%">
        <thead>
          <tr>
            <th width="15%"><h2>{this.props.name}{console.log(this.props.recipe)}</h2></th>
          </tr>
          <tr key={this.props.selectRecipe}>
            <td><h2></h2>
              <button type="button" className="btn btn-info" >Recipe</button>{" "}
              <button type="button" className="btn btn-warning">Edit</button>{" "}
              <button type="button" className="btn btn-danger">Delete</button></td>
          </tr>
        </thead> 
      </table>
    );
  },
});


ReactDOM.render (<App />, document.getElementById("container"));