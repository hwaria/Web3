import React, { Component } from "react";
import TOC from "./src/TOC";
import Subject from "./src/Subject";
import ReadContent from "./src/ReadContent";
import CreateContent from "./src/CreateContent";
import UpdateContent from "./src/UpdateContent";
import Control from "./src/Control";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3; // contents 마지막 요소 id값 저장해두기
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i]; // 현재 순번에 해당하는 컨텐츠
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null; //기본적으로 없는 값
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />; //이 영역을 가변적으로 만들기 위해 변수로 만들어 저장
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />; // 모드가 웰컴이거나 리드면 있는 그대로 나옴
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function(_title, _desc) {
            // state를 통해서 새로운 컨텐츠 값을 추가하기
            this.max_content_id = this.max_content_id + 1;
            // this.state.contents.push({id: this.max_content_id, title: _title, desc: _desc});
            var _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id //방금 우리가 추가한 값으로 변경
            });
          }.bind(this)}
        />
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function(_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            //contents값 하나씩 봐서 id값이 수정하고자 하는 것과 같은 원소 찾기
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read"
            });
            console.log(_title, _desc);
          }.bind(this)}
        />
      );
    }
    return _article;
  }
  render() {
    // console.log("App render");
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        />
        <TOC
          onChangePage={function(id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        />
        <Control
          onChangeMode={function(_mode) {
            if (_mode === "delete") {
              //삭제가 시작되면 정말 삭제할건지 확인하게 하기
              if (window.confirm("really?")) { // 경고창 안에 문구 넣기
                //컨펌 경고창은 window를 붙여줘야함
                //확인을 누르면 true가 되어 다음 코드 실행됨
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); // 발견한 id의 값부터 하나만 지움
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome", // 삭제한 후에는 메인페이지로 이동
                  contents: _contents
                });
                alert("deleted!"); // 삭제 완료 후 알림창 띄우기
              }
            } else {
              // delete모드가 아니면 페이지 전환만 해줌
              this.setState({
                mode: _mode
              });
            }
          }.bind(this)}
        />
        {this.getContent()}
      </div>
    );
  }
}
export default App;
