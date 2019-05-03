import React, { Component } from "react";

class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log(
      "===> TOC render shoudComponentUpdate",
      newProps.data,
      this.props.data
    );
    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }

  render() {
    console.log("===> TOC render");
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id} // 이벤트를 실행시킨 객체의 속성값을 활용
            onClick={function(e) {
              // console.log(e.target.dataset.id);
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
