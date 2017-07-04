var React = require('react');
var ReactDOM = require('react-dom');
var Modal= require('react-bootstrap').Modal;



var App = React.createClass({

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
                  <th><h2>Recipe <button type="button" className="btn btn-success" onClick={this.renderAdd}>Add + </button></h2></th>
                </tr>
              </thead> 
                <RecipeList recipe={this.state.recipe} setSelectRecipe={this.setSelectRecipe} />
            </table>          
          </div>
          <div className="col-md-6 col-xs-6" id={this.renderBorder()}>
          </div>
          <div>
          </div>
        </div>
      </div>
    )
  }
});


ReactDOM.render (<App />, document.getElementById("container"));