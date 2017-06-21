var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  getInitialState: function() {
    return { 
      "text": "Heading\n=======\n\nSub-heading\n-----------\n\n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain. \n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*"
    };
  },
  getMarkdownText(){
    var raw = marked(this.state.text);
    return {__html:raw}
  },
  onChange: function(event){
    this.setState({"text": event.target.value})
  },
  render : function() {
    return (
      <div>
        <center><h1>Markdown Previewer</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6">
            <textarea rows="33" id="area" onChange={this.onChange}>{this.state.text}</textarea>
          </div>
          <div className="col-md-6" dangerouslySetInnerHTML={this.getMarkdownText()}></div>
        </div>
      </div>
    )
  }
});

ReactDOM.render (<App />, document.getElementById("container"));