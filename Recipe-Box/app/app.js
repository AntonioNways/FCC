var React = require('react');
var ReactDOM = require('react-dom');

var initialRecipe = {"recipe":{"Bread Pudding":{"Ingredients":"2 cups milk, 1/4 cup butter or margarine, 2 eggs, 1/2 cup sugar, cinnamon, 1/4 teaspoon salt, 6 slices of bread.","Instructions": "1. Heat oven to 350ºF. In 2-quart saucepan, heat milk and butter over medium heat until butter is melted and milk is hot. 2.Mix eggs, sugar, cinnamon and salt. Stir in bread cubes. Stir in milk mixture. Pour into ungreased deep round pan. 3.Bake uncovered for 40 to 45 minutes " },"Mac and cheese":{"Ingredients":"4 cups/1L full cream milk, 2 cups macaroni, 2 cups cheddar cheese","Instructions": "1.Place milk into a small saucepan and bring to the boil over a medium heat. 2.Add the pasta and return to the boil, reduce heat to simmer for 8 minutes. 3. Stir through cheese and leave to sit for 2 minutes." }}};


var App = React.createClass({
  getInitialState: function() {
    return { 
      "recipe":{},
      "selectRecipe":{},
      "editRecipe":{},
      "type": "",
    };
  },
  componentWillMount: function(){
    this.setState(initialRecipe);
  },
  setSelectRecipe: function(recipe_index,type){
    this.setState({type :type});
    if(type==="Delete"){
    this.setState({
      selectRecipe: {}
    });
    }
    if(type==="Edit"){
      this.setState({
        selectRecipe: {}
      });
      this.setState({
          editRecipe: {
          "name": recipe_index,
          "Ingredients":this.state.recipe[recipe_index].Ingredients,
          "Instructions":this.state.recipe[recipe_index].Instructions}
        });  
    }
    if(type==="View"){
      this.setState({
        selectRecipe: {
          "name": recipe_index,
          "Ingredients":this.state.recipe[recipe_index].Ingredients,
          "Instructions":this.state.recipe[recipe_index].Instructions}
      });
      this.setState({
        editRecipe: {}
      });
    }
    else{
      console.log("No type")
    }
    console.log(this.state);
  },
  editChange:function(name,ing,inst){
      this.setState({
          editRecipe: {
            "name": name,
            "Ingredients":ing,
            "Instructions":inst}
        });
  },
  renderType(){
    if(this.state.type==="Edit"){
      return (<EditRecipePane editRecipe={this.state.editRecipe} setSelectRecipe={this.setSelectRecipe} editChange={this.editChange}/>);
    } 
    if(this.state.type==="View"){
      return (<RecipeDetailPane selectRecipe={this.state.selectRecipe}/>);
   }
   else{
     console.log("TBC")
   }
  },
  renderBorder(){
    if(this.state.type===""){
      return "NoBorder";
    }
    else{
      return "detailBox";
    }
  },
  render: function() {
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
                <RecipeList recipe={this.state.recipe} setSelectRecipe={this.setSelectRecipe} />
            </table>          
            
          </div>
          <div className="col-md-6 col-xs-6" id={this.renderBorder()}>
            <table width="100%">
            {this.renderType()}
            </table>
          </div>
        </div>
      </div>
    )
  }
});

var RecipeList = React.createClass({
  renderTableItem: function(name){
    return <RecipeItem key={name} name={name} itemRecipe={this.props.recipe[name]} setSelectRecipe={this.props.setSelectRecipe}/>
  },
  render: function() {
    return (
      <tbody>{Object.keys(this.props.recipe).map(this.renderTableItem)}</tbody>
    )
  }
});

var RecipeItem = React.createClass({
  viewRecipe: function(){
    this.props.setSelectRecipe(this.props.name, "View");
  },
  editRecipe:function(){
    this.props.setSelectRecipe(this.props.name, "Edit");
  },
  render: function(){
    return (
          <tr key={this.props.name}>
            <td><h4>{this.props.name}</h4>
              <button type="button" className="btn btn-info" onClick={this.viewRecipe}>Recipe</button>{" "}
              <button type="button" className="btn btn-warning" onClick={this.editRecipe}>Edit</button>{" "}
              <button type="button" className="btn btn-danger">Delete</button></td>
          </tr>
    );
  },

});

var RecipeDetailPane = React.createClass({
  render: function(){
    return (
      <thead>
          <tr>
            <th width="15%"><h2>{this.props.selectRecipe.name}{console.log(this.props)}</h2></th>
          </tr>
          <tr key={this.props.selectRecipe}>
            <td><h3>{Object.keys(this.props.selectRecipe)[1]}</h3>
              <p>{this.props.selectRecipe.Ingredients}</p>
            </td>
            </tr>
            <tr>
            <td><h3>{Object.keys(this.props.selectRecipe)[2]}</h3>
              <p>{this.props.selectRecipe.Instructions}</p>
            </td>
          </tr>
        </thead>
    );
  },
});

var EditRecipePane = React.createClass({
  IngredientsChange: function(event){
      this.props.editChange(this.props.editRecipe.name, event.target.value,this.props.editRecipe.Instructions);
  },
  InstructionsChange: function(event){
      this.props.editChange(this.props.editRecipe.name, this.props.editRecipe.Ingredients, event.target.value);
  },
  SaveEdit:function(){
    console.log(this.props.editRecipe);
  },
  CancelEdit:function(){
    this.props.setSelectRecipe(this.props.editRecipe.name, "View");
  },
  render: function(){
    return (
      <thead>
          <tr>
            <th width="15%"><h2>{this.props.editRecipe.name}{console.log(this.props)}</h2></th>
          </tr>
          <tr key={this.props.editRecipe}>
            <td><h3>{Object.keys(this.props.editRecipe)[1]}</h3>
              <textarea rows="3" name="test" id="textIngredients" onChange={this.IngredientsChange} value={this.props.editRecipe.Ingredients}></textarea>
            </td>
            </tr>
            <tr>
            <td><h3>{Object.keys(this.props.editRecipe)[2]}</h3>
              <textarea rows="5" id="textInstruction" onChange={this.InstructionsChange} value={this.props.editRecipe.Instructions}></textarea>
            </td>
          </tr>
          <tr>
            <td>
            <button type="button" onClick={this.CancelEdit} className="btn btn-danger pull-right" id="editButton">Cancel</button>{" "}
            <button type="button" onClick={this.SaveEdit} className="btn btn-success pull-right" id="editButton">Save</button>
            </td>
          </tr>
      </thead>
    );
  },
});


ReactDOM.render (<App />, document.getElementById("container"));