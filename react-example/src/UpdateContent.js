import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc,
      id: this.props.data.id,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log("UpdateContent render");
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process" // 이건 지금 이해하지 말고 넘어가자
          method="post"
          onSubmit={function(e) {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title, this.state.desc);
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input> 
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title} // props의 데이터는 read-only이므로 이대로 수정 불가
              onChange={this.inputFormHandler}
            />
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}
            />
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
